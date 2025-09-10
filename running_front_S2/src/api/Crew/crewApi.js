
import { ExportPrint } from "@mui/x-data-grid";
import api from "../axios";

export const reqCrewDetail = (crewId) => api.get(`/api/crews/${crewId}`);

export const reqCheckCrewName = (crewName) =>
  api.get("/api/crews", {
  params: { crewName },
});

export const reqRegisterCrew = (data) =>
  api.post("/api/crews", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqGetCrewList = ({ page, size, gunguId, searchText }) => {
  return api.get("/api/crews", {
    params: { page, size, gunguId, searchText },
  });
};

export const getCrewRole = (userId) => api.get(`/api/crews/${userId}/role`);

export const reqCrewThumbnailUpdate = (crewId, formData) => api.post(`/api/crews/${crewId}/thumbnail`, formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  }
})

export const reqCrewProfileUpdate = (crewId, formData) => api.post(`/api/crews/${crewId}/profile`, formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  }
})

export const reqCrewUpdate = (crewId, data) => api.patch(`/api/crews/${crewId}`, data);


export const reqCrewAlbum = (crewId) => api.get(`/api/crews/${crewId}/albums`);

export const reqGetSectionsLatest = (crewId) =>
  api.get(`/api/crews/${crewId}/meta/latest`);

export const reqGetMessage = (crewId) => api.get(`/api/crews/${crewId}/messages`);