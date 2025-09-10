import { css } from "@emotion/react";

export const page = css`
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 16px 80px;
`;

export const topBar = css`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const back = css`
  border: none;
  background: transparent;
  // font-size: 14px;
  cursor: pointer;
  color: #666;
  &:hover {
    color: #111;
  }
`;

export const header = css`
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 24px;
  align-items: start;
  margin-top: 3rem;
  

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const thumb = css`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 18px;
  overflow: hidden;
  background: #f5f5f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const blank = css`
  width: 100%;
  height: 100%;
  background: #f1f1f1;
`;

export const headerRight = css`
  padding-top: 6px;
  margin-left: 2rem;
`;

export const category = css`
  // font-size: 12px;
  color: #888;
  margin-bottom: 8px;
`;

export const title = css`
  // font-size: 28px;
  // font-weight: 800;
  line-height: 1.2;
  margin: 0 0 16px;
`;

export const headerCtas = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const heart = css`
  border: 1px solid #eee;
  background: #fff;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const homeButton = css`
  border: 1px solid #111;
  background: #111;
  color: #fff;
  padding: 10px 14px;
  border-radius: 10px;
  // font-weight: 700;
  cursor: pointer;
`;

export const sectionTitle = css`
  // font-size: 20px;
  // font-weight: 800;
  margin: 28px 0 14px;
`;

export const metaTable = css`
  border-top: 1px solid #eee;
`;

export const metaRow = css`
  display: grid;
  grid-template-columns: 100px 1fr;
  padding: 14px 0;
  border-bottom: 1px solid #f1f1f1;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 6px;
  }
`;

export const metaLabel = css`
  color: #666;
  // font-size: 14px;
`;

export const metaValue = css`
  // font-size: 14px;
  a {
    color: #0b5bd3;
    text-decoration: underline;
  }
`;
