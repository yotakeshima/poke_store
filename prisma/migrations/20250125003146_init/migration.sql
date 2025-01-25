-- CreateTable
CREATE TABLE "Pokemon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "supertype" TEXT NOT NULL,
    "subtypes" TEXT[],
    "hp" INTEGER,
    "types" TEXT[],
    "evolvesFrom" TEXT,
    "retreatCost" TEXT[],
    "convertedRetreatCost" INTEGER NOT NULL,
    "set_id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "artist" TEXT,
    "rarity" TEXT NOT NULL,
    "flavorText" TEXT,
    "nationalPokedexNumbers" INTEGER[],
    "legalities_id" TEXT,
    "images_id" TEXT,
    "tcgplayer_id" TEXT,
    "cardmarket_id" TEXT,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ability" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "pokemonId" TEXT NOT NULL,

    CONSTRAINT "Ability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cost" TEXT[],
    "convertedEnergyCost" INTEGER NOT NULL,
    "damage" TEXT,
    "text" TEXT,
    "pokemonId" TEXT NOT NULL,

    CONSTRAINT "Attack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weakness" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "pokemonId" TEXT NOT NULL,

    CONSTRAINT "Weakness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "printedTotal" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "images_id" TEXT,
    "legalities_id" TEXT,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Legalities" (
    "id" TEXT NOT NULL,
    "unlimited" TEXT,
    "standard" TEXT,
    "expanded" TEXT,

    CONSTRAINT "Legalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL,
    "small" TEXT NOT NULL,
    "large" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TCGPlayer" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "prices" JSONB NOT NULL,

    CONSTRAINT "TCGPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardMarket" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "prices" JSONB NOT NULL,

    CONSTRAINT "CardMarket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "pokemon_id" TEXT NOT NULL,
    "price" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "stock" INTEGER NOT NULL,
    "condition" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seller" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_id_key" ON "Pokemon"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_email_key" ON "Seller"("email");

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_set_id_fkey" FOREIGN KEY ("set_id") REFERENCES "Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_legalities_id_fkey" FOREIGN KEY ("legalities_id") REFERENCES "Legalities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_images_id_fkey" FOREIGN KEY ("images_id") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_tcgplayer_id_fkey" FOREIGN KEY ("tcgplayer_id") REFERENCES "TCGPlayer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_cardmarket_id_fkey" FOREIGN KEY ("cardmarket_id") REFERENCES "CardMarket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ability" ADD CONSTRAINT "Ability_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attack" ADD CONSTRAINT "Attack_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weakness" ADD CONSTRAINT "Weakness_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_images_id_fkey" FOREIGN KEY ("images_id") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_legalities_id_fkey" FOREIGN KEY ("legalities_id") REFERENCES "Legalities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
