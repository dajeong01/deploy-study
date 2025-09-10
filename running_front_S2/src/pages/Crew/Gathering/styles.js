import { css } from "@emotion/react";

export const layout = css`
  text-align: center;
  margin: 0 auto;
  width: 100%;
`;

export const gatheringMain = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem 2rem;
  padding-bottom: 4rem;
`;

export const gatheringContainer = css`
  width: auto;
  border: 0.1rem solid #dbdbdb;
  border-radius: 0.5rem;
`;

export const thumbnailImg = css`
  width: 100%;
  height: 15rem;
  background-color: #ebebeb;
  border-radius: 0.4rem 0.4rem 0 0;
  overflow: hidden;
  border-bottom: 0.1rem solid #dbdbdb;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const gatheringInfoContainer = css`
  padding: 2rem;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  // font-size: 1.3rem;

  & > div > div {
    display: flex;
  }

  & > div > div > div {
    align-items: center;
  }

  & svg {
    color: #aaa;
    margin-right: 1rem;
  }

  & > div:nth-of-type(1) {
    text-align: left;
    padding-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: 700;
  }
`;

export const gatheringDetailContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const profileImg = css`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
  background-color: #000;
  border-radius: 5rem;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const statusContainer = css`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;

  & div:nth-of-type(1) {
    display: flex;
  }
`;

export const status = css`
  & > div {
    padding: 0.5rem 0.8rem;
    color: #fff;
    border-radius: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const recruiting = css`
  background-color: #28a745;
`;

export const closed = css`
  background-color: #676767;
`;

export const noGatheringMessage = css`
  color: #888;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;