import axios from 'axios';
import { Pokemon, PokemonDetails } from '../types/pokemon';



const API_BASE_URL = 'https://pokeapi.co/api/v2';

export async function getAllPokemon(): Promise<Pokemon[]> {
  const response = await axios.get(`${API_BASE_URL}/pokemon?limit=1000`);
  return Promise.all(
    response.data.results.map(async (pokemon: any) => {
      const details = await axios.get(pokemon.url);
      return {
        id: details.data.id,
        name: details.data.name,
        types: details.data.types.map((type: any) => type.type.name),
        generation: await getPokemonGeneration(details.data.id),
        image: details.data.sprites.front_default,
      };
    })
  );
}

export async function getPokemonDetails(id: number): Promise<PokemonDetails> {
  const response = await axios.get(`${API_BASE_URL}/pokemon/${id}`);
  const evolutionChain = await getEvolutionChain(id);

  return {
    id: response.data.id,
    name: response.data.name,
    types: response.data.types.map((type: any) => type.type.name),
    generation: await getPokemonGeneration(id),
    image: response.data.sprites.front_default,
    stats: response.data.stats.map((stat: any) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
    evolutions: evolutionChain,
  };
}

async function getPokemonGeneration(id: number): Promise<number> {
  const response = await axios.get(`${API_BASE_URL}/pokemon-species/${id}`);
  const generationUrl = response.data.generation.url;
  const generationId = parseInt(generationUrl.split('/').slice(-2, -1)[0]);
  return generationId;
}

async function getEvolutionChain(id: number): Promise<Pokemon[]> {
  const speciesResponse = await axios.get(`${API_BASE_URL}/pokemon-species/${id}`);
  const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
  const evolutionResponse = await axios.get(evolutionChainUrl);

  const evolutions: Pokemon[] = [];
  let evoData = evolutionResponse.data.chain;

  do {
    const evoDetails = await axios.get(`${API_BASE_URL}/pokemon/${evoData.species.name}`);
    evolutions.push({
      id: evoDetails.data.id,
      name: evoDetails.data.name,
      types: evoDetails.data.types.map((type: any) => type.type.name),
      generation: await getPokemonGeneration(evoDetails.data.id),
      image: evoDetails.data.sprites.front_default,
    });
    evoData = evoData.evolves_to[0];
  } while (evoData && evoData.hasOwnProperty('evolves_to'));

  return evolutions;
}