import {
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} from '../redux/userReducer';

// Get All user
export const getUsers = (api, page = 1) => {
  return async (dispatch) => {
    dispatch(getUsersStart());
    try {
      const response = await api.get(`/users?page${page}`);
      dispatch(getUsersSuccess(response.data));
      return;
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      dispatch(getUsersFailure(error.response.data));
    }
  };
};

// Delete User
export const deleteUser = (api, id) => {
  return async (dispatch) => {
    dispatch(deleteUserStart());
    try {
      await api.delete(`/users/${id}`);
      dispatch(deleteUserSuccess(id));
    } catch (err) {
      dispatch(deleteUserFailure());
    }
  };
};

// Update User
export const updateUser = (api, id, user) => {
  return async (dispatch) => {
    dispatch(updateUserStart());
    try {
      // update
      const response = await api.put('/users/' + id, user);
      dispatch(updateUserSuccess({ id, user: response.data }));
      return response.data;
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      dispatch(updateUserFailure(error.response.data));
      throw new Error(error.response.data.message);
    }
  };
};

// Add User
export const addUser = async (api, user, cb) => {
  return async (dispatch) => {
    dispatch(addUserStart());
    try {
      const res = await api.post(`/users`, user);
      dispatch(addUserSuccess(res.data));
      if (cb) cb();
    } catch (err) {
      dispatch(addUserFailure());
    }
  };
};
