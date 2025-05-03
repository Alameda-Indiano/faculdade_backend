import { prisma } from '../config/prisma'
import { IUserEntity } from '../entities/user.entity'

export const userRepository = {
	create: async (data: IUserEntity) => {
		const { classes, body_measurements, id, created_at, updated_at, ...userFields } = data

		const newUser = await prisma.user.create({
			data: {
				...userFields,
				classes: classes
					? {
						create: classes.map((c) => ({
							classe: { connect: { id: c.id! } },
						})),
					}
					: undefined,
			},
			include: {
				classes: {
					select: {
						classe: true
					}
				},
			}
		})

		return newUser
	},

	update: async (userId: string, data: Partial<IUserEntity>) => {
		const { classes, body_measurements, id, created_at, updated_at, ...userFields } = data

		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: userFields,
		})

		if (classes) {
			await prisma.userToClasse.deleteMany({ where: { user_id: userId } })
			await prisma.userToClasse.createMany({
				data: classes.map((c) => ({
					user_id: userId,
					classe_id: c.id!,
				})),
				skipDuplicates: true,
			})
		}

		if (body_measurements) {
			await prisma.bodyMeasurement.createMany({
				data: body_measurements.map((m) => ({
					weight: m.weight,
					waist: m.waist,
					hip: m.hip,
					body_fat: m.body_fat,
					bmi: m.bmi,
					user_id: userId,
				})),
			})
		}

		return updatedUser
	},

	findAll: () => prisma.user.findMany({
		include: {
			classes: { include: { classe: true } },
		},
	}),
	findById: (id: string) => prisma.user.findUnique({
		where: { id },
		include: {
			classes: { include: { classe: true } },
		},
	}),
	findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
	delete: (id: string) => prisma.user.delete({ where: { id } }),
	count: () => prisma.user.count({
		where: {
			type: {equals: "STUDENT"}
		}
	})
}
