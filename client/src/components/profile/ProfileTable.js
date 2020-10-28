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
    <Fragment>
      <div className='disc-table'>
        <table className='table'>
          <thead>
            <tr>
              <th>Disc Name</th>
              <th>Disc Manufacturer</th>
              <th>Disc Type</th>
              <th>Disc Speed</th>
              <th>Disc Glide</th>
              <th>Disc Turn</th>
              <th>Disc Fade</th>
            </tr>
          </thead>
          <tbody>{discs}</tbody>
        </table>
      </div>
    </Fragment>
  
  )
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
}


export default ProfileTop