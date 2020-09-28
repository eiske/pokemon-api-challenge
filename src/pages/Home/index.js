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
        <CardGeneration generationName={generation.name} />
      </Link>
    ));

  return <div className='generationsCard'>{renderGenerationsCard()}</div>;
};

export default Home;
