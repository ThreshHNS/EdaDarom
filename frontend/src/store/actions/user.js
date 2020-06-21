import { axios } from "../../utils";
import * as actionTypes from "./actionTypes";

export const userPostSuccess = (user) => {
  return {
    type: actionTypes.USER_POST_SUCCESS,
    user,
  };
};

export const userPostFail = (error) => {
  return {
    type: actionTypes.USER_POST_FAIL,
    error: error,
  };
};

export const userGetSuccess = (user) => {
  return {
    type: actionTypes.USER_GET_SUCCESS,
    user,
  };
};

export const userGetFail = (error) => {
  return {
    type: actionTypes.USER_GET_FAIL,
    error: error,
  };
};

export const userPost = (user) => {
  return (dispatch) => {
    axios
      .post("/users/", user)
      .then((res) => {
        dispatch(userPostSuccess(res.data));
      })
      .catch((err) => {
        dispatch(userPostFail(err.message));
      });
  };
};

export const userGet = (id) => {
  return (dispatch) => {
    axios
      .get("/users/1/", { params: { vk_id: id } })
      .then((res) => {
        dispatch(userPostSuccess(res.data));
      })
      .catch((err) => {
        dispatch(userPostFail(err.message));
      });
  };
};

// export const userGet = (id) => {
//   return (dispatch) => {
//     axios
//       .post("/users/", user)
//       .then((res) => {
//         dispatch(userPostSuccess(res.data));
//       })
//       .catch((err) => {
//         console.log(err.response.data);
//         dispatch(userPostFail(err.message));
//       });
//   };
// };

// export const authSignup = (user) => {
//   return (dispatch) => {
//     axios
//       .post("/auth/signup/", user)
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((err) => {
//         dispatch(authFail(err.response));
//       });
//   };
// };

// export const authActivate = (uid, token, manager, redirect) => {
//   return (dispatch) => {
//     const data = {
//       uid,
//       token,
//     };
//     axios
//       .post("/user/activate/", data)
//       .then((res) => {
//         const user = {
//           token: res.data.token,
//           username: res.data.user.username,
//           image: res.data.user.image,
//           userId: res.data.user.id,
//           firstName: res.data.user.first_name,
//           lastName: res.data.user.last_name,
//           manager: res.data.user.manager,
//           city: res.data.user.city,
//           country: res.data.user.country,
//           income: res.data.user.income,
//           phone_number: res.data.user.phone_number,
//           bepic_name: res.data.user.bepic_name,
//           landing: res.data.user.landing,
//           isStaff: res.data.user.is_staff,
//           isPartner: res.data.user.is_partner,
//         };
//         localStorage.setItem("token", user.token);
//         dispatch(authSuccess(user));
//         if (manager) {
//           dispatch(newInvitedUser(user.token, manager, redirect));
//         }
//       })
//       .catch((err) => {
//         dispatch(authFail(err.response.data));
//       });
//   };
// };

// export const authResetPass = (email) => {
//   return (dispatch) => {
//     axios.post("/auth/password/reset/", email);
//   };
// };

// export const authResetConfirm = (data) => {
//   return (dispatch) => {
//     axios
//       .post("/auth/password/reset/confirm/", data)
//       .then(() => {
//         dispatch(authResetSuccess());
//       })
//       .catch((err) => {
//         dispatch(authResetFail(err.response.data.error[0]));
//       });
//   };
// };

// export const authSocialSignup = (code) => {
//   return (dispatch) => {
//     axios
//       .post("/auth/social/knox_user/", code)
//       .then((res) => {
//         const user = {
//           token: res.data.token,
//           username: res.data.user.username,
//           image: res.data.user.image,
//           userId: res.data.user.id,
//           firstName: res.data.user.first_name,
//           lastName: res.data.user.last_name,
//           manager: res.data.user.manager,
//           city: res.data.user.city,
//           country: res.data.user.country,
//           income: res.data.user.income,
//           phone_number: res.data.user.phone_number,
//           bepic_name: res.data.user.bepic_name,
//           landing: res.data.user.landing,
//           isStaff: res.data.user.is_staff,
//           isPartner: res.data.user.is_partner,
//         };
//         localStorage.setItem("token", user.token);
//         dispatch(authSuccess(user));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

// export const authCheckState = () => {
//   return (dispatch) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios
//         .get("/user/", {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         })
//         .then((res) => {
//           const user = {
//             token: token,
//             username: res.data.username,
//             image: res.data.image,
//             userId: res.data.id,
//             firstName: res.data.first_name,
//             lastName: res.data.last_name,
//             manager: res.data.manager,
//             city: res.data.city,
//             country: res.data.country,
//             income: res.data.income,
//             phone_number: res.data.phone_number,
//             bepic_name: res.data.bepic_name,
//             landing: res.data.landing,
//             isStaff: res.data.is_staff,
//             isPartner: res.data.is_partner,
//           };
//           dispatch(authSuccess(user));
//         })
//         .catch((err) => {
//           localStorage.removeItem("token");
//           console.log(err.message);
//         });
//     }
//   };
// };

// export const uploadAvatar = (token, image) => {
//   console.log(image);
//   return (dispatch) => {
//     axios
//       .put("/user/avatar/", image, {
//         headers: {
//           Authorization: `Token ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         const image = res.data.image;
//         dispatch(uploadAvatarSuccess(image));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

// export const updateProfile = (token, landing) => {
//   return (dispatch) => {
//     axios
//       .put("/user/1/", landing, {
//         headers: { Authorization: `Token ${token}` },
//       })
//       .then((res) => {
//         const user = res.data;
//         dispatch(updateProfileSuccess(user));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };
