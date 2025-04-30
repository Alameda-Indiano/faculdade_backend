export interface IPaymentHistoryEntity {
    id?: string;
    observation: string;
    cost: number;
    subscription_id: string;
    created_at?: Date;
    updated_at?: Date;
}
