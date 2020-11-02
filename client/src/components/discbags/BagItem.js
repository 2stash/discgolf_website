import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BagItem = ({
  bag: {
    disccollection,
    imageURL,
    favoritedisc,
    favoritebrand,
    homecourse,
    user: { _id, name },
  },
}) => {
  if (imageURL === null || imageURL === undefined || disccollection.length < 1)
    return null;

  const discAmount = disccollection.length;

  return (
    <div className='card-bagpage-container'>
      <div className='card-bagpage'>
        {/* <h4 className='my-2'>{name}'s Disc Golf Bag</h4> */}
        {imageURL ? (
          <img src={imageURL} alt='Disc Bag' className='card-img' />
        ) : null}
        <div className='card-flex'>
          {favoritedisc ? (
            <p>
              <strong>Favorite Disc:</strong> {favoritedisc}
            </p>
          ) : null}
          {favoritebrand ? (
            <p>
              <strong>Favorite Brand: </strong> {favoritebrand}
            </p>
          ) : null}
          {homecourse ? (
            <p>
              <strong>Homecourse: </strong> {homecourse}
            </p>
          ) : null}
          <p>
            <strong>Disc Count</strong>: {discAmount}
          </p>

          <Link
            to={`/bag/${_id}`}
            className='btn btn-primary btn-block card-btn'
          >
            View Full Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

BagItem.propTypes = {
  bag: PropTypes.object.isRequired,
};

export default BagItem;
