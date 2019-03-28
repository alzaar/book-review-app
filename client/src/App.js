import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
//Search query URL
import { url } from './config/apiCall';
//API config
import { apiCallConfig } from './config/apiCall';

class App extends Component {
  getRecipeByIngredients = (e) => {
    axios.get(url.recipeByIngredients + 'orange bread', apiCallConfig)
    .then(res => console.log(res.data))
  }

  getSimilarRecipe = () => {
    const recipeId = 969703;
    axios.get(url.similarRecipes + recipeId + '/similar', apiCallConfig)
    .then(res => console.log(res.data))
  }

  getRecipeInfo = () => {
    let recipeId = 969703;
    axios.get(url.recipeInfo + recipeId + '/information', apiCallConfig)
    .then(res => recipeId = (res.data.instructions));
    console.log(recipeId);
  }

  render() {
    return (
      <div>
        <button onClick={this.getRecipeInfo}>Get Recipe</button>
      </div>
    );
  }
}

export default App;
