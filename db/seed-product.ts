import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedProducts() {
  try {
    console.log('Seeding products...');
    const seller = await prisma.seller.findFirst();
    const pokemons = await prisma.pokemon.findMany({
      take: 4,
    });

    if (!seller || pokemons.length === 0) {
      console.error('No sellers or Pokemon found. Seed them first.');
      return;
    }

    for (const pokemon of pokemons) {
      await prisma.product.create({
        data: {
          pokemonId: pokemon.id,
          price: Math.random() * 100,
          stock: Math.floor(Math.random() * 10) + 1,
          condition: 'Mint',
          sellerId: seller.id,
        },
      });

      console.log(`Created a product for ${pokemon.name} (${pokemon.id})`);
    }
    console.log('Seeding complete!');
  } catch (err) {
    console.error('Error during seeding', err);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();
