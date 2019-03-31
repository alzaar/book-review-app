import axios from 'axios';
import { GET_RECIPE } from './types';
//Search query URL
import { url } from '../config/apiCall';
//API config
import { apiCallConfig } from '../config/apiCall';


export const getRecipeByIngredients = searchValue => dispatch => {
  axios.get(url.recipeByIngredients + searchValue, apiCallConfig)
  .then(res => {
    dispatch({
      type: GET_RECIPE,
      payload: res.data
    });
  })
  .catch(err => console.log(err));
}

export const getSimilarRecipe = searchValue => dispatch => {
  axios.get(url.similarRecipes + searchValue + '/similar', apiCallConfig)
  .then(res => console.log(res.data))
}

export const getRecipeInfo = searchValue => dispatch => {
  axios.get(url.recipeInfo + searchValue + '/information', apiCallConfig)
  .then(res => searchValue = (res.data.instructions));
}
