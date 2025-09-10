import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  text-align: center;
`;

export const headerBox = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
`;

export const selectBox = css`
  width: 11rem;
  height: 3.667rem;
  padding: 0.24rem 0.48rem;
  border-radius: 0.4rem;
  background-color: #fff;
  color: #333;
  font-size: 1.2rem;

  .MuiOutlinedInput-notchedOutline {
    border-color: #ccc;
  }
  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: #333;
  }
  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: var(--main-color) !important;
  }
`;

export const menuItem = css`
  font-size: 1.2rem;
  background-color: #fff !important;
  &:hover {
    background-color: var(--hB-color) !important;
  }
`;

export const headerContainer = css`
  display: flex;
`;

export const gridBox = css`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  gap: 3rem 3rem;
  margin: 1rem 0;
`;

export const cards = css`
  width: 100%;
  border-radius: 0.8rem;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const tumbnailBox = css`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const heartIcon = css`
  position: absolute;
  bottom: 0;
  right: 1rem;
  font-size: 4rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

export const textBox = css`
  padding: 0.5rem;
  text-align: left;
`;

export const gungu = css`
  font-size: 1.2rem;
  color: #7b7b7b;
  padding: 0.6rem 0 0.6rem 0;
`;

export const crewName = css`
  margin-right: 0.5rem;
`;

export const crewTitle = css`
  color: #333;
`;

export const rankingBox = css`
  display: flex;
  padding: 0.5rem;
  color: #fff;
  gap: 0.5rem;
  margin-top: 0.5rem;

  & > div {
    width: 7rem;
    height: 2.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.3rem;
  }
`;

export const topRanking = css`
  background-color: #f5383f;
`;

export const newRanking = css`
  background-color: #1f1f21;
`;
