import { CircularProgress } from '@material-ui/core';
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { getPokemonById, getPokemonSpeciesById } from '../../api';
import { TYPE_COLORS } from '../../constants';
require('./styles.css');
export default class Pokemon extends Component {
  state = {
    name: '',
    pokemonId: '',
    imageUrl: '',
    types: [],
    description: '',
    statTitleWidth: 3,
    statBarWidth: 9,
    stats: {
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      specialAttack: '',
      specialDefense: '',
    },
    height: '',
    weight: '',
    eggGroups: '',
    catchRate: '',
    abilities: '',
    genderRatioMale: '',
    genderRatioFemale: '',
    evs: '',
    hatchSteps: '',
    themeColor: '#EF5350',
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    console.log(this.props);
    const { pokemonId } = this.props;

    const pokemonRes = await getPokemonById(pokemonId);

    const name = pokemonRes.name;
    const imageUrl = pokemonRes.sprites.front_default;

    let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

    pokemonRes.stats.map((stat) => {
      switch (stat.stat.name) {
        case 'hp':
          hp = stat['base_stat'];
          break;
        case 'attack':
          attack = stat['base_stat'];
          break;
        case 'defense':
          defense = stat['base_stat'];
          break;
        case 'speed':
          speed = stat['base_stat'];
          break;
        case 'special-attack':
          specialAttack = stat['base_stat'];
          break;
        case 'special-defense':
          specialDefense = stat['base_stat'];
          break;
        default:
          break;
      }
    });

    const height = Math.round((pokemonRes.height * 0.328084 + 0.00001) * 100) / 100;

    const weight = Math.round((pokemonRes.weight * 0.220462 + 0.00001) * 100) / 100;

    const types = pokemonRes.types.map((type) => type.type.name);

    const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

    const abilities = pokemonRes.abilities
      .map((ability) => {
        return ability.ability.name
          .toLowerCase()
          .split('-')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
      })
      .join(', ');

    const evs = pokemonRes.stats
      .filter((stat) => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map((stat) => {
        return `${stat.effort} ${stat.stat.name
          .toLowerCase()
          .split('-')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')}`;
      })
      .join(', ');

    await getPokemonSpeciesById(pokemonId).then((res) => {
      let description = '';
      res.flavor_text_entries.some((flavor) => {
        if (flavor.language.name === 'en') {
          description = flavor.flavor_text;
          return;
        }
      });
      const femaleRate = res['gender_rate'];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round((100 / 255) * res['capture_rate']);

      const eggGroups = res['egg_groups']
        .map((group) => {
          return group.name
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        })
        .join(', ');

      const hatchSteps = 255 * (res['hatch_counter'] + 1);

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        catchRate,
        eggGroups,
        hatchSteps,
      });
    });

