import React, { useEffect, useState } from 'react';
import { getData, getGenerations } from '../../api';

const Home = () => {
  const [generations, setGenerations] = useState([]);
  const games = [];

  useEffect(() => {
    const getGames = async () => {
      generations.map(async (generation) => {
        const respGames = await getData(generation.url);
        games.push(respGames);
      });
    };
    getGames();
  });

  useEffect(() => {
    const handleResponse = async () => {
      const respGenerations = await getGenerations();
      setGenerations(respGenerations.results);
    };
    handleResponse();
  }, []);
  return <div>{console.log('games', games)}</div>;
};

export default Home;
