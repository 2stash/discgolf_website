import React, { Fragment, useEffect } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import DiscBag from "./components/discbag/DiscBag";
import Bags from "./components/discbags/Bags";
import Profile from "./components/profile/Profile";
import PrivateRoute from "./components/routing/PrivateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import ImageUpload from './components/image/ImageUpload';



if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
  <Provider store={store}>
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <div className='container'>
        <Alert />
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/bags' component={Bags} />
          <Route exact path='/bag/:id' component={Profile} />

          <PrivateRoute exact path='/imageupload' component={ImageUpload}/>
          <PrivateRoute exact path='/dashboard' component={ Dashboard }/>
          <PrivateRoute exact path='/create-profile' component={ CreateProfile }/>
          <PrivateRoute exact path='/edit-profile' component={ EditProfile }/>
          <PrivateRoute exact path='/discbag' component={ DiscBag }/>
        </Switch>
      </div>
    </Fragment>
  </Router>
  </Provider>
  )
};
export default App;
