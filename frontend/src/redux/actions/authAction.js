export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const GOOGLE_LOGIN_REQUEST = "GOOGLE_LOGIN_REQUEST";
export const GOOGLE_LOGIN_SUCCESS = "GOOGLE_LOGIN_SUCCESS";
export const GOOGLE_LOGIN_FAILURE = "GOOGLE_LOGIN_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";

// Login actions
export const loginRequest = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

//Google Login
export const googleLoginRequest = () => ({
  type: GOOGLE_LOGIN_REQUEST,
});

export const googleLoginSuccess = () => ({
  type: GOOGLE_LOGIN_SUCCESS,
  payload: {},
});

export const googleLoginFailure = (error) => ({
  type: GOOGLE_LOGIN_FAILURE,
  payload: error,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Register actions
export const registerRequest = (userData) => ({
  type: REGISTER_REQUEST,
  payload: userData,
});

export const registerSuccess = (userData) => ({
  type: REGISTER_SUCCESS,
  payload: userData,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

// Logout action
export const LOGOUT = "LOGOUT";

export const logout = () => ({
  type: LOGOUT,
});

// Action for resetting password
export const resetPasswordRequest = (data) => ({
  type: RESET_PASSWORD_REQUEST,
  payload: data,
});
