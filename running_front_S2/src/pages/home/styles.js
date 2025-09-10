import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 화면 전체 높이 */
  width: 100%;
  background-color: #000;
`;

export const main = css`
  flex: 1; /* 남은 공간 채우기 */
  margin: 0;
  padding: 0;
  width: 100%;
  height: auto;
`;

export const mainVideo = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 55rem;
  overflow: hidden;

  & > video {
    width: 100%;
  }
`;

export const mainText = css`
  margin: 6rem 0;
  color: #ffffff;
  text-align: center;

  & > div:nth-of-type(1) {
<<<<<<< HEAD
    font-size: 1.6rem;
=======
>>>>>>> origin/131-css-정리중
    margin-bottom: 1rem;
  }

  & > div:nth-of-type(2) {
<<<<<<< HEAD
    font-size: 5rem;
=======
    font-size: 4rem;
>>>>>>> origin/131-css-정리중
    font-weight: 800;
  }
`;

export const mainGallery = css`
  margin-bottom: 6rem;
  width: 100%;
`;

export const sliderImg = css`
  box-sizing: border-box;
  width: 96rem;
  padding: 0 2rem;
`;

export const footer = css`
  height: 5rem; /* 푸터 높이 */
  background-color: #111;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;