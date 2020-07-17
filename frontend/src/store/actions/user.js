import { axios } from "../../utils";
import * as actionTypes from "./actionTypes";

export const userPostStart = () => {
  return {
    type: actionTypes.USER_POST_START,
  };
};

export const userPostSuccess = (user) => {
  return {
    type: actionTypes.USER_POST_SUCCESS,
    token: user.token,
    user: user.user,
  };
};

export const userPostFail = (error) => {
  return {
    type: actionTypes.USER_POST_FAIL,
    error: error,
  };
};

export const userUpdateSuccess = (user) => {
  return {
    type: actionTypes.USER_UPDATE_SUCCESS,
    user: user,
  };
};

export const userCreate = (user) => {
  return (dispatch) => {
    dispatch(userPostStart());
    axios
      .post("/auth/create/", user)
      .then((res) => {
        dispatch(userPostSuccess(res.data));
      })
      .catch((err) => {
        dispatch(userPostFail(err.message));
      });
  };
};

export const userLogin = (queryParams) => {
  return (dispatch) => {
    axios
      .post("/auth/login/", { query_params: queryParams })
      .then((res) => {
        dispatch(userPostSuccess(res.data));
      })
      .catch((err) => {
        dispatch(userPostFail(err.message));
      });
  };
};

export const userUpdate = (token, user) => {
  return (dispatch) => {
    axios
      .put("/users/1/", user, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        const user = res.data;
        dispatch(userUpdateSuccess(user));
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
};
