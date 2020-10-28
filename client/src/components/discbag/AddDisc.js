import React, { useState } from "react";
import { connect } from "react-redux";
import { addDisc } from "../../actions/bag";
import PropTypes from "prop-types";

const AddDisc = ({ addDisc }) => {
  const [formData, setFormData] = useState({
    discname: "",
    discmanufacturer: "",
    disctype: "",
    discspeed: "",
    discglide: "",
    discturn: "",
    discfade: "",
  });

  const clearState = () =>
    setFormData({
      discname: "",
      discmanufacturer: "",
      disctype: "",
      discspeed: "",
      discglide: "",
      discturn: "",
      discfade: "",
    });
  const {
    discname,
    discmanufacturer,
    disctype,
    discspeed,
    discglide,
    discturn,
    discfade,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addDisc(formData);
    clearState();
  };

  return (
    <div>
      <h1 className='large text-primary'>Add A Disc</h1>
      <small>* = required field</small>
      <div className='add-disc'>
        <form className='form ' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Name'
              name='discname'
              value={discname}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Manufacturer'
              name='discmanufacturer'
              value={discmanufacturer}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            {/* <input
              type='text'
              placeholder='Type'
              name='disctype'
              value={disctype}
              onChange={(e) => onChange(e)}
            /> */}
            <select
              name='disctype'
              value={disctype}
              onChange={(e) => onChange(e)}
            >
            <option></option>
              <option value='Distance Driver'>Distance Driver</option>
              <option value='Fairway Driver'>Fairway Driver</option>
              <option value='Midrange'>Midrange</option>
              <option value='Putter'>Putter</option>
            </select>
          </div>
          <div className='form-group'>
            <input
              type='number'
              placeholder='Speed'
              name='discspeed'
              value={discspeed}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              placeholder='Glide'
              name='discglide'
              value={discglide}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              placeholder='Turn'
              name='discturn'
              value={discturn}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              placeholder='Fade'
              name='discfade'
              value={discfade}
              onChange={(e) => onChange(e)}
            />
          </div>

          <input type='submit' className='btn btn-primary my-1' />
          <a className='btn btn-light my-1' href='dashboard'>
            Go Back
          </a>
        </form>
      </div>
    </div>
  );
};

AddDisc.propTypes = {
  addDisc: PropTypes.func.isRequired,
};

export default connect(null, { addDisc })(AddDisc);
