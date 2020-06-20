import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils";

const initialState = {
  token: null,
  username: null,
  userId: null,
  firstName: null,
  lastName: null,
  image: null,
  city: null,
  country: null,
  income: null,
  phone_number: null,
  bepic_name: null,
  landing: null,
  manager: null,
  isStaff: false,
  isPartner: false,
  error: null,
  loading: true,
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.user.token,
    username: action.user.username,
    userId: action.user.userId,
    firstName: action.user.firstName,
    lastName: action.user.lastName,
    city: action.user.city,
    country: action.user.country,
    income: action.user.income,
    phone_number: action.user.phone_number,
    bepic_name: action.user.bepic_name,
    landing: action.user.landing,
    manager: action.user.manager,
    image: action.user.image,
    isStaff: action.user.isStaff,
    isPartner: action.user.isPartner,
    loading: false,
  });
};

const authResetSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const authResetFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
  });
};

const updateProfile = (state, action) => {
  return updateObject(state, {
    city: action.user.city,
    country: action.user.country,
    income: action.user.income,
    phone_number: action.user.phone_number,
    bepic_name: action.user.bepic_name,
    landing: action.user.landing,
    loading: false,
  });
};

const uploadAvatar = (state, action) => {
  return updateObject(state, {
    image: action.image,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.USER_AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.USER_AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.USER_UPDATE_PROFILE:
      return updateProfile(state, action);
    case actionTypes.USER_UPLOAD_AVATAR:
      return uploadAvatar(state, action);
    case actionTypes.USER_RESET_SUCCESS:
      return authResetSuccess(state, action);
    case actionTypes.USER_RESET_FAIL:
      return authResetFail(state, action);
    default:
      return state;
  }
};

export default reducer;
