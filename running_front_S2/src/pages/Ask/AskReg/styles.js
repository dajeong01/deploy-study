import { css } from "@emotion/react";

export const submitRow = css`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
    margin-bottom: 4rem;
`;
export const submitBtn = css`
  min-width: 120px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: #222222;
  color: #fff;
  // font-weight: 700;
  cursor: pointer;
  &:disabled { opacity: 0.6; cursor: default; }

`;

export const cancleBtn = css`
  min-width: 120px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: #ffffff;
  border: solid 0.1rem #222222;
  color: #222222;
  // font-weight: 700;
  cursor: pointer;
  &:disabled { opacity: 0.6; cursor: default; }
    margin-right: 1.5rem;
`;