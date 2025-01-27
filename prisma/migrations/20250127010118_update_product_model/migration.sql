-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "images_id" TEXT,
ADD COLUMN     "pokemon_name" TEXT NOT NULL DEFAULT 'Unknown Pokémon';

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_images_id_fkey" FOREIGN KEY ("images_id") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
