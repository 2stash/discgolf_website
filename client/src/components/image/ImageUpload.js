import React, { useEffect, Fragment } from "react";
import Image from "./Image";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBag } from "../../actions/bag";
import ProfileImage from "../profile/ProfileImage";
import Spinner from "../layout/Spinner";

const ImageUpload = ({   getBag,
  auth: { user },
  bag: { bag, loading }, }) => {
    useEffect(() => {
      getBag();
    }, [getBag]);

  return (
    <div className="image-upload-container">
      {bag === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className=''>
            <h1 className='large text-primary'>Upload Picture</h1>
            <ProfileImage profile={bag} />
            <Image />
          </div>
        </Fragment>
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  getBag: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  bag: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bag: state.bag,
  auth: state.auth,
});

export default connect(mapStateToProps, { getBag })(ImageUpload);
