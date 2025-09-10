import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 2rem 3rem;
  box-sizing: border-box;
`;

export const tableWrapper = css`
  flex: 1;
  overflow-y: hidden;
  border: 0.1rem solid #dbdbdb;
  border-radius: 0.5rem;
`;

export const table = css`
  width: 100%;
  border-collapse: collapse;

  thead {
    position: sticky;
    top: 0;
    background:var(--hB-color);
    z-index: 1;
  }

  th {
    padding: 1rem;
    // font-weight: bold;
    color: var(--main-color);
    border-bottom: 0.1rem solid #dbdbdb;
    text-align: center;
  }

  td {
    padding: 1rem;
    color: var(--main-color);
    border-bottom: 0.1rem solid #dbdbdb;
    text-align: center;
    line-height: 1.5;
  }

  tr:hover td {
    background-color: var(--hB-color);
  }
`;

export const thumbnail = css`
  width: 7rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 0.5rem;
`;

export const detailButton = css`
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
  background-color: var(--main-color);
  color: var(--sub-color);
`;

export const paginationWrapper = css`
  margin-top: 1rem;
  text-align: center;
`;