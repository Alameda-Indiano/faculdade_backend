export enum UserType {
	STUDENT = 'STUDENT',
	ADMIN = 'ADMIN',
}

export interface IUserEntity {
	id?: string;
	name: string;
	email: string;
	password: string;
	type: UserType;
	created_at?: Date;
	updated_at?: Date;
}

export type IUserPublic = Omit<IUserEntity, 'password'>;
