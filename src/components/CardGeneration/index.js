import React from 'react';
import { Typography } from '@material-ui/core';

const CardGeneration = ({ generationName }) => {
  return (
    <div className='card shadow'>
      <div className='card-header'>
        <Typography aria-label='generation-card' variant='h4'>
          {generationName}
        </Typography>
      </div>
    </div>
  );
};

export default CardGeneration;
