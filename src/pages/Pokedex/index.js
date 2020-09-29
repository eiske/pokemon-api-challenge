import React, { useEffect, useState } from 'react';
import { getGames } from '../../api';
import PokedexContainer from '../../components/PokedexContainer';

const Pokedex = ({
  location: {
    state: { url },
  },
}) => {
  const [games, setgames] = useState();
  useEffect(() => {
    const fetchGames = async () => {
      const respGames = await getGames(url);
      setgames(respGames);
    };
    fetchGames();
  }, [url]);

  return (
    <div>
      {games && (
        <>
          <div className=' mt-2 col text-center text-uppercase'>
            {games.version_groups.map((game) => (
              <button type='button' class='btn btn-outline-dark m-1' disabled>
                {game.name}
              </button>
            ))}
          </div>
          <PokedexContainer url={games.main_region.url} />
        </>
      )}
    </div>
  );
};

export default Pokedex;
