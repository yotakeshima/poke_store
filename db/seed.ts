import { PrismaClient } from '@prisma/client';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

const prisma = new PrismaClient();

function parseDate(dateString: string): Date {
  return new Date(`2${dateString}`);
}

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

    console.log('Default seller created/updated:', defaultSeller);

    // Step 2: Fetch all cards from a specific set
    console.log('Fetching cards from the set...');
    const cardSet = await PokemonTCG.findCardsByQueries({ q: 'set.id:sv8pt5' }); // Adjust set ID as needed

    if (!cardSet.length) {
      console.log('No cards found for the specified set.');
      return;
    }

    console.log(`Fetched ${cardSet.length} cards from the set.`);
    // console.log(
    //   cardSet[1].set.releaseDate,
    //   parseDate(cardSet[1].set.updatedAt)
    // );
    // Step 3: Map fetched data to Prisma-compatible format
    const pokemonData = cardSet.map((card) => ({
      id: card.id,
      name: card.name,
      supertype: card.supertype,
      subtypes: card.subtypes || [],
      hp: card.hp ? parseInt(card.hp, 10) : null,
      types: card.types || [],
      evolvesFrom: card.evolvesFrom || null,
      retreatCost: card.retreatCost || [],
      convertedRetreatCost: card.convertedRetreatCost || 0,
      number: card.number,
      rarity: card.rarity,
      set: {
        connectOrCreate: {
          where: { id: card.set.id },
          create: {
            id: card.set.id,
            name: card.set.name,
            series: card.set.series,
            printedTotal: card.set.printedTotal,
            total: card.set.total,
            releaseDate: new Date(card.set.releaseDate),
            updatedAt: parseDate(card.set.updatedAt),
          },
        },
      },
      images: {
        create: {
          small: card.images.small,
          large: card.images.large,
        },
      },
      legalities: card.legalities
        ? {
            create: {
              unlimited: card.legalities.unlimited || null,
              standard: card.legalities.standard || null,
              expanded: card.legalities.expanded || null,
            },
          }
        : undefined,
    }));

    console.log('Mapped data for database insertion.');

    // Step 4: Insert or update Pokémon data and create product listings
    for (const pokemon of pokemonData) {
      try {
        // Upsert Pokémon data
        const pokemonRecord = await prisma.pokemon.upsert({
          where: { id: pokemon.id },
          update: pokemon,
          create: pokemon,
        });

        console.log(
          `Upserted Pokémon: ${pokemonRecord.name} (${pokemonRecord.id})`
        );
      } catch (error) {
        console.error(`Error processing Pokémon ID ${pokemon.id}:`, error);
      }
    }

    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
