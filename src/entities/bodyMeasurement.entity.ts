export interface IBodyMeasurementEntity {
	id?: string;
	weight: number;
	waist: number;
	hip: number;
	body_fat: number;
	bmi: number;
	user_id: string;
	created_at?: Date;
	updated_at?: Date;
}

export type IBodyMeasurementPublic = IBodyMeasurementEntity;
