import { axios } from "../../utils";
import * as actionTypes from "./actionTypes";

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

// export const userGetSuccess = (user) => {
//   return {
//     type: actionTypes.USER_GET_SUCCESS,
//     user,
//   };
// };

// export const userGetFail = (error) => {
//   return {
//     type: actionTypes.USER_GET_FAIL,
//     error: error,
//   };
// };

export const userCreate = (user) => {
  return (dispatch) => {
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
