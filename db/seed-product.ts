import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedProducts() {
  try {
    // Create a default seller
    console.log('Creating default Seller...');
    const defaultSeller = await prisma.seller.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        name: 'Admin Seller',
        email: 'admin@example.com',
      },
    });

    console.log('Default seller created/updated:', defaultSeller);

    console.log('Seeding products...');
    const seller = await prisma.seller.findFirst();
    const umbreon = await prisma.pokemon.findUnique({
      where: {
        id: 'sv8pt5-161',
      },
    });
    const fourPokemon = await prisma.pokemon.findMany({
      where: {
        id: { not: 'sv8pt5-161' },
      },
      take: 4,
    });

    const pokemons = umbreon ? [umbreon, ...fourPokemon] : fourPokemon;
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
