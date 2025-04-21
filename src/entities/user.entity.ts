export interface IUserEntity {
	id?: string;
	name: string;
	email: string;
	password: string;
	created_at?: Date;
	updated_at?: Date;
}

export type IUserPublic = Omit<IUserEntity, 'password'>;
