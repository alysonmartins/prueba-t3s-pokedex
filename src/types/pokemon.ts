export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  generation: number;
  image: string;
}

export interface PokemonDetails extends Pokemon {
  stats: {
    name: string;
    value: number;
  }[];
  evolutions: Pokemon[];
}