import React from 'react';
//Actions
import { getCurrentProfile } from '../../actions/profileAction';
import { deleteProfile } from '../../actions/profileAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './css/dashboard.css';
//ProfileAction Component to edit profile and recipes
import ProfileAction from './ProfileAction';
//ANimate comp
import Spinner from '../common/Spinner';
//using history in Actions
import { withRouter } from 'react-router-dom';

class Dashboard extends React.Component {
  onClickDelete = () => {
    this.props.deleteProfile(this.props.history);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    if (profile == null || loading) {
      dashboardContent = <Spinner/>
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
            <ProfileAction />
            <center><button onClick={this.onClickDelete} className="btn btn-danger">Delete Account</button></center>
          </div>
        )
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>No Profile details</p>
            <Link to='/create-profile'  className="btn btn-outline-dark my-2 my-sm-0 create-profile-button">Create Profile</Link>
          </div>
        )
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
                {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { getCurrentProfile, deleteProfile })(withRouter(Dashboard));
