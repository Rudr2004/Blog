import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from "../actions/authAction";

const initialState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload, success: true };
    case REGISTER_SUCCESS:
      return { ...state, loading: false, success: true };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;
