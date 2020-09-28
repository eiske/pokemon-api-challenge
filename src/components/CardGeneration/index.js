import React from 'react';
import { Typography } from '@material-ui/core';

const CardGeneration = ({ generationName }) => {
  return (
    <div>
      <Typography variant='h4'>{generationName}</Typography>
    </div>
  );
};

export default CardGeneration;
