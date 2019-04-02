import React from 'react';
import { Link } from 'react-router-dom';
class ProfileAction extends React.Component {
  render() {
    return(
      <div>
        <button className="btn btn-light">
          <Link to="/edit-profile">Edit Profile <i className="fas fa-user-circle"></i></Link>
        </button>
      </div>
    );
  }
}
export default ProfileAction;
