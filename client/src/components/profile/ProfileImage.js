import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


const ProfileImage = ({profile: {imageURL, user: {name}}}) => {

    
  return ( 
    <Fragment>
      <div className='disc-table'>
        <h2 className='my-2'>{name}'s Disc Golf Bag</h2>
        {imageURL ? <img src={imageURL} alt="Disc Bag"/> : <p>Please upload an image.</p>}
      </div>
    </Fragment>
  
  )
}

ProfileImage.propTypes = {
  profile: PropTypes.object.isRequired,
}


export default ProfileImage;
