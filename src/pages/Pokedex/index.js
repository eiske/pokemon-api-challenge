import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { getGames, getImage } from '../../api';
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
      {/* retirar o TAB */}
      {/* {console.log(games)} */}
      {games && (
        <>
          <Tabs indicatorColor='secondary' centered>
            {games.version_groups.map((game, index) => (
              <Tab key={index} label={game.name} value={game.name} />
            ))}
          </Tabs>
          <PokedexContainer url={games.main_region.url} />
        </>
      )}
    </div>
  );
};

export default Pokedex;
