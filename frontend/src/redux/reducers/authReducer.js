import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAILURE,
  GIT_LOGIN_REQUEST,
  GIT_LOGIN_SUCCESS,
  GIT_LOGIN_FAILURE,
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
    case GOOGLE_LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        success: true,
      };
    case GOOGLE_LOGIN_FAILURE:
      return { ...state, loading: true, error: action.payload, success: false };
    case GIT_LOGIN_REQUEST:
      console.log("req");
      return { ...state, loading: true, error: null };
    case GIT_LOGIN_SUCCESS:
      console.log("succ");
      return { ...state, loading: false, user: action.payload, success: true };
    case GIT_LOGIN_FAILURE:
      console.log("fail");
      return { ...state, loading: true, error: action.payload, success: false };
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
