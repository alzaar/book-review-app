import React from 'react';
//React-redux connector
import { connect } from 'react-redux';
//Actions
import { getRecipeInfo } from '../../actions/recipeAction';

class Results extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.recipe) {
      this.setState({
        data: nextProps.recipe.data
      })
    }
  }

  render() {
    const results = this.state.data.map(recipe => <div key={recipe.id}>{recipe.title}</div>);
    return(
      <div>
        {results}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    recipe: state.recipe
  };
}

export default connect(mapStateToProps, { getRecipeInfo })(Results);
