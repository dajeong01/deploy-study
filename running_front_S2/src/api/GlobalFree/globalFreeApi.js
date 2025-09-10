import api from "../axios";

export const reqGetGlobalFreeBoards = ({page = 1, size = 10, searchText = "" }) =>
  api.get(`/api/free`, {
    params: { page, size, searchText },
  });

export const reqGetGlobalFreeFeedDetail = (freeId) => api.get(`/api/free/detail/${freeId}`);

export const reqRegisterGlobalFreeBoard = ({title, content }) =>
  api.post(`/api/free`, { title, content }, {
    headers: { "Content-Type": "application/json" },
  });

export const reqUpdateGlobalFreeBoard = ({freeId, title, content }) => {
  const fid = Number(freeId);
  return api.put(`/api/free/detail/${fid}`, { title, content }, {
    headers: { "Content-Type": "application/json" },
  });
};

export const reqDeleteGlobalFree = (freeId) => {
  api.delete(`/api/free/detail/${freeId}`)
}

export const reqRegisterGlobalComment = (comment,freeId) =>
  api.post(`/api/free/detail/${freeId}`, {
    freeId,
    content: comment,
  });

export const reqGetGlobalFreeCommentList = (freeId) => api.get(`/api/free/detail/${freeId}/comments`)
export const reqUpdateGlobalFreeComment = (freeId, freeCommentId, content) => {
  const fid = Number(freeId);
  const ccid = Number(freeCommentId);
  return api.put(
    `/api/free/detail/${fid}/comments/${ccid}`,
    { content },
    { headers: { "Content-Type": "application/json" } }
  );
};

export const reqDeleteGlobalComment = (freeId, freeCommentId) => {
  const fid = Number(freeId);
  const ccid = Number(freeCommentId);
  return api.delete(`/api/free/detail/${fid}/comments/${ccid}`);
};
