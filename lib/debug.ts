import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

async function getPokemonFromTCG() {
  try {
    const card = await PokemonTCG.findCardByID('sv8pt5-161');
    console.log(card);
  } catch (err) {
    console.error('error fetching the card:', err);
  }
}

getPokemonFromTCG();
