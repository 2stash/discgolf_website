import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/bags'><i className="fas fa-search"></i> <span className='hide-sm'>Browse Bags</span></Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-home'></i> <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      {/* <li>
        <Link to='/discbag'>
          <i className='fas fa-shopping-bag'></i> Disc Bag
        </Link>
      </li> */}
      <li>
        {user !== null && <Link to={`/bag/${user._id}`} >
          <i className='fas fa-user'></i>{" "}
          <span className='hide-sm'>Profile</span>
        </Link>}     
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{" "}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/bags'>Browse Bags</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-compact-disc'></i> Build Your Bag
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
