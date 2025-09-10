
import { css } from "@emotion/react";

export const wrap = css`
  text-align: center;
  margin: 0 auto;
  width: 100%;
  padding-bottom: 3rem;
`;

export const grid = css`
  display: grid;
  grid-template-columns: repeat(4, 280px);
  gap: 12px;
  justify-content: flex-start;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 180px);
  }
  @media (max-width: 820px) {
    grid-template-columns: repeat(2, 160px);
  }
  @media (max-width: 560px) {
    grid-template-columns: repeat(1, 160px);
  }
`;

export const card = css`
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
`;

export const thumbBox = css`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #f3f4f6;
`;

export const img = css`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const meta = css`
  padding: 8px;
  // font-size: 12px;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const sentinel = css`
  height: 1px;
`;
