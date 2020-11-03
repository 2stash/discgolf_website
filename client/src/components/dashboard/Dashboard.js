import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { deleteAccount } from "../../actions/bag";
import { getBag } from "../../actions/bag";

const Dashboard = ({
  getBag,
  deleteAccount,
  auth: { user },
  bag: { bag, loading },
}) => {
  useEffect(() => {
    getBag();
  }, [ getBag]);

  return loading && bag === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {bag !== null ? (
        <Fragment>
          <Link to='/edit-profile' className='btn btn-primary my-1'>
            Edit Profile
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}

      {bag !== null ? (
        <Link to='discbag' className='btn btn-light'>
          <i className='fas fa-shopping-bag'></i> Edit Disc Bag
        </Link>
      ) : (
        <Link to='discbag' className='btn btn-light'>
          <i className='fas fa-shopping-bag'></i> Create Disc Bag
        </Link>
      )}

      <Link to="imageupload" className="btn btn-success">
      <i className="far fa-images"></i>Upload Image

      </Link>

      

        <br/><br/><br/><br/>
      <button onClick={() => deleteAccount()} className='btn btn-danger'>
        <i className='fas fa-user-minus'></i> Delete My Account
      </button>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  bag: PropTypes.object.isRequired,
  getBag: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  bag: state.bag,
});

export default connect(mapStateToProps, {
  deleteAccount,
  getBag,
})(Dashboard);
