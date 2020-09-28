import React, { useEffect, useState } from 'react';
import { getPokedex } from '../../api';
import PokemonCard from '../PokemonCard';

require('./styles.css');
const PokedexContainer = ({ url }) => {
  const [pokedexes, setPokedexes] = useState([]);
  const [filter, setFilter] = useState();

  useEffect(() => {
    const handlePokedex = async () => {
      const respPokedex = await getPokedex(url);
      setPokedexes(respPokedex);
    };
    handlePokedex();
  }, [url]);

  const handleChange = (name) => {
    console.log(name);
    setFilter(name);
  };

  return (
    <div>
      {
        <div style={{ width: '300px' }}>
          {pokedexes.map((pokedex, index) => (
            <div key={index} onClick={() => handleChange(pokedex.names[0].name)}>
              {pokedex.names[0].name}
            </div>
          ))}
        </div>
      }
      <div className='pokemon-grid'>
        {pokedexes
          .filter((pokedex) => pokedex.names[0].name === filter)
          .map((pokemons) =>
            pokemons.pokemon_entries.map((pokemon) => (
              <PokemonCard
                key={pokemon.pokemon_species.name}
                name={pokemon.pokemon_species.name}
                url={pokemon.pokemon_species.url}
              />
            ))
          )}
      </div>
    </div>
  );
};

export default PokedexContainer;
