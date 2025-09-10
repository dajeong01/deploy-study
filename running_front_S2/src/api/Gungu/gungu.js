
import api from '../axios';

export const reqGunguList = () => api.get("/api/gungus");