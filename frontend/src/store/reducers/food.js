import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils";

const initialState = {
  own: [],
  nearest: [],
  loading: false,
  error: null,
};

const foodNearestStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
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

const foodOwnStart = (state, action) => {
  return updateObject(state, {
    loading: true,
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

const foodPostStart = (state, action) => {
  return updateObject(state, {
    loading: true,
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

const foodDeleteSuccess = (state, action) => {
  return updateObject(state, {
    own: [...state.own.filter((food) => food.id !== action.id)],
    loading: false,
  });
};

const foodDeleteFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const foodUpdateSuccess = (state, action) => {
  const updatedIndex = state.own.findIndex(
    (item) => item.id === action.food.id
  );
  return updateObject(state, {
    own: [
      ...state.own.slice(0, updatedIndex),
      action.food,
      ...state.own.slice(updatedIndex + 1),
    ],
    loading: false,
  });
};

const foodUpdateFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FOOD_NEAREST_START:
      return foodNearestStart(state, action);
    case actionTypes.FOOD_NEAREST_SUCCESS:
      return foodNearestSuccess(state, action);
    case actionTypes.FOOD_NEAREST_FAIL:
      return foodNearestFail(state, action);
    case actionTypes.FOOD_OWN_START:
      return foodOwnStart(state, action);
    case actionTypes.FOOD_OWN_SUCCESS:
      return foodOwnSuccess(state, action);
    case actionTypes.FOOD_OWN_FAIL:
      return foodOwnFail(state, action);
    case actionTypes.FOOD_POST_START:
      return foodPostStart(state, action);
    case actionTypes.FOOD_POST_SUCCESS:
      return foodPostSuccess(state, action);
    case actionTypes.FOOD_POST_FAIL:
      return foodPostFail(state, action);
    case actionTypes.FOOD_DELETE_SUCCESS:
      return foodDeleteSuccess(state, action);
    case actionTypes.FOOD_DELETE_FAIL:
      return foodDeleteFail(state, action);
    case actionTypes.FOOD_UPDATE_SUCCESS:
      return foodUpdateSuccess(state, action);
    case actionTypes.FOOD_UPDATE_FAIL:
      return foodUpdateFail(state, action);
    default:
      return state;
  }
};

export default reducer;
