import api from "../axios"

// user
export const reqSearchUsers = ({ page, size, searchText }) => api.get("/api/admin/users", {
  params: { page, size, searchText }
});

export const reqUserReported = (userId) => api.get(`/api/reports/${userId}`);


// crew
export const reqSearchCrews = ({ page, size, searchText }) => api.get("/api/admin/crews", {
  params: { page, size, searchText }
});

// report
export const reqReportDelete = (reportId) => api.delete(`/api/admin/reports/${reportId}`);

export const reqGetUserPosts = ({
  page = 1,
  size = 10,
  searchText = "",
  src = "",
  crewId = "",
  userId, // ← 필수
}) =>
  api.get("/api/admin/posts", {
    params: { page, size, searchText, src, crewId, userId },
  });

  export const reqRegisterAnswer = ({ askId, content }) => api.post(`/api/ask/${askId}`, { content });

  
export const reqPostCrewMessage = (crewId, content) =>
  api.post(`/api/admin/${crewId}/messages`, { content });
