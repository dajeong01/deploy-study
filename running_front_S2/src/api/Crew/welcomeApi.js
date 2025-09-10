import api from "../axios";

export const reqJoinCrew = (crewId, data) => api.post(`/api/welcomes/${crewId}`, data);

export const reqCrewWelcomes = (crewId) => api.get(`/api/welcomes/${crewId}`);

export const reqRejectWelcome = (welcomeId) => api.patch(`/api/welcomes/${welcomeId}`);

export const reqMyWelcome = (userId) => api.get(`/api/welcomes/mypage/${userId}`);

export const reqUpdateMyWelcome = (updateData) => api.patch(`/api/mypage`, updateData);

export const reqDeleteMyWelcome = (welcomeId) => api.delete(`/api/mypage/${welcomeId}`);