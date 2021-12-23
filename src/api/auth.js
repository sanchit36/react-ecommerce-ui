import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from '../redux/authReducer';

// Auth User
export const authUser = (api, routeName, userCredentials, cb) => {
  return async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await api.post(routeName, userCredentials);
      const { user, token } = response.data;

      dispatch(loginSuccess({ user, token }));

      if (cb) cb();
      return response.data;
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw new Error(err);
      }
      dispatch(loginFailure(error?.response?.data));
      throw new Error(error.response.data.message);
    }
  };
};

// Logout User
export const logoutUser = (api) => {
  return async (dispatch) => {
    dispatch(logoutStart());
    try {
      await api.post('/auth/signout');
      dispatch(logoutSuccess({ user: null, token: null }));
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return dispatch(logoutFailure(error.response.data));
    }
  };
};
