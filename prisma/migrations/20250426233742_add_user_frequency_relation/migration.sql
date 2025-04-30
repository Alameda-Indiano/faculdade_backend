-- CreateTable
CREATE TABLE "Frequency" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Frequency_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Frequency" ADD CONSTRAINT "Frequency_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
