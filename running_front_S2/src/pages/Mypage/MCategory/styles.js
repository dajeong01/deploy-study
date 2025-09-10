import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: row;
  padding-top: 2rem;
`;

export const leftBox = css`
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  width: 20rem;
  padding: 1rem;
  background-color: #ffffff;
  top: 0;
`;

export const userSimpleInfo = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1.6rem 1.2rem;
  border-bottom: 0.1rem solid black;
  cursor: pointer;
`;

export const profileImgBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const nick = css`
  font-weight: bold;
`;

export const email = css`
  font-size: 1rem;
  color: #5f5f5f;
`;

export const getout = css`
  padding-top: 4rem;

  & > button {
    width: 100%;
    padding: 0.6rem;
    background-color: rgba(129, 126, 126, 0.1);
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;

    :hover {
      // font-weight: bold;
      background-color: rgba(251, 72, 72, 0.4);
    }
  }
`;