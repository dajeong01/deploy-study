import api from "../axios";

export const reqGetNotices = ({ crewId, page = 1, size = 10, searchText = "" }) =>
  api.get(`/api/notices/${crewId}`, {
    params: {page, size, searchText },
  });

export const reqGetNoticeDetail = (crewId,noticeId) =>  api.get(`/api/notices/${crewId}/detail/${noticeId}`);

export const reqRegisterNotice= ({ crewId, title, content }) =>
  api.post(`/api/notices/${crewId}`, { title, content }, {
    headers: { "Content-Type": "application/json" },
  });

export const reqUpdateNotice = ({ crewId, noticeId , title, content }) => {
  const cid = Number(crewId);
  const nid = Number(noticeId);
  return api.put(`/api/notices/${cid}/detail/${nid}`, { title, content }, {
    headers: { "Content-Type": "application/json" },
  });
};

export const reqDeleteNotice = (crewId, noticeId) => {
  api.delete(`/api/notices/${crewId}/detail/${noticeId}`)
}