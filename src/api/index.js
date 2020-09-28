import axios from 'axios';

const baseURL = 'https://pokeapi.co/api/v2';
const imageURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

export const getGenerations = () =>
  axios.get(`${baseURL}/generation`).then(handleResponse).catch(handleError);

export const getGeneration = (generation) =>
  axios.get(`${baseURL}/generation/${generation}`).then(handleResponse).catch(handleError);

export const getGames = (url) => axios.get(url).then(handleResponse).catch(handleError);

export const getPokemonById = (id) =>
  axios.get(`${baseURL}/pokemon/${id}`).then(handleResponse).catch(handleError);

export const getPokedex = async (url) => {
  const { pokedexes } = await fetchData(url);

  const allPokedexesPromisses = pokedexes.map(async (pokedex) => {
    const responsePokedex = await fetchData(pokedex.url);
    return responsePokedex;
  });

  const allPokedexes = await Promise.all(allPokedexesPromisses);
  return allPokedexes;
};

export const fetchData = (url) => axios.get(url).then(handleResponse).catch(handleError);

const handleError = (error) => {
  console.error(error);
  return [];
};

const handleResponse = (response) => response.data;
