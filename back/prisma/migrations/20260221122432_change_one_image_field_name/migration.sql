/*
  Warnings:

  - You are about to drop the column `data` on the `Image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "data",
ADD COLUMN     "urlBase64" BYTEA;

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
