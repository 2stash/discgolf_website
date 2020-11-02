import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


const ProfileImage = ({profile: {imageURL, nickname, user: {name}}}) => {

    
  return ( 
    <Fragment>
      <div className='profile-image-div'>
        <h2>{nickname ? nickname : name}'s Disc Golf Bag</h2>
        {imageURL ? <img src={imageURL} alt="Disc Bag" className="profile-image" /> : <p>Please upload an image.</p>}
      </div>
    </Fragment>
  
  )
}

ProfileImage.propTypes = {
  profile: PropTypes.object.isRequired,
}


export default ProfileImage;
