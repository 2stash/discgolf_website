import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteDisc} from '../../actions/bag';
import { setDiscToEdit } from '../../actions/bag';



const DisplayDiscs = ({ discList, deleteDisc, setDiscToEdit }) => {
 
  const onClick = (discId) => {
    setDiscToEdit(discId)
  }

  const discs = discList.map(disc => (
    <tr key={disc._id}>
      <td>{disc.discname}</td>
      <td>{disc.discmanufacturer}</td>
      <td>{disc.disctype}</td>
      <td>{disc.discspeed}</td>
      <td>{disc.discglide}</td>
      <td>{disc.discturn}</td>
      <td>{disc.discfade}</td>
      <td><button onClick={() => onClick(disc._id)} className="btn btn-info">Edit</button></td>
      <td>
        <button 
          onClick={() => deleteDisc(disc._id)} 
          className="btn btn-danger"
          >
          Delete
          </button>
        </td>
    </tr>
  ))

  return (
    <Fragment>
      <div className="disc-table">
      {/* <h2 className="my-2">Your Discs</h2> */}
      <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Manufacturer</th>
          <th>Type</th>
          <th>Speed</th>
          <th>Glide</th>
          <th>Turn</th>
          <th>Fade</th>
          <th />
          <th />
        </tr>
        </thead>
        <tbody>
          {discs}
        </tbody>

      </table>
      </div>
    </Fragment>
  )
}

DisplayDiscs.propTypes = {
  discList: PropTypes.array.isRequired,
  deleteDisc: PropTypes.func.isRequired,
  setDiscToEdit: PropTypes.func.isRequired,
};

export default connect(null, {deleteDisc, setDiscToEdit})(DisplayDiscs);

