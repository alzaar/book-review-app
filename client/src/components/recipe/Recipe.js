import React from 'react';
import './css/recipe.css';
import { connect } from 'react-redux';
import { getRecipeInfo } from '../../actions/recipeAction';
//Action for storing recipe
import { storeRecipe, getSimilarRecipe } from '../../actions/recipeAction';
import { withRouter } from 'react-router-dom';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.recipe.recipe.title,
      image: this.props.recipe.recipe.image,
      readyInMinutes: this.props.recipe.recipe.readyInMinutes,
      instructions: this.props.recipe.recipe.instructions,
      id: this.props.recipe.recipe.id,
      servings: this.props.recipe.recipe.servings
    }
  }
  handleOnClick = () => {
    let recipe = {
      title: this.state.title,
      image: this.state.image,
      readyInMinutes: this.state.readyInMinutes,
      instructions: this.state.instructions,
      id: this.state.id,
      servings: this.state.servings
    }
    this.props.storeRecipe(recipe);
  }

  handleOnClickSimilarRecipe = (recipe) => {
    this.props.getRecipeInfo(recipe.id, this.props.history);
  }
  componentDidMount() {
    this.props.getSimilarRecipe(this.state.id)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.recipe.recipe.id !==  this.state.id) {
      this.setState({
        title: nextProps.recipe.recipe.title,
        image: nextProps.recipe.recipe.image,
        readyInMinutes: nextProps.recipe.recipe.readyInMinutes,
        instructions: nextProps.recipe.recipe.instructions,
        id: nextProps.recipe.recipe.id,
        servings: nextProps.recipe.recipe.servings
      })
    }
  }
  render() {
    let cards = this.props.recipe.similarRecipes.data.map(recipe => <button key={recipe.id} onClick={() => this.handleOnClickSimilarRecipe(recipe)} className="btn btn-success btn-sm recipe-button">{recipe.title}</button>);
    return (
      <div className="recipe-container">
      <h1 className="recipe-title"> {this.state.title} </h1>
        <div className="instructions">
        <h3 className="making">Instructions</h3>
        <img src={this.state.image} className="recipe-img" alt={this.state.id} />
        <p className="">{this.state.instructions}</p>
        <div className="d-flex justify-content-between recipe-details">
          <p>Ready in: <span className="time">{this.state.readyInMinutes} minutes</span></p>
          <button className="btn add-btn btn-sm btn-dark" onClick={this.handleOnClick}>Add To Recipes</button>
          <p>Servings: <span className="time">{this.state.servings}</span></p>
        </div>
        </div>
        <div className="making m-3 button-container">
          <h3>Similar Recipes</h3>
        {cards}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipe: state.recipe,
    auth: state.auth
  }
}
export default connect(mapStateToProps, { getRecipeInfo, storeRecipe, getSimilarRecipe })(withRouter(Recipe))
