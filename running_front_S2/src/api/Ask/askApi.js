import api from "../axios";

export const reqGetAskBoards = ({page = 1, size = 10, searchText = "" }) =>
  api.get(`/api/ask`, {
    params: { page, size, searchText },
  });

export const reqGetAskDetail = (askId) => api.get(`/api/ask/${askId}`);

export const reqRegisterAskBoard = ({title, content }) =>
  api.post(`/api/ask`, { title, content }, {
    headers: { "Content-Type": "application/json" },
  });
