import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editDisc, clearSetDiscToEdit } from "../../actions/bag";

const EditProfile = ({
  bag: { bag, loading, disctoedit },
  editDisc,
  clearSetDiscToEdit,
}) => {
  let disc = bag.disccollection.filter((item) => item._id === disctoedit);

  const [formData, setFormData] = useState({
    _id: "",
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

  useEffect(() => {
    setFormData({
      _id: disctoedit,
      discname: loading || !disc[0].discname ? "" : disc[0].discname,
      discmanufacturer:
        loading || !disc[0].discmanufacturer ? "" : disc[0].discmanufacturer,
      disctype: loading || !disc[0].disctype ? "" : disc[0].disctype,
      discspeed: loading || !disc[0].discspeed ? "" : disc[0].discspeed,
      discglide: loading || !disc[0].discglide ? "" : disc[0].discglide,
      discturn: loading || !disc[0].discturn ? "" : disc[0].discturn,
      discfade: loading || !disc[0].discfade ? "" : disc[0].discfade,
    });
    // eslint-disable-next-line
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    editDisc(formData);
  };

  const discardChanges = () => {
    clearSetDiscToEdit();
  };

  return (
    <div>
      <h1 className='large text-primary'>Update Disc</h1>
      <small>* = required field</small>
      <div className='add-disc'>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
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
              placeholder='* Manufacturer'
              name='discmanufacturer'
              value={discmanufacturer}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
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

          <input
            type='submit'
            className='btn btn-primary my-1'
            value='Save Changes'
          />
          <button className='btn btn-info' onClick={discardChanges}>
            Discard Changes
          </button>
        </form>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  bag: PropTypes.object.isRequired,
  editDisc: PropTypes.func.isRequired,
  clearSetDiscToEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  bag: state.bag,
});

export default connect(mapStateToProps, { editDisc, clearSetDiscToEdit })(
  EditProfile
);
