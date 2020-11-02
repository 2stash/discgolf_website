import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


const ProfileTop = ({profile: {disccollection }}) => {

  const discs = disccollection.map((disc) => (
    <tr key={disc._id}>
      <td>{disc.discname}</td>
      <td>{disc.discmanufacturer}</td>
      <td>{disc.disctype}</td>
      <td>{disc.discspeed}</td>
      <td>{disc.discglide}</td>
      <td>{disc.discturn}</td>
      <td>{disc.discfade}</td>
    </tr>
  ));
  
  return ( 
    // <Fragment>
      <div className='disc-table-div'>
        <table className='disc-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Type</th>
              <th>Speed</th>
              <th>Glide</th>
              <th>Turn</th>
              <th>Fade</th>
            </tr>
          </thead>
          <tbody>{discs}</tbody>
        </table>
      </div>
    // </Fragment>
  
  )
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
}


export default ProfileTop
