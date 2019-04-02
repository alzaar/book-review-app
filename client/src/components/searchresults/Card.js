import React from 'react';
import './css/card.css';
//helper function to limit word
import { limit } from '../../helpers/limit';

class Card extends React.Component {
  render() {
    const recipe = this.props.recipe;
    let title = limit(recipe.title);
    return (
      <div className="col-md-4">
        <div className="card" id="media-card">
          <div className="card-body" id="media-body">
            <h5 className="card-title">{title}</h5>
          </div>
          <img className="card-img-bottom card-img" id="media-img" src={recipe.image} alt={recipe.title} />
        </div>
      </div>
    );
  }
}

export default Card;
