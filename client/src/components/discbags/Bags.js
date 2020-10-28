import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { getBags } from "../../actions/bag";
import BagItem from "./BagItem";

const Bags = ({
  getBags,
  bag: { bags, loading },
}) => {
  useEffect(() => {
    getBags();
  }, [getBags]);

  return loading === true && bags === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Bags</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse other peoples bags
          </p>
          <div className='card'>
            {bags.length > 0 ? (
              bags.map((bag) => <BagItem key={bag._id} bag={bag} />)
            ) : (
              <h4>No Bags found</h4>
            )}
          </div>

        </Fragment>
      )}

Bags.propTypes = {
  getBags: PropTypes.func.isRequired,
  bag: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bag: state.bag,
});

export default connect(mapStateToProps, { getBags })(Bags);
