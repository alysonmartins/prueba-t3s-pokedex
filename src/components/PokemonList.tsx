import { Pokemon } from '../types/pokemon';
import PokemonCard from './PokemonCard';

interface PokemonListProps {
  pokemon: Pokemon[];
}


export default function PokemonList({ pokemon }: PokemonListProps) {
  return (
    <>
      {
        pokemon.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pokemon.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>
        ) : (
          <div className=' text-center text-white'>
            <h1 className='text-2xl'>Nothing found.</h1>
            <p>try search something different</p>
          </div>
        )
      }
    </>
  );
}