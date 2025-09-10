/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  font-family: "Pretendard", sans-serif;
  color: #222;
`;

export const header = css`
  font-weight: 600;
  text-align: center;
  font-size: 1.7rem;
  margin-bottom: 0.4rem;
`;

export const main = css`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const thumbnail = css`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 0.8rem;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const infoContainer = css`
  display: flex;
  gap: 1rem;
  flex-direction: column;
    font-size: 1.2rem;
`;


export const infoBox = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1rem;
  border: 0.1rem solid #eee;
  border-radius: 0.6rem;
  background-color: #fafafa;
  font-size: 1.2rem;

  svg {
    flex-shrink: 0;
    color: #888;
  }
`;

export const mapContainer = css`
  /* margin-top: 0.8rem; */
  border-radius: 0.6rem;
  overflow: hidden;
  border: 0.1rem solid #eaeaea;
`;


export const participantsList = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;
    font-weight: 600;

    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: 0.1rem solid #ddd;
      object-fit: cover;
    }
  }
`;

export const buttons = css`
  display: flex;
  justify-content: center;
  gap: 1rem;

  button {
    width: auto;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;

    &:first-of-type {
      background-color: #fff;
      color: var(--main-color);
      border: 0.1rem solid var(--main-color);
    }

    &:last-of-type {
      background-color: var(--main-color);
      color: #fff;
    }
  }
`;
