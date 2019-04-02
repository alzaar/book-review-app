import React from 'react';
//React-redux connector
import { connect } from 'react-redux';
//Actions
import { getRecipeInfo } from '../../actions/recipeAction';
//Result Components
import Card from './Card';
import SearchFilter from './SearchFilter';
//css
import './css/results.css';

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

  componentDidMount() {
    if (this.props.recipe.data.length === 0) {
      this.props.history.push('/')
    }
  }

  render() {
    console.log(this.props.recipe.data);
    const results = this.state.data.map(recipe => <Card key={recipe.id} recipe={recipe}/>);
    return(
      <div className="container-fluid results">
        <SearchFilter/>
        <p className="lead text-muted">Results: {this.state.data.length} recipes found</p>
        <div className="row">
          {results}
        </div>
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
