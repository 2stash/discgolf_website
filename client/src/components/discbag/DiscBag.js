import React, { useEffect, Fragment } from "react";
import AddDisc from './AddDisc';
import DisplayDiscs from './DisplayDiscs';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getBag } from "../../actions/bag";
import EditDisc from './EditDisc';
import DisplayEmptyBag from './DisplayEmptyBag';

const DiscBag = ({
  getBag,
  auth: { user },
  bag: { bag, loading, editdisc },
  
}) => {
  useEffect(() => {
    getBag();
  }, [getBag]);
  
  return loading && bag === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="discbag-container">
      {!editdisc ? (
        <AddDisc />
      ) : (<EditDisc />)}

      {bag !== null ? <DisplayDiscs  discList={bag.disccollection} /> : <DisplayEmptyBag  />}
      </div>
    </Fragment>
  );
  
};

DiscBag.propTypes = {
  getBag: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  bag: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  bag: state.bag,
});

export default connect(mapStateToProps, { getBag })(DiscBag);

