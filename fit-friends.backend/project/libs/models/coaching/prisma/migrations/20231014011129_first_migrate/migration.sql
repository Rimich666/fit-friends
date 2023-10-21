-- CreateTable
CREATE TABLE "trainings" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "coach" TEXT NOT NULL,
    "spec" BOOLEAN NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "training_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "training_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "pay" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "balances" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "training_id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "balances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "trainings_price_idx" ON "trainings"("price");

-- CreateIndex
CREATE INDEX "trainings_calories_idx" ON "trainings"("calories");

-- CreateIndex
CREATE INDEX "trainings_rating_idx" ON "trainings"("rating");

-- CreateIndex
CREATE INDEX "trainings_time_idx" ON "trainings"("time");

-- CreateIndex
CREATE INDEX "trainings_create_date_idx" ON "trainings"("create_date");

-- CreateIndex
CREATE INDEX "orders_count_idx" ON "orders"("count");

-- CreateIndex
CREATE INDEX "orders_total_idx" ON "orders"("total");

-- CreateIndex
CREATE INDEX "orders_create_date_idx" ON "orders"("create_date");

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "balances" ADD CONSTRAINT "balances_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
