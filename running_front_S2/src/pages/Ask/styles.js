import { css } from "@emotion/react";

export const container = css`
  text-align: center;
  margin: 0 auto;
  width: 80%;
  padding-bottom: 3rem;
`;
export const registerButton = css`
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  padding: 0.6rem 1.2rem;
  width: 12rem;
  cursor: pointer;
  background: var(--main-color);
  color: var(--sub-color);
`;


export const table = css`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

export const tr = css`
  cursor: pointer;

  :hover {
    background-color: var(--hB-color);
  }
`;

export const th = css`
  padding: 1.2rem;
  border-bottom: 0.2rem solid var(--main-color);
`;

export const td = css`
  padding: 1rem;
  border-bottom: 0.1rem solid #dbdbdb;
`;

export const tdTitle = css`
  ${td};
  text-align: left;
`;