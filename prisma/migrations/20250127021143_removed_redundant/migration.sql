/*
  Warnings:

  - You are about to drop the column `images_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `pokemon_name` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_images_id_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "images_id",
DROP COLUMN "pokemon_name";
