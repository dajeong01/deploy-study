import api from "../axios";

export const reqRegisterCrewMember = (data) => api.post(`/api/members`, data);

export const reqGetCrewMembers = ({ page, size, crewId, searchText }) => {
  return api.get(`/api/members`, {
    params: { page, size, crewId, searchText },
  });
};

export const reqGetMemberCount = (crewId) => api.get(`/api/members/${crewId}/count`);

export const reqGetMemberDetail = (memberId) => api.get(`/api/members/${memberId}`);

export const reqUpdateMemberRole = ({ memberId, roleId, crewId }) => api.put(`/api/members/${memberId}/role`, { memberId, roleId, crewId });

export const reqExpelMember = ({ memberId }) => api.delete(`/api/members/${memberId}`);

export const reqGetMemberId = (crewId) => api.get(`/api/members/${crewId}/memberId`); 

export const reqWithDrawMember = (memberId) => api.delete(`/api/members/${memberId}/withdraw`);

export const reqGetMembers = (crewId) => api.get(`/api/members/crew/${crewId}`);