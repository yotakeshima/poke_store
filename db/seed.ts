import { PrismaClient } from '@prisma/client';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('Starting data seeding...');

    // Create a default seller
    const defaultSeller = await prisma.seller.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        name: 'Admin Seller',
        email: 'admin@example.com',
      },
    });

    console.log('Fetching all cards...');
    const cardSet = await PokemonTCG.findCardsByQueries({ q: 'set.id:sv8pt5' }); // Fetch all cards

    console.log(cardSet[0]);

    //     console.log('Fetching 10 cards...');
    //     const cards = await PokemonTCG.getAllCards({ pageSize: 1 }); // Fetch only 10 cards

    //     const pokemonData = cards.map((card) => ({
    //       id: card.id,
    //       name: card.name,
    //       supertype: card.supertype,
    //       subtypes: card.subtypes || [],
    //       hp: card.hp ? parseInt(card.hp, 10) : null,
    //       types: card.types || [],
    //       evolvesFrom: card.evolvesFrom || null,
    //       retreatCost: card.retreatCost || [],
    //       convertedRetreatCost: card.convertedRetreatCost || 0,
    //       set: {
    //         connectOrCreate: {
    //           where: { id: card.set.id },
    //           create: {
    //             id: card.set.id,
    //             name: card.set.name,
    //             series: card.set.series,
    //             printedTotal: card.set.printedTotal,
    //             total: card.set.total,
    //             releaseDate: new Date(card.set.releaseDate),
    //             updatedAt: new Date(card.set.updatedAt),
    //           },
    //         },
    //       },
    //       images: {
    //         create: {
    //           small: card.images.small,
    //           large: card.images.large,
    //         },
    //       },
    //       legalities: card.legalities
    //         ? {
    //             create: {
    //               unlimited: card.legalities.unlimited || null,
    //               standard: card.legalities.standard || null,
    //               expanded: card.legalities.expanded || null,
    //             },
    //           }
    //         : undefined,
    //     }));

    //     for (const pokemon of pokemonData) {
    //       // Upsert the Pokémon data
    //       await prisma.pokemon.upsert({
    //         where: { id: pokemon.id },
    //         update: pokemon,
    //         create: pokemon,
    //       });

    //       // Create a sample product for each Pokémon
    //       await prisma.product.create({
    //         data: {
    //           pokemonId: pokemon.id,
    //           price: Math.random() * 100, // Generate random prices
    //           stock: Math.floor(Math.random() * 10) + 1, // Random stock (1-10)
    //           condition: 'Mint',
    //           sellerId: defaultSeller.id,
    //         },
    //       });
    //     }

    // console.log('Seeding complete! 10 cards added.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
