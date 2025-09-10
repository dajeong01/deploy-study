import api from "../axios";

export const reqGetFreeBoards = ({ crewId, page = 1, size = 10, searchText = "" }) =>
  api.get(`/api/freeBoards/${crewId}`, {
    params: { page, size, searchText },
  });

export const reqGetFreeFeedDetail = (crewId, freeId) => api.get(`/api/freeBoards/${crewId}/detail/${freeId}`);

export const reqRegisterFreeBoard = ({ crewId, title, content }) =>
  api.post(`/api/freeBoards/${crewId}`, { title, content }, {
    headers: { "Content-Type": "application/json" },
  });

export const reqUpdateFreeBoard = ({ crewId, freeId, title, content }) => {
  const cid = Number(crewId);
  const fid = Number(freeId);
  return api.put(`/api/freeBoards/${cid}/detail/${fid}`, { title, content }, {
    headers: { "Content-Type": "application/json" },
  });
};

export const reqDeleteFree = (crewId, freeId) => {
  api.delete(`/api/freeBoards/${crewId}/detail/${freeId}`)
}

export const reqRegisterComment = (comment, crewId, freeId) =>
  api.post(`/api/freeBoards/${crewId}/detail/${freeId}`, {
    crewId,
    freeId,
    content: comment,
  });

export const reqGetFreeCommentList = (crewId, freeId) => api.get(`/api/freeBoards/${crewId}/detail/${freeId}/comments`)
export const reqUpdateFreeComment = (crewId, freeId, freeCommentId, content) => {
  const cid = Number(crewId);
  const fid = Number(freeId);
  const ccid = Number(freeCommentId);
  return api.put(
    `/api/freeBoards/${cid}/detail/${fid}/comments/${ccid}`,
    { content },
    { headers: { "Content-Type": "application/json" } }
  );
};

export const reqDeleteComment = (crewId, freeId, freeCommentId) => {
  const cid = Number(crewId);
  const fid = Number(freeId);
  const ccid = Number(freeCommentId);
  return api.delete(`/api/freeBoards/${cid}/detail/${fid}/comments/${ccid}`);
};
