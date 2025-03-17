/*
  Warnings:

  - The primary key for the `Cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Seller` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `Cart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `seller_id` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Seller` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Ability" DROP CONSTRAINT "Ability_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "Attack" DROP CONSTRAINT "Attack_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "Pokemon" DROP CONSTRAINT "Pokemon_cardmarket_id_fkey";

-- DropForeignKey
ALTER TABLE "Pokemon" DROP CONSTRAINT "Pokemon_images_id_fkey";

-- DropForeignKey
ALTER TABLE "Pokemon" DROP CONSTRAINT "Pokemon_legalities_id_fkey";

-- DropForeignKey
ALTER TABLE "Pokemon" DROP CONSTRAINT "Pokemon_set_id_fkey";

-- DropForeignKey
ALTER TABLE "Pokemon" DROP CONSTRAINT "Pokemon_tcgplayer_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_pokemon_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_images_id_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_legalities_id_fkey";

-- DropForeignKey
ALTER TABLE "Weakness" DROP CONSTRAINT "Weakness_pokemonId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Cart_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "seller_id",
ADD COLUMN     "seller_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Seller" DROP CONSTRAINT "Seller_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Seller_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_set_id_fkey" FOREIGN KEY ("set_id") REFERENCES "Set"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_legalities_id_fkey" FOREIGN KEY ("legalities_id") REFERENCES "Legalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_images_id_fkey" FOREIGN KEY ("images_id") REFERENCES "Images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_tcgplayer_id_fkey" FOREIGN KEY ("tcgplayer_id") REFERENCES "TCGPlayer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_cardmarket_id_fkey" FOREIGN KEY ("cardmarket_id") REFERENCES "CardMarket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ability" ADD CONSTRAINT "Ability_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attack" ADD CONSTRAINT "Attack_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weakness" ADD CONSTRAINT "Weakness_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_images_id_fkey" FOREIGN KEY ("images_id") REFERENCES "Images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_legalities_id_fkey" FOREIGN KEY ("legalities_id") REFERENCES "Legalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;
