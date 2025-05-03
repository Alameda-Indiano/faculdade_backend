import { faker } from '@faker-js/faker';
import { PrismaClient, UserType } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
	await prisma.payment_History.deleteMany();
	await prisma.subscription.deleteMany();
	await prisma.bodyMeasurement.deleteMany();
	await prisma.frequency.deleteMany();
	await prisma.userToClasse.deleteMany();
	await prisma.user.deleteMany();
	await prisma.classe.deleteMany();

	const fixedUsersData = await Promise.all([
		{
			id: '67d97e039047a622b6e6ee00',
			name: 'Admin',
			email: 'admin@gmail.com',
			password: await bcrypt.hash('admin123', 10),
			type: UserType.ADMIN,
		},
		{
			id: '401',
			name: 'User',
			email: 'user@gmail.com',
			password: await bcrypt.hash('user123', 10),
			type: UserType.STUDENT,
		},
		{
			id: '402',
			name: 'Mariana Costa',
			email: 'mariana.costa@greenenergy.com',
			password: await bcrypt.hash('hashed_password_2', 10),
			type: UserType.STUDENT,
		},
		{
			id: '403',
			name: 'Ricardo Mendes',
			email: 'ricardo.mendes@xpto.com.br',
			password: await bcrypt.hash('hashed_password_3', 10),
			type: UserType.STUDENT,
		},
		{
			id: '404',
			name: 'Fernanda Oliveira',
			email: 'fernanda.oliveira@blueocean.com',
			password: await bcrypt.hash('hashed_password_4', 10),
			type: UserType.ADMIN,
		},
		{
			id: '405',
			name: 'Gustavo Santos',
			email: 'gustavo.santos@futuretech.com',
			password: await bcrypt.hash('hashed_password_5', 10),
			type: UserType.ADMIN,
		},
	]);

	const fixedUsers = await Promise.all(
		fixedUsersData.map((user) =>
			prisma.user.create({
				data: user,
			}),
		),
	);

	const classes = await Promise.all(
		Array.from({ length: 5 }).map(() =>
			prisma.classe.create({
				data: {
					name: faker.company.buzzAdjective().replace(/\W/g, ''),
					maximum: faker.number.int({ min: 10, max: 30 }),
				},
			}),
		),
	);

	const randomUsers = await Promise.all(
		Array.from({ length: 4 }).map(async () =>
			prisma.user.create({
				data: {
					name: faker.person.fullName(),
					email: faker.internet.email(),
					password: await bcrypt.hash(faker.internet.password({ length: 8 }), 10),
					type: faker.helpers.arrayElement([UserType.STUDENT, UserType.ADMIN]),
				},
			}),
		),
	);

	const users = [...fixedUsers, ...randomUsers];

	for (const user of users) {
		const assignedClasses = faker.helpers.shuffle(classes).slice(0, faker.number.int({ min: 1, max: 3 }));
		for (const cls of assignedClasses) {
			await prisma.userToClasse.create({
				data: {
					user_id: user.id,
					classe_id: cls.id,
				},
			});
		}
	}

	for (const user of users) {
		await prisma.frequency.create({ data: { user_id: user.id } });

		for (let i = 0; i < 3; i++) {
			const weight = faker.number.float({ min: 50, max: 100, fractionDigits: 1 });
			const waist = faker.number.float({ min: 60, max: 120, fractionDigits: 1 });
			const hip = faker.number.float({ min: 80, max: 140, fractionDigits: 1 });
			const body_fat = faker.number.float({ min: 10, max: 30, fractionDigits: 1 });
			const bmi = +(weight / ((waist / 100) ** 2)).toFixed(1);

			await prisma.bodyMeasurement.create({
				data: { weight, waist, hip, body_fat, bmi, user_id: user.id },
			});
		}

		const subscription = await prisma.subscription.create({
			data: {
				recorrency: faker.helpers.arrayElement(['MONTHLY', 'QUARTERLY', 'YEARLY']),
				cost: parseFloat(faker.finance.amount({ min: 50, max: 200, dec: 2 })),
				status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
				user_id: user.id,
			},
		});

		const paymentsCount = faker.number.int({ min: 1, max: 4 });
		for (let j = 0; j < paymentsCount; j++) {
			await prisma.payment_History.create({
				data: {
					subscription_id: subscription.id,
					observation: faker.lorem.sentence(),
					cost: subscription.cost,
				},
			});
		}
	}

	console.log('🎉 Seeds criadas com sucesso!');
}

main()
	.catch((e) => {
		console.error('❌ Erro ao criar seeds:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
