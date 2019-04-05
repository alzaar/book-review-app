import React from 'react';
import './css/reviewform.css'
import { connect } from 'react-redux';
import { addComment } from '../../actions/commentAction';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  handleOnSubmit = (e) => {
    e.preventDefault();

    let { recipe } = this.props.recipe;
    let { user } = this.props.auth;

    const newComment = {
      text: this.state.value,
      name: user.name,
      user: user.id,
      recipe_id: recipe.id
    }
    this.props.addComment(newComment)
    this.setState({
      value: ''
    })
  }
  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <div>
      <div className="review-form" style={{width: 'auto'}}>
        <div className="form-container">
        <div className="form-group">
          <form onSubmit={this.handleOnSubmit}>
            <label className="title-myreview">Your Review</label>
            <textarea className="form-control form-area" name="value" value={this.state.value} onChange={this.handleOnChange} rows="6"/>
            <button className="btn btn-dark review-btn">Submit</button>
          </form>
        </div>
        </div>
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

export default connect(mapStateToProps, { addComment })(ReviewForm);