    this.setState({
      imageUrl,
      pokemonId,
      name,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense,
      },
      themeColor,
      height,
      weight,
      abilities,
      evs,
      isLoading: false,
    });
  }

  render() {
    const {
      name,
      pokemonId,
      imageUrl,
      types,
      description,
      statTitleWidth,
      statBarWidth,
      stats,
      height,
      weight,
      eggGroups,
      catchRate,
      abilities,
      genderRatioMale,
      genderRatioFemale,
      evs,
      hatchSteps,
      themeColor,
      isLoading,
    } = this.state;
    return (
      <div>
        {isLoading ? (
          <div className='d-flex justify-content-center p-5'>
            <CircularProgress color='secondary' />
          </div>
        ) : (
          <div className='card'>
            <div className='card-header'>
              <div className='row'>
                <div className='col-5'>
                  <h5>#{pokemonId}</h5>
                </div>
                <div className='col-7'>
                  <div className='float-right'>
                    {types.map((type) => (
                      <span
                        key={type}
                        className='badge badge-pill mr-1'
                        style={{
                          backgroundColor: `#${TYPE_COLORS[type]}`,
                          color: 'white',
                        }}
                      >
                        {type
                          .toLowerCase()
                          .split(' ')
                          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                          .join(' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='card-body'>
              <div className='row align-items-center'>
                <div className=' col-md-3 '>
                  <img src={imageUrl} alt='' className='mx-auto mt-2' />
                </div>
                <div className='col-md-9'>
                  <h4 className='mx-auto'>
                    {name
                      .toLowerCase()
                      .split(' ')
                      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(' ')}
                  </h4>
                  <div className='row align-items-center'>
                    <div className={`col-12 col-md-${statTitleWidth}`}>HP</div>
                    <div className={`col-12 col-md-${statBarWidth}`}>
                      <div className='progress'>
                        <div
                          className='progress-bar progress-bar-striped'
                          role='progressbar'
                          style={{
                            width: `${stats.hp}%`,
                            backgroundColor: `#${themeColor}`,
                          }}
                          aria-valuenow='25'
                          aria-valuemin='0'
                          aria-valuemax='100'
                        >
                          <small>{stats.hp}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row align-items-center'>
                    <div className={`col-12 col-md-${statTitleWidth}`}>Attack</div>
                    <div className={`col-12 col-md-${statBarWidth}`}>
                      <div className='progress'>
                        <div
                          className='progress-bar progress-bar-striped'
                          role='progressbar'
                          style={{
                            width: `${stats.attack}%`,
                            backgroundColor: `#${themeColor}`,
                          }}
                          aria-valuenow='25'
                          aria-valuemin='0'
                          aria-valuemax='100'
                        >
                          <small>{stats.attack}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row align-items-center'>
                    <div className={`col-12 col-md-${statTitleWidth}`}>Defense</div>
                    <div className={`col-12 col-md-${statBarWidth}`}>
                      <div className='progress'>
                        <div
                          className='progress-bar progress-bar-striped'
                          role='progressbar'
                          style={{
                            width: `${stats.defense}%`,
                            backgroundColor: `#${themeColor}`,
                          }}
                          aria-valuenow='25'
                          aria-valuemin='0'
                          aria-valuemax='100'
                        >
                          <small>{stats.defense}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row align-items-center'>
                    <div className={`col-12 col-md-${statTitleWidth}`}>Speed</div>
                    <div className={`col-12 col-md-${statBarWidth}`}>
                      <div className='progress'>
                        <div
                          className='progress-bar progress-bar-striped'
                          role='progressbar'
                          style={{
                            width: `${stats.speed}%`,
                            backgroundColor: `#${themeColor}`,
                          }}
                          aria-valuenow='25'
                          aria-valuemin='0'
                          aria-valuemax='100'
                        >
                          <small>{stats.speed}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row align-items-center'>
                    <div className={`col-12 col-md-${statTitleWidth}`}>Sp Atk</div>
                    <div className={`col-12 col-md-${statBarWidth}`}>
                      <div className='progress'>
                        <div
                          className='progress-bar progress-bar-striped'
                          role='progressbar'
                          style={{
                            width: `${stats.specialAttack}%`,
                            backgroundColor: `#${themeColor}`,
                          }}
                          aria-valuenow={stats.specialAttack}
                          aria-valuemin='0'
                          aria-valuemax='100'
                        >
                          <small>{stats.specialAttack}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row align-items-center'>
                    <div className={`col-12 col-md-${statTitleWidth}`}>Sp Def</div>
                    <div className={`col-12 col-md-${statBarWidth}`}>
                      <div className='progress'>
                        <div
                          className='progress-bar progress-bar-striped'
                          role='progressbar'
                          style={{
                            width: `${stats.specialDefense}%`,
                            backgroundColor: `#${themeColor}`,
                          }}
                          aria-valuenow={stats.specialDefense}
                          aria-valuemin='0'
                          aria-valuemax='100'
                        >
                          <small>{stats.specialDefense}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mt-1'>
                <div className='col'>
                  <p className=''>{description}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className='card-body'>
              <h5 class='card-title text-center'>Profile</h5>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='row'>
                    <div className='col-6'>
                      <h6 className='float-right'>Height:</h6>
                    </div>
                    <div className='col-6'>
                      <h6 className='float-left'>{height} ft.</h6>
                    </div>
                    <div className='col-6'>
                      <h6 className='float-right'>Weight:</h6>
                    </div>
                    <div className='col-6'>
                      <h6 className='float-left'>{weight} lbs</h6>
                    </div>
                    <div className='col-6'>
                      <h6 className='float-right'>Catch Rate:</h6>
                    </div>
                    <div className='col-6'>
                      <h6 className='float-left'>{catchRate}%</h6>
                    </div>
                    <div className='col-6'>
                      <h6 className='float-right'>Gender Ratio:</h6>
                    </div>
                    <div className='col-6'>
                      <div class='progress'>
                        <div
                          class='progress-bar progress-bar-striped'
                          role='progressbar'
                          style={{
                            width: `${genderRatioFemale}%`,
                            backgroundColor: '#c2185b',
                          }}
                          aria-valuenow='15'
                          aria-valuemin='0'
                          aria-valuemax='100'
                        >
                          <small>{genderRatioFemale}</small>
                        </div>
                        <div
                          class='progress-bar progress-bar-striped'
                          role='progressbar'
                          style={{
                            width: `${genderRatioMale}%`,
                            backgroundColor: '#1976d2',
                          }}
                          aria-valuenow='30'
                          aria-valuemin='0'
                          aria-valuemax='100'
                        >
                          <small>{genderRatioMale}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='row'>
                    <div className='col-6'>
                      <h6 className='float-right'>Egg Groups:</h6>
                    </div>
                    <div className='col-6'>
                      <h6 className='float-left'>{eggGroups} </h6>
                    </div>
                    <div className='col-6'>
                      <h6 className='float-right'>Hatch Steps:</h6>
                    </div>
                    <div className='col-6'>
                      <h6 className='float-left'>{hatchSteps}</h6>
                    </div>
                    <div className='col-6'>
                      <h6 className='float-right'>Abilities:</h6>
                    </div>
                    <div className='col-6'>
                      <h6 className='float-left'>{abilities}</h6>
                    </div>
                    <div className='col-6'>
                      <h6 className='float-right'>EVs:</h6>
                    </div>
                    <div className='col-6'>
                      <h6 className='float-left'>{evs}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
