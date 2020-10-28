import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getBagById } from "../../actions/bag";
import ProfileTop from "./ProfileTable";

const Profile = ({ getBagById, match, bag: { bag, loading }, auth }) => {
  useEffect(() => {
    getBagById(match.params.id);
  }, [getBagById, match.params.id]);

  return (
    <Fragment>
      {bag === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='profile-grid my-1'>
            <ProfileTop profile={bag} />
          </div>
          <Link to='/bags' className='btn btn-light'>
            Back to Bags
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === bag.user._id && (
              <Link to='/discbag'>Edit Bag</Link>
            )}
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getBagById: PropTypes.func.isRequired,
  bag: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bag: state.bag,
  auth: state.auth,
});

export default connect(mapStateToProps, { getBagById })(Profile);
