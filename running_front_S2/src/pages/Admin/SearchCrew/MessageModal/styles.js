import { css } from "@emotion/react";

export const backdrop = css`
  position: fixed; 
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex; 
  align-items: center; 
  justify-content: center;
  z-index: 20000;
`;

export const modal = css`
  width: 42rem; 
  max-width: calc(100vw - 32px);
  background: #fff;
  border-radius: 0.5rem; 
  padding: 1.6rem;
`;

export const headerRow = css`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:0.8rem;
`;

export const title = css`
  margin:0;
  // font-weight:700;
`;

export const closeBtn = css`
  border:none;
  background:transparent;
  cursor:pointer;
`;

export const meta = css`
  color:#6b7280;
  margin-bottom:1rem;
`;

export const textarea = css`
  width:100%;
  min-height:12rem;
  resize:vertical;
`;

export const footer = css`
  display:flex;
  gap:0.8rem;
  justify-content:flex-end;
  margin-top:1.2rem;
`;

export const submitBtn = css`
  padding: 0.4rem 1rem;
  background: var(--main-color);
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export const cancelBtn = css`
  padding: 0.4rem 1rem;
  background: #fff;
  color: var(--main-color);
  border: 0.1rem solid var(--main-color);
  border-radius: 0.5rem;
  cursor: pointer;

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;