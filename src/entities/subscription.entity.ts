export interface ISubscriptionEntity {
    id?: string;
    recorrency: string;
    cost: number;
    status: string;
    user_id: string;
    created_at?: Date;
    updated_at?: Date;
}
