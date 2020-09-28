import React from 'react';
import { Link } from 'react-router-dom';

const pokemonLogo = require('../../assets/images/delivery_much_logo.png');
require('./styles.css');
const PageHeader = () => {
  return (
    <div className='pageHeader'>
      <Link to='/'>
        <img src={pokemonLogo} alt='' />
      </Link>
    </div>
  );
};

export default PageHeader;
