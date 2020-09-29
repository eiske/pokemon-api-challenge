import { Breadcrumbs, Link } from '@material-ui/core';
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
    setFilter(name);
  };

  const renderPokemonCard = () =>
    pokedexes
      .filter((pokedex) => pokedex.names[0].name === filter)
      .map((pokemons) =>
        pokemons.pokemon_entries.map((pokemon) => (
          <PokemonCard
            key={pokemon.pokemon_species.name}
            name={pokemon.pokemon_species.name}
            url={pokemon.pokemon_species.url}
          />
        ))
      );

  const renderPokedexes = () => (
    <Breadcrumbs>
      {pokedexes.map((pokedex, index) => (
        <Link key={index} onClick={() => handleChange(pokedex.names[0].name)}>
          {pokedex.names[0].name}
        </Link>
      ))}
    </Breadcrumbs>
  );

  return (
    <div>
      <div className='d-flex justify-content-center mt-3'>{renderPokedexes()}</div>
      <div className='pokemon-grid'>{renderPokemonCard()}</div>
    </div>
  );
};

export default PokedexContainer;
