import { css } from "@emotion/react";

export const container = css`
  text-align: center;
  margin: 0 auto;
  width: 100%;
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
`;

export const td = css`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

export const tdTitle = css`
  ${td};
  text-align: left;
`;