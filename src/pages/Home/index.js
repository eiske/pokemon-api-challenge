import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGenerations } from '../../api';
import CardGeneration from '../../components/CardGeneration';

require('./styles.css');
const Home = () => {
  const [generations, setGenerations] = useState([]);

  useEffect(() => {
    const handleResponse = async () => {
      const respGenerations = await getGenerations();
      setGenerations(respGenerations.results);
    };
    handleResponse();
  }, []);

  const renderGenerationsCard = () =>
    generations.map((generation, index) => (
      <Link
        key={index}
        to={{
          pathname: '/pokedex',
          state: {
            url: generation.url,
          },
        }}
      >
        <CardGeneration url={generation.url} generationName={generation.name} />
      </Link>
    ));

  return (
    <>
      <div className='alert alert-danger' role='alert'>
        Data from last year's Sword and Shield games (generation-viii) is currently being added to PokéAPI.
        While waiting for an upstream project (Veekun) for verified data we decided to allow our community to
        bring in new data from various different sources. If you want to participate to this update project{' '}
        <a href='https://github.com/PokeAPI/pokeapi/issues/520'>read more on GitHub</a>.
      </div>
      <div className='alert alert-success' role='alert'>
        Select the generation to see pokedex of Pokemon Game
      </div>
      <div className='generationsCard container'>{renderGenerationsCard()}</div>
    </>
  );
};

export default Home;
