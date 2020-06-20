import { axios } from "../utils";
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
