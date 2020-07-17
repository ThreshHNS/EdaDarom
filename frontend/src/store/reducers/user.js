import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils";

const initialState = {
  token: null,
  vkId: null,
  firstName: null,
  lastName: null,
  city: null,
  country: null,
  avatar: null,
  locationCoords: [],
  locationTitle: null,
  radius: null,
  notificationStatus: null,
  loading: false,
};

const userPostStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const userPostSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    vkId: action.user.properties.vk_id,
    firstName: action.user.properties.first_name,
    lastName: action.user.properties.last_name,
    avatar: action.user.properties.avatar_url,
    city: action.user.properties.city,
    country: action.user.properties.country,
    locationCoords: action.user.geometry.coordinates,
    locationTitle: action.user.properties.location_title,
    radius: action.user.properties.notifications_radius,
    notificationStatus: action.user.properties.notifications_status,
    loading: false,
  });
};

const userPostFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const userUpdateSuccess = (state, action) => {
  return updateObject(state, {
    firstName: action.user.properties.first_name,
    lastName: action.user.properties.last_name,
    avatar: action.user.properties.avatar_url,
    city: action.user.properties.city,
    country: action.user.properties.country,
    locationCoords: action.user.geometry.coordinates,
    locationTitle: action.user.properties.location_title,
    radius: action.user.properties.notifications_radius,
    notificationStatus: action.user.properties.notifications_status,
    loading: false,
  });
};
// const userGetSuccess = (state, action) => {
//   return updateObject(state, {
//     loading: false,
//   });
// };

// const userGetFail = (state, action) => {
//   return updateObject(state, {
//     error: action.error,
//     loading: false,
//   });
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_POST_START:
      return userPostStart(state, action);
    case actionTypes.USER_POST_SUCCESS:
      return userPostSuccess(state, action);
    case actionTypes.USER_POST_FAIL:
      return userPostFail(state, action);
    case actionTypes.USER_UPDATE_SUCCESS:
      return userUpdateSuccess(state, action);
    // case actionTypes.USER_GET_SUCCESS:
    //   return userGetSuccess(state, action);
    // case actionTypes.USER_GET_FAIL:
    //   return userGetFail(state, action);
    default:
      return state;
  }
};

export default reducer;
