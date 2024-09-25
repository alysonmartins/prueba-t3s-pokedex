import Link from 'next/link';
import { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (


    <Link href={`/pokemon/${pokemon.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-zinc-200">
        <img src={pokemon.image} alt={pokemon.name} className="w-32 h-32 mx-auto" />
        <h2 className="text-xl font-semibold mt-2 capitalize">{pokemon.name}</h2>
        <p>Generation: {pokemon.generation}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="px-2 py-1 text-sm text-white rounded capitalize"
              style={{ backgroundColor: getTypeColor(type) }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>

  );
}

function getTypeColor(type: string): string {
  // Add color mapping for each type
  const colors: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  return colors[type.toLowerCase()] || '#777';
}