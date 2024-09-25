import { useState, useEffect } from 'react';
import { getAllPokemon } from '../utils/api';
import { Pokemon } from '../types/pokemon';
import PokemonList from '../components/PokemonList';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import LoadingSpinner from '~/components/LoadingSpinner';



export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [generationFilter, setGenerationFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);
      try {
        const data = await getAllPokemon();
        setPokemon(data);
        setFilteredPokemon(data);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    const filtered = pokemon.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === '' || p.types.includes(typeFilter);
      const matchesGeneration = generationFilter === '' || p.generation === parseInt(generationFilter);
      return matchesSearch && matchesType && matchesGeneration;
    });
    setFilteredPokemon(filtered);
  }, [searchTerm, typeFilter, generationFilter, pokemon]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8 text-center text-white">Pokédex</h1>
      <div className="mb-8 flex gap-4 max-sm:flex-col max-sm:items-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Filters
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          generationFilter={generationFilter}
          setGenerationFilter={setGenerationFilter}
        />
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <PokemonList pokemon={filteredPokemon} />
      )}
    </div>
  );
}