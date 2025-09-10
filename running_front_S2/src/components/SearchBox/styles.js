import { css } from "@emotion/react";

export const searchBox = css`
  display: flex;
  justify-content: right;
  align-items: center;
  margin: 2rem 0 2rem 0;
  min-width: 0;   
`;

export const searchInput = css`
  height: 3.667rem;
  box-sizing: border-box;
  padding: 0.8rem;
  border: 0.1rem solid var(--main-color);
  border-right: none;
  border-radius: 0.6rem 0 0 0.6rem;
  outline: none;
`;

export const searchButton = css`
  display: flex;
  height: 3.667rem;
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