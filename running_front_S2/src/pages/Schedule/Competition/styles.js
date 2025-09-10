import { css } from "@emotion/react";

export const page = css`
  text-align: center;
  margin: 0 auto;
  width: 80%;
`;

export const headerRow = css`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  justify-content: space-between;
  margin-bottom: 1.6rem;
`;

export const selectBox = css`
  width: 11rem;
  height: 3.667rem;
  padding: 0.24rem 0.48rem;
  border-radius: 0.4rem;
  background-color: #fff;
  color: #333;

  .MuiOutlinedInput-notchedOutline {
    border-color: #ccc;
  }
  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: #333;
  }
  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #000 !important;
  }
`;

export const menuItem = css``;

export const searchBox = css`
  display: flex;
  justify-content: right;
  align-items: center;
  margin: 2rem 0 2rem 0;
  min-width: 0;
`;

export const searchInput = css`
  height: 3.425rem;
  box-sizing: border-box;
  padding: 0.8rem;
  border: 0.1rem solid var(--main-color);
  border-right: none;
  border-radius: 0.6rem 0 0 0.6rem;
  outline: none;
`;

export const searchButton = css`
  display: flex;
  height: 3.425rem;
  box-sizing: border-box;
  padding: 0.5rem 0.5rem;
  border: 0.1rem solid var(--main-color);
  border-left: none;
  background: #fff;
  color: var(--main-color);
  border-radius: 0 0.6rem 0.6rem 0;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

export const sectionTitle = css`
  text-align: center;
  margin: 2.4rem 0 1.6rem;
`;

export const grid = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2.5rem;

  @media (max-width: 102.4rem) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 64rem) {
    grid-template-columns: 1fr;
  }
`;

export const card = css`
  border-radius: 1.6rem;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0.8rem 2.8rem rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease;

  &:hover {
    transform: translateY(-0.2rem);
    box-shadow: 0 1rem 3.2rem rgba(0, 0, 0, 0.1);
  }
`;

export const thumb = css`
  aspect-ratio: 1.6 / 1;
  width: 100%;
  background: #f5f5f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const thumbFallback = css`
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    #f1f1f1,
    #f1f1f1 1rem,
    #f9f9f9 1rem,
    #f9f9f9 2rem
  );
`;

export const cardBody = css`
  padding: 1.4rem 1.6rem 1.8rem;
`;

export const locationSmall = css`
  color: #888;
  margin-bottom: 0.6rem;
`;

export const title = css`
  line-height: 1.35;
  margin-bottom: 0.6rem;
`;

export const dateText = css`
  color: #666;
`;

export const empty = css`
  padding: 4.8rem 0;
  text-align: center;
  color: #888;
`;

export const sentinel = css`
  height: 0.1rem;
`;

export const loader = css`
  text-align: center;
  padding: 1.6rem 0;
  color: #666;
`;

export const done = css`
  text-align: center;
  padding: 1.6rem 0 0;
  color: #999;
`;
