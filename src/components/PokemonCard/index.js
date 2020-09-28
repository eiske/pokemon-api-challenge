import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

require('./style.css');
const PokemonCard = ({ name, url }) => {
  const [pokeName, setPokeName] = useState();
  const [imageUrl, setimageUrl] = useState();
  const [pokeIndex, setpokeIndex] = useState();
  useEffect(() => {
    const pokemonIndex = url.split('/')[url.split('/').length - 2];
    const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeIndex}.png`;
    setPokeName(name);
    setimageUrl(imageURL);
    setpokeIndex(pokemonIndex);
  }, [url, name, pokeIndex]);

  return (
    <Link to={`/pokemon/${pokeIndex}`}>
      <div className='card shadow'>
        <h5 className='card-header'>{pokeIndex}</h5>
        <img src={imageUrl} alt='' style={{ width: '100%', height: '100%' }} className='mx-auto mt-2' />
        <div className='card-body mx-auto my-auto'>
          <h6 className='card-title'>{pokeName}</h6>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
