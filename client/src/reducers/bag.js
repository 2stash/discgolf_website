import {
  GET_BAG,
  BAG_ERROR,
  DELETE_DISC,
  CLEAR_BAG,
  SET_DISC,
  UPDATE_DISC,
  UPLOAD_IMAGE,
  GET_BAGS,
  CLEAR_SETDISC
} from "../actions/types";

const initialState = {
  bag: null,
  loading: true,
  error: {},
  editdisc: false,
  disctoedit: null,
  imageURL: null,
  bags: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BAG:
    case DELETE_DISC:
      return {
        ...state,
        bag: payload,
        loading: false,
      };
    case GET_BAGS:
      return {
        ...state,
        bags: payload,
        loading: false
      }
    case BAG_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        bag: null,
      };
    case CLEAR_BAG:
      return {
        ...state,
        bag: null,
      };
    case SET_DISC:
      return {
        ...state,
        editdisc: true,
        disctoedit: payload,
      };
    case UPDATE_DISC:
      return {
        ...state,
        bag: payload,
        editdisc: false,
        loading: false,
        disctoedit: null,
      };
    case CLEAR_SETDISC:
      return {
        ...state,
        editdisc: false,
        disctoedit: null,
        
      }
    case UPLOAD_IMAGE:
      return {
        ...state,
        imageURL: payload,
      }
    default:
      return state;
  }
}
