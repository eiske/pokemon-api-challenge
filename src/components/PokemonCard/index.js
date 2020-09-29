import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions } from '@material-ui/core';
import Pokemon from '../Pokemon';

const PokemonCard = ({ name, url }) => {
  const [pokeName, setPokeName] = useState();
  const [imageUrl, setimageUrl] = useState();
  const [pokeIndex, setpokeIndex] = useState();
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    const pokemonIndex = url.split('/')[url.split('/').length - 2];
    const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeIndex}.png`;
    setPokeName(name);
    setimageUrl(imageURL);
    setpokeIndex(pokemonIndex);
  }, [url, name, pokeIndex]);

  const handleOpenDialog = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

  return (
    <>
      <div onClick={handleOpenDialog} className='shadow card'>
        <h5 className='card-header'>#{pokeIndex}</h5>
        <img src={imageUrl} alt='' className='mx-auto mt-2 pokemon-sprite' />
        <div className='card-body mx-auto my-auto'>
          <h6 className='card-title'>{pokeName}</h6>
        </div>
      </div>
      <Dialog maxWidth onClose={handleClose} open={dialog}>
        <Pokemon pokemonId={pokeIndex} />
        <DialogActions>
          <button type='button' className='btn btn-outline-danger' onClick={handleClose} color='primary'>
            Close
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PokemonCard;
