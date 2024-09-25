import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getPokemonDetails } from '../../utils/api';
import { PokemonDetails } from '../../types/pokemon';
import Link from 'next/link';
import LoadingSpinner from '~/components/LoadingSpinner';

export default function PokemonDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPokemonDetails = async () => {
        const details = await getPokemonDetails(Number(id));
        setPokemon(details);
      };
      fetchPokemonDetails();
    }
  }, [id]);

  if (!pokemon) {
    return <LoadingSpinner />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to list
      </Link>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold mb-4 capitalize">{pokemon.name}</h1>
        <img src={pokemon.image} alt={pokemon.name} className="w-64 h-64 mx-auto mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Details</h2>
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
          <div>
            <h2 className="text-2xl font-semibold mb-2">Stats</h2>
            {pokemon.stats.map((stat) => (
              <div key={stat.name} className="flex justify-between">
                <span className='capitalize'>{stat.name}:</span>
                <span>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Evolution Chain</h2>
          <div className="flex justify-center items-center gap-4">
            {pokemon.evolutions.map((evo, index) => (
              <div key={evo.id} className="text-center flex flex-row items-center gap-4 hover:cursor-pointer">
                <div className=''>
                  <Link href={`/pokemon/${evo.id}`} className=''>
                    <img
                      src={evo.image}
                      alt={evo.name}
                      className={`w-32 h-32 ${evo.id === pokemon.id ? 'ring-4 ring-blue-500 rounded-full' : ''}`}
                    />
                  </Link>
                  <p className='capitalize'>{evo.name}</p>
                </div>
                {index < pokemon.evolutions.length - 1 && (
                  <span className="text-2xl">&rarr;</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getTypeColor(type: string): string {
  // Add color mapping for each type (same as in PokemonCard component)
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