import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_BAG,
  BAG_ERROR,
  DELETE_DISC,
  SET_DISC,
  UPDATE_DISC,
  UPLOAD_IMAGE,
  CLEAR_BAG,
  GET_BAGS,
  CLEAR_SETDISC,
  ACCOUNT_DELETED
} from "./types";

// Get current users bag
export const getBag = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/bag/me");
    dispatch({
      type: GET_BAG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all bags PUBLIC
export const getBags = () => async (dispatch) => {
  dispatch({ type: CLEAR_BAG });
  try {
    const res = await axios.get("/api/bag");
    dispatch({
      type: GET_BAGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get bag by User ID PUBLIC
export const getBagById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/bag/user/${userId}`);
    dispatch({
      type: GET_BAG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Disc
export const deleteDisc = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/bag/${id}`);
    dispatch({
      type: DELETE_DISC,
      payload: res.data,
    });
    dispatch(setAlert("Disc Deleted", "success"));
  } catch (err) {
    dispatch({
      type: BAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Disc
export const addDisc = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/bag", formData, config);

    dispatch({
      type: GET_BAG,
      payload: res.data,
    });

    dispatch(setAlert("Disc Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    console.error(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: BAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// update disc
export const editDisc = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(`/api/bag/${formData._id}`, formData, config);

    dispatch({
      type: UPDATE_DISC,
      payload: res.data,
    });

    dispatch(setAlert("Bag Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: BAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const setDiscToEdit = (id) => async (dispatch) => {
  dispatch({ type: SET_DISC, payload: id });
};

export const clearSetDiscToEdit = () => async (dispatch) => {
  dispatch({ type: CLEAR_SETDISC });
};

// Upload image
export const uploadImage = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/image`, formData);

    dispatch({
      type: UPLOAD_IMAGE,
      payload: res.data,
    });

    const resMongoDB = await axios.post("/api/image/upload", res.data);

    dispatch({
      type: GET_BAG,
      payload: resMongoDB.data,
    });

    dispatch(setAlert("Image Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: BAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/bag/profile", formData, config);

    dispatch({
      type: GET_BAG,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: BAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


// Delete account (user and bag)
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone")) {
    try {
      await axios.delete(`/api/bag`);
      dispatch({ type: CLEAR_BAG });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("Your account has been permanently deleted"));
    } catch (err) {
      dispatch({
        type: BAG_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};