import { axios } from "../../utils";
import * as actionTypes from "./actionTypes";

export const foodNearestSuccess = (food) => {
  return {
    type: actionTypes.FOOD_NEAREST_SUCCESS,
    food,
  };
};

export const foodNearestFail = (error) => {
  return {
    type: actionTypes.FOOD_NEAREST_FAIL,
    error: error,
  };
};

export const foodOwnSuccess = (food) => {
  return {
    type: actionTypes.FOOD_OWN_SUCCESS,
    food,
  };
};

export const foodOwnFail = (error) => {
  return {
    type: actionTypes.FOOD_OWN_FAIL,
    error: error,
  };
};

export const foodPostSuccess = (food) => {
  return {
    type: actionTypes.FOOD_POST_SUCCESS,
    food,
  };
};

export const foodPostFail = (error) => {
  return {
    type: actionTypes.FOOD_POST_FAIL,
    error: error,
  };
};

export const foodNearest = (token) => {
  return (dispatch) => {
    axios
      .get("/food/nearest/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        dispatch(foodNearestSuccess(res.data));
      })
      .catch((err) => {
        dispatch(foodNearestFail(err.message));
      });
  };
};

export const foodOwn = (token) => {
  return (dispatch) => {
    axios
      .get("/food/own/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        dispatch(foodOwnSuccess(res.data));
      })
      .catch((err) => {
        dispatch(foodOwnFail(err.message));
      });
  };
};

export const foodCreate = (token, food) => {
  return (dispatch) => {
    axios
      .post("/food/", food, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        //TODO: Dispatch FoodCreateSuccess
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
};
