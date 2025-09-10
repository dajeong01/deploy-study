import api from "../axios";

export const reqCrewRankings = () => api.get('/api/ranking/crews');

export const reqUserRankings = () => api.get('/api/ranking/users');