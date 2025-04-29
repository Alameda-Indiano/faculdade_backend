export interface IClasseEntity {
	id?: string;
	name: string;
	maximum: number;
	created_at?: Date;
	updated_at?: Date;
}

export type IClassePublic = IClasseEntity;
