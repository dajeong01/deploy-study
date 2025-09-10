import api from "../axios";

export const reqPrincipal = async () => await api.get("/api/account/principal");

export const reqCheckNickname = (nickname) =>
  api.get("/api/users/nickname/check", { params : {nickname} }, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

  
export const reqRegisterUser = async (data) => await api.post("/api/users", data);

export const reqUpdateUser = (data) => api.post("/api/mypage", data, {
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

export const reqGetUserWelcome = (userId) => api.get(`/api/${userId}/mypage`);

export const reqGetReportByUserId = (userId) => api.get(`/api/${userId}/reports`);

export const reqUserProfileUpdate = (userId, formData) => api.post(`/api/${userId}/picture`, formData, {
  headers: {
    "Content-Type": "mutipart/form-data",
  },
});

export const reqUserInfoUpdate = (data) => api.patch(`/api/user/update`, data);

export const reqDeleteUser = (userId) => api.delete(`/api/${userId}/delete`);

export const reqMyCrews = (userId) => api.get(`/api/${userId}/crews`);

export const reqMyGatherings = (userId) => api.get(`/api/users/${userId}/gatherings`);

