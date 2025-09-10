import api from "../axios";

export const reqReportMember = ({ crewId, memberId, reason }) => api.post(`/api/reports/crews/${crewId}`, { memberId, reason });

export const reqGetReportList = (crewId ) => api.get(`/api/reports/crews/${crewId}`);