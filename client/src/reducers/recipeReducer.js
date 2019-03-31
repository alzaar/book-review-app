import { GET_RECIPE } from '../actions/types';
const initialState = {
  data: []
}
export default function(state = initialState, action) {
  switch(action.type) {
    case GET_RECIPE:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}
