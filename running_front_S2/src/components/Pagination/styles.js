import { css } from "@emotion/react";

export const C = {
  bg: "#f6f7fb",
  card: "#ffffff",
  text: "#2a2e35",
  sub: "#7b8190",
  border: "#dfe3ea",
  activeBorder: "#222222",
  activeBg: "#ffffff",
};

export const wrap = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: transparent;
  margin-top: 1rem;
`;

const baseBtn = css`
  min-width: 3rem;
  height: 3rem;
  padding: 0 0.8rem;
  border-radius: 0.6rem;
  background: transparent;
  border: none;
  color: ${C.text};
  // font-weight: 700;
  // font-size: 1.4rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform .08s ease, background .15s ease, color .15s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    background: #f6f7fb;
  }
  &:disabled {
    opacity: .35;
    cursor: not-allowed;
  }
`;

export const pageBtn = css`
  ${baseBtn};
`;

export const activeBtn = css`
  background: ${C.activeBg};
  border: 1px solid ${C.activeBorder};
  color: ${C.text};
`;

export const iconBtn = css`
  ${baseBtn};
  min-width: 36px;
  padding: 0;
  border-radius: 0.6rem;

  svg { // font-size: 1.4rem; }
`;


export const ghostDisabled = css`
  &:disabled {
    background: #f5f6f8;
    border: 1px solid ${C.border};
  }
`;

export const dots = css`
  min-width: 36px;
  height: 36px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${C.sub};
`;
