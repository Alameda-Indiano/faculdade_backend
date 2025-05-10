-- DropForeignKey
ALTER TABLE "Frequency" DROP CONSTRAINT "Frequency_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment_History" DROP CONSTRAINT "Payment_History_subscription_id_fkey";

-- DropForeignKey
ALTER TABLE "body_measurement" DROP CONSTRAINT "body_measurement_user_id_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_user_id_fkey";

-- AddForeignKey
ALTER TABLE "body_measurement" ADD CONSTRAINT "body_measurement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Frequency" ADD CONSTRAINT "Frequency_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment_History" ADD CONSTRAINT "Payment_History_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
