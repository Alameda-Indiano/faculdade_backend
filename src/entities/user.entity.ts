import { UserType as PrismaUserType } from '@prisma/client';
import { IBodyMeasurementEntity } from './bodyMeasurement.entity';
import { IClasseEntity } from './classe.entity';

export type UserType = PrismaUserType;

export interface IUserEntity {
	id?: string;
	name: string;
	email: string;
	password: string;
	type: UserType;
	classes?: IClasseEntity[],
	body_measurements?: IBodyMeasurementEntity[]
	created_at?: Date;
	updated_at?: Date;
}

export type IUserPublic = Omit<IUserEntity, 'password'>;
