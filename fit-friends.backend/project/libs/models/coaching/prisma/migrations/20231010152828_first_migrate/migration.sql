/*
  Warnings:

  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_trainingId_fkey";

-- DropTable
DROP TABLE "order";

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "pay" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "orders_count_idx" ON "orders"("count");

-- CreateIndex
CREATE INDEX "orders_total_idx" ON "orders"("total");

-- CreateIndex
CREATE INDEX "orders_create_date_idx" ON "orders"("create_date");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
