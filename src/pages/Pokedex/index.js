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

  const renderGames = () =>
    games.version_groups.map((game) => (
      <button key={game.name} type='button' className='btn btn-outline-dark m-1' disabled>
        {game.name}
      </button>
    ));

  return (
    <div>
      {games && (
        <>
          <div className='mt-2 col text-center'>
            <div className='F'>
              <h4>
                <span className='badge badge-danger'>GAMES:</span>
              </h4>
            </div>
            {renderGames()}
          </div>
          <PokedexContainer url={games.main_region.url} />
        </>
      )}
    </div>
  );
};

export default Pokedex;
