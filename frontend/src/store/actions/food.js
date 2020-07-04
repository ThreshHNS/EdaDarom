import { axios } from "../../utils";
import * as actionTypes from "./actionTypes";

export const foodNearestStart = () => {
  return {
    type: actionTypes.FOOD_NEAREST_START,
  };
};

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

export const foodOwnStart = () => {
  return {
    type: actionTypes.FOOD_OWN_START,
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

export const foodPostStart = () => {
  return {
    type: actionTypes.FOOD_POST_START,
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

export const foodDeleteSuccess = (id) => {
  return {
    type: actionTypes.FOOD_DELETE_SUCCESS,
    id,
  };
};

export const foodDeleteFail = (error) => {
  return {
    type: actionTypes.FOOD_DELETE_FAIL,
    error: error,
  };
};

export const foodNearest = (token) => {
  return (dispatch) => {
    dispatch(foodNearestStart());
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
    dispatch(foodOwnStart());
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
    dispatch(foodPostStart());
    axios
      .post("/food/", food, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch(foodPostSuccess(res.data));
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
};

export const foodUpdate = (token, id, food) => {
  return (dispatch) => {
    axios
      .patch(`/food/${id}/`, food, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
};

export const foodDelete = (token, id) => {
  return (dispatch) => {
    axios
      .delete(`/food/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        dispatch(foodDeleteSuccess(id));
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
};
