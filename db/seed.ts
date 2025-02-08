import { PrismaClient } from '@prisma/client';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

// Extend the PokemonTCG.Card interface for type issue.
type ExtendPokemonTCGCard = {
  regulationMark?: string;
} & PokemonTCG.Card;

const prisma = new PrismaClient();

function parseDate(dateString: string): Date {
  return new Date(`2${dateString}`);
}

async function clearDatabase() {
  try {
    console.log('Deleting all entries');
    // Delete dependent tables first
    await prisma.ability.deleteMany({});
    await prisma.attack.deleteMany({});
    await prisma.weakness.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.legalities.deleteMany({});
    await prisma.images.deleteMany({});

    // Delete `Pokemon` before deleting `Set` due to foreign key constraints
    await prisma.pokemon.deleteMany({});
    await prisma.set.deleteMany({});
    await prisma.tCGPlayer.deleteMany({});
    await prisma.cardMarket.deleteMany({});
    await prisma.seller.deleteMany({});
    console.log('All entries deleted successfully!');
  } catch (error) {
    console.error('Error clearing database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seed() {
  try {
    clearDatabase();
    console.log('Starting data seeding...');

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
    const pokemonData = cardSet.map((card: ExtendPokemonTCGCard) => ({
      id: card.id,
      name: card.name,
      supertype: card.supertype,
      subtypes: card.subtypes || [],
      hp: card.hp ? parseInt(card.hp, 10) : null,
      types: card.types || [],
      evolvesFrom: card.evolvesFrom || null,
      rules: card.rules || [],
      retreatCost: card.retreatCost || [],
      convertedRetreatCost: card.convertedRetreatCost || 0,
      number: card.number,
      rarity: card.rarity,
      flavorText: card.flavorText || null,
      regulationMark: card.regulationMark || null,
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
      abilities: card.abilities
        ? {
            create: card.abilities.map((ability) => ({
              name: ability.name,
              text: ability.text,
              type: ability.type,
            })),
          }
        : undefined,
      attacks: card.attacks
        ? {
            create: card.attacks.map((attack) => ({
              name: attack.name,
              cost: attack.cost,
              convertedEnergyCost: attack.convertedEnergyCost,
              damage: attack.damage,
              text: attack.text,
            })),
          }
        : undefined,
      weaknesses: card.weaknesses
        ? {
            create: card.weaknesses.map((weakness) => ({
              type: weakness.type,
              value: weakness.value,
            })),
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

// clearDatabase();
seed();
