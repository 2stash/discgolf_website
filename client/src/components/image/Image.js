import React, { useState } from "react";
import PropTypes from "prop-types";
import { uploadImage } from "../../actions/bag";
import { connect } from "react-redux";

const ImageUpload = ({ uploadImage }) => {
  const [file, setFile] = useState();

  const handleFileUpload = (e) => {
    let selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    uploadImage(formData);
  };

  return (
    <div class="img-upload">
      <form onSubmit={handleFileSubmit}>
        <input type='file' onChange={handleFileUpload} id='customFile' />
        <input type='submit' value='Upload' className='btn btn-primary' />
      </form>
    </div>
  );
};

ImageUpload.propTypes = {
  uploadImage: PropTypes.func.isRequired,
};

export default connect(null, { uploadImage })(ImageUpload);
