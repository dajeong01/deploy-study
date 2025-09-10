import { css } from "@emotion/react";

export const container = css`
  text-align: center;
  margin: 0 auto;
  width: 100%;
  padding-bottom: 3rem;
`;

export const headerBox = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
`;

export const gridBox = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.6rem;
  padding: 1.6rem;
`;

export const card = css`
  border: 0.1rem solid #e0e0e0;
  border-radius: 1rem;
  background-color: #ffffff;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  }
`;

export const disabledCard = css`
  cursor: not-allowed;
  opacity: 0.6;
  pointer-events: none;
  &:hover {
    transform: none;
    box-shadow: none;
  }
`;

export const thumbnailBox = css`
  position: relative;
  width: 100%;
  padding-top: 70%;
  overflow: hidden;

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-bottom: 1px solid #eee;
  }
`;

export const textBox = css`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const gungu = css`
  // font-size: 1rem;
  color: #666;
`;

export const crewName = css`
  // font-weight: 600;
  // font-size: 1.1rem;
  color: #333;
`;

export const crewTitle = css`
  // font-size: 1rem;
  color: #444;
  line-height: 1.4;
`;
