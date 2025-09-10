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


export const th = css`
  padding: 1.2rem;
  border-bottom: 0.2rem solid #000;
  // font-weight: 600;
`;

export const td = css`
  padding: 2rem;
  border-bottom: 1px solid #eee;
`;

export const crewImg = css`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;


export const tdTitle = css`
  ${td};
  text-align: left;
`;

export const button = css`
  // font-size: 1rem;
  padding: 0.8rem 1rem;
  margin-left: 1rem;
  background: var(--main-color);
  color: var(--sub-color);
  border: none;
  border-radius: 0.6rem;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s ease;

  :hover {
    background: #acababff;
  }
`;

export const tdActionsStyle = css`
  display: flex;
  text-align: center;
  gap: 8px;
  padding: 2rem;
  border-bottom: 1px solid #eee;
  justify-content: center;
`;

export const actionButtonStyle = css`
  padding: 0.6rem 1.6rem;
  border: 0.1rem solid var(--main-color);
  background: #fff;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 1rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const expelButtonStyle = css`
  ${actionButtonStyle};
  background: var(--main-color);
  color: white;
  border: none;
`;