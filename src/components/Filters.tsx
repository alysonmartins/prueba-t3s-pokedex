interface FiltersProps {
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  generationFilter: string;
  setGenerationFilter: (generation: string) => void;
}

export default function Filters({
  typeFilter,
  setTypeFilter,
  generationFilter,
  setGenerationFilter,
}: FiltersProps) {
  const types = [
    'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison',
    'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
  ];
  const generations = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="flex gap-4">
      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="p-2 border rounded-lg"
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type} value={type.toLowerCase()}>
            {type}
          </option>
        ))}
      </select>
      <select
        value={generationFilter}
        onChange={(e) => setGenerationFilter(e.target.value)}
        className="p-2 border rounded-lg"
      >
        <option value="">All Generations</option>
        {generations.map((gen) => (
          <option key={gen} value={gen.toString()}>
            Generation {gen}
          </option>
        ))}
      </select>
    </div>
  );
}