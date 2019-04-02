import { GET_RECIPE,  ADD_INGREDIENT, DELETE_INGREDIENT } from '../actions/types';
const initialState = {
  data: [],
  ingredients: []
}
export default function(state = initialState, action) {
  switch(action.type) {
    case GET_RECIPE:
      return {
        ...state,
        data: action.payload
      };
    case ADD_INGREDIENT:
      let ingredients = state.ingredients;
      ingredients.push(action.payload);
      return {
        ...state,
        ingredients: ingredients
      }
    case DELETE_INGREDIENT:
      let new_ingredients = state.ingredients;
      new_ingredients.splice( new_ingredients.indexOf(action.payload), 1);
      return {
        ...state,
        ingredients: new_ingredients
      }
    default:
      return state;
  }
}
