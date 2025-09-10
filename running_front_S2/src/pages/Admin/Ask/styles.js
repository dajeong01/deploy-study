import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100%;
  width: 100%;
  padding: 3rem;
  box-sizing: border-box;
`;

export const tabActive = css`
  color: #000;
  // font-weight: 500;
`;

export const registerButton = css`
  padding: 0.3rem 1.2rem;
  background: #000;
  color: white;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
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
  border-bottom: 0.2rem solid #000;
  // font-weight: 600;
`;

export const td = css`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

export const tdInputGroup = css`
  display: flex;
  align-items: center;
  padding: 0.7rem;
  gap: 1rem;

  input {
    flex: 1;
    height: 2.6rem;
    padding: 0.5rem;
    box-sizing: border-box;
    border: 0.1rem solid #dbdbdb;
    border-radius: 0.5rem;
  }
`;

export const tdTitle = css`
  ${td};
  text-align: left;
`;