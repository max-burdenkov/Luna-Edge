import React, { useState, useEffect } from "react";
import axios from "axios";

interface SelectProps {
  team: { name: string; sprite: string }[];
  setTeam: React.Dispatch<React.SetStateAction<{ name: string; sprite: string }[]>>;
}

export const Select: React.FC<SelectProps> = ({ team, setTeam }) => {
  const [pokemons, setPokemons] = useState<{ name: string; sprite: string }[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<{ name: string; sprite: string }[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon: { name: string; url: string }) => {
            const details = await axios.get(pokemon.url);
            return { name: pokemon.name, sprite: details.data.sprites.front_default };
          })
        );
        setPokemons(pokemonData);
        setFilteredPokemons(pokemonData);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredPokemons(pokemons);
    } else {
      setFilteredPokemons(
        pokemons.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      );
    }
  }, [search, pokemons]);

  const handleSelect = (pokemon: { name: string; sprite: string }) => {
    if (team.length < 4 && !team.some(p => p.name === pokemon.name)) {
      setTeam([...team, pokemon]);
    }
  };

  const handleRemove = (name: string) => {
    setTeam(team.filter(p => p.name !== name));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg w-80 mt-4">
      <h2 className="text-lg font-semibold mb-2">Виберіть покемонів</h2>

      <input
        type="text"
        placeholder="Пошук покемона..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded-lg mb-2"
      />

      <div className="border rounded-lg max-h-40 overflow-y-auto">
        {filteredPokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            onClick={() => handleSelect(pokemon)}
            className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
          >
            <img src={pokemon.sprite} alt={pokemon.name} className="w-8 h-8 mr-2" />
            <span>{pokemon.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="text-md font-medium">Ваша команда:</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {team.map((pokemon) => (
            <div key={pokemon.name} className="flex items-center bg-gray-200 rounded-full px-3 py-1">
              <img src={pokemon.sprite} alt={pokemon.name} className="w-6 h-6 mr-2" />
              <span className="mr-2">{pokemon.name}</span>
              <button
                onClick={() => handleRemove(pokemon.name)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};