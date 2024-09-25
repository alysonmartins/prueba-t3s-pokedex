import { Pokemon } from '../types/pokemon';
import PokemonCard from './PokemonCard';

interface PokemonListProps {
  pokemon: Pokemon[];
}


export default function PokemonList({ pokemon }: PokemonListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}