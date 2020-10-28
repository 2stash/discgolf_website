import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


const Landing = ({ isAuthenticated }) => {
  if(isAuthenticated){
    return <Redirect to='/discbag'/>
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Disc Golf</h1>
          <p className="lead">
            Create and customize your bag to conquer any course. <br></br>
            Share what discs you use with the community and help grow the sport!
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
          <br/>
          <div className="">

          <p className="lead">What to explore different bag setups without logging in?</p>

          <Link to="/bags" className="btn btn-danger">Browse Bags </Link>

          </div>
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToPRops = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToPRops)(Landing);