import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils";

const initialState = {
  own: [],
  nearest: [],
  loading: true,
  error: null,
};

const foodNearestSuccess = (state, action) => {
  return updateObject(state, {
    nearest: action.food,
    loading: false,
  });
};

const foodNearestFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const foodOwnSuccess = (state, action) => {
  return updateObject(state, {
    own: action.food,
    loading: false,
  });
};

const foodOwnFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const foodPostSuccess = (state, action) => {
  return updateObject(state, {
    own: [...state.own, action.food],
    loading: false,
  });
};

const foodPostFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FOOD_NEAREST_SUCCESS:
      return foodNearestSuccess(state, action);
    case actionTypes.FOOD_NEAREST_FAIL:
      return foodNearestFail(state, action);
    case actionTypes.FOOD_OWN_SUCCESS:
      return foodOwnSuccess(state, action);
    case actionTypes.FOOD_OWN_FAIL:
      return foodOwnFail(state, action);
    case actionTypes.FOOD_POST_SUCCESS:
      return foodPostSuccess(state, action);
    case actionTypes.FOOD_POST_FAIL:
      return foodPostFail(state, action);
    default:
      return state;
  }
};

export default reducer;
