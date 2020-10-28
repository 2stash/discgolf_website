import React, { useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createProfile } from "../../actions/bag";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    favoritedisc: "",
    favoritebrand: "",
    nickname: "",
    homecourse: "",
  });

  const { favoritedisc, favoritebrand, nickname, homecourse } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Just some basic info about discgolf
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Favorite Disc'
            name='favoritedisc'
            value={favoritedisc}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Do you have a favorite disc?</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Favorite Brand'
            name='favoritebrand'
            value={favoritebrand}
            onChange={(e) => onChange(e)}
          />

          <small className='form-text'>What is your favorite brand?</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Nickname'
            name='nickname'
            value={nickname}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Do you have a nickname?</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Home Course'
            name='homecourse'
            value={homecourse}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>What course do you play the most?</small>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
