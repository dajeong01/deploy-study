import api from "../axios";

export const reqGetGlobalNotices = ({page = 1, size = 10, searchText = "" }) =>
  api.get(`/api/notice`, {
    params: {page, size, searchText },
  });

export const reqGetGlobalNoticeDetail = (noticeId) =>  api.get(`/api/notice/detail/${noticeId}`);

export const reqRegisterGlobalNotice= ({title, content }) =>
  api.post(`/api/notice`, { title, content }, {
    headers: { "Content-Type": "application/json" },
  });

export const reqUpdateGlobalNotice = ({noticeId , title, content }) => {
  const nid = Number(noticeId);
  return api.put(`/api/notice/detail/${nid}`, { title, content }, {
    headers: { "Content-Type": "application/json" },
  });
};

export const reqDeleteGlobalNotice = (noticeId) => {
  api.delete(`/api/notice/detail/${noticeId}`)
}

export const reqGetGlobalRoleAdmin = () => api.get(`/api/notice/role`)

export const reqGetMarathons = ({
  page = 1,
  size = 12,
  searchText = "",
  month = "",
} = {}) =>
  api.get("/api/marathons", {
    params: { page, size, searchText, month },
  });