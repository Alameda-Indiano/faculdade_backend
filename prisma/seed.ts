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
			prisma.user.create({ data: user }),
		)
	);

	const classNames = [
		'Pilates Core',
		'CrossFit Intenso',
		'Musculação Funcional',
		'Yoga Avançado',
		'HIIT Power',
	];

	const classes = await Promise.all(
		classNames.map((name) =>
			prisma.classe.create({
				data: {
					name,
					maximum: faker.number.int({ min: 10, max: 25 }),
				},
			}),
		)
	);

	const randomUsers = await Promise.all(
		Array.from({ length: 4 }).map(async () => {
			const name = faker.person.fullName();
			const email = faker.internet.email({ firstName: name.split(' ')[0], lastName: name.split(' ')[1] });
			return prisma.user.create({
				data: {
					name,
					email,
					password: await bcrypt.hash(faker.internet.password({ length: 10 }), 10),
					type: faker.helpers.arrayElement([UserType.STUDENT, UserType.ADMIN]),
				},
			});
		})
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
			const height = faker.number.float({ min: 1.55, max: 1.90, fractionDigits: 2 });
			const weight = faker.number.float({ min: 55, max: 95, fractionDigits: 1 });
			const waist = faker.number.float({ min: 65, max: 110, fractionDigits: 1 });
			const hip = faker.number.float({ min: 85, max: 130, fractionDigits: 1 });
			const body_fat = faker.number.float({ min: 12, max: 28, fractionDigits: 1 });
			const bmi = +(weight / (height * height)).toFixed(1);

			await prisma.bodyMeasurement.create({
				data: { weight, waist, hip, body_fat, bmi, user_id: user.id },
			});
		}

		const plan = faker.helpers.arrayElement([
			{ tipo: 'MONTHLY', valor: 89.9 },
			{ tipo: 'QUARTERLY', valor: 229.9 },
			{ tipo: 'YEARLY', valor: 679.0 },
		]);

		const subscription = await prisma.subscription.create({
			data: {
				recorrency: plan.tipo,
				cost: plan.valor,
				status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
				user_id: user.id,
			},
		});

		const paymentsCount = faker.number.int({ min: 1, max: 4 });
		for (let j = 0; j < paymentsCount; j++) {
			await prisma.payment_History.create({
				data: {
					subscription_id: subscription.id,
					observation: faker.helpers.arrayElement([
						'Pagamento via cartão de crédito',
						'Pagamento por Pix',
						'Renovação automática',
						'Pagamento em dinheiro na recepção',
					]),
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
