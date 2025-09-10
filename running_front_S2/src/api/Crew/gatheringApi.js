import api from "../axios";

export const reqCrewGatherings = (crewId) =>
  api.get(`/api/crews/${crewId}/gatherings`);

export const reqRegisterGathering = (crewId, data) =>
  api.post(`/api/crews/${crewId}/gatherings`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqGatheringDetail = (crewId, gatheringId) =>
  api.get(`/api/crews/${crewId}/gatherings/${gatheringId}`);

export const reqUpdateGathering = (crewId, gatheringId, data) =>
  api.put(`/api/crews/${crewId}/gatherings/${gatheringId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqAttendGathering = (crewId, gatheringId) =>
  api.post(`/api/crews/${crewId}/gatherings/${gatheringId}/attend`);

export const reqCancelAttendGathering = (crewId, gatheringId) =>
  api.delete(`/api/crews/${crewId}/gatherings/${gatheringId}/attend`);

export const reqGatheringParticipants = (crewId, gatheringId) =>
  api.get(`/api/crews/${crewId}/gatherings/${gatheringId}/participants`);

export const reqUpdateParticipantsAttendance = (crewId, gatheringId, data) =>
  api.post(`/api/crews/${crewId}/gatherings/${gatheringId}/participants/attendance`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  