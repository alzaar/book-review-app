import React from 'react';
import { Link } from 'react-router-dom';
import { deleteProfile } from '../../actions/profileAction';
import { connect } from 'react-redux';

class ProfileAction extends React.Component {
  onClickDelete = () => {
    this.props.deleteProfile(this.props.history);
  }
  render() {
    return(
      <div>
        <button onClick={this.onClickDelete} className="btn btn-danger m-1">Delete Account</button>
      </div>
    );
  }
}
export default connect(null, { deleteProfile })(ProfileAction);

// <button className="btn btn-dark">
//   <Link to="/edit-profile">Edit Profile <i className="fas fa-user-circle"></i></Link>
// </button>
