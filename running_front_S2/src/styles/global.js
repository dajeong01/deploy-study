import { css } from "@emotion/react";

export const global = css`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap");

  html {
    font-size: 62.5%;
    font-family: "Noto Sans KR", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    background-color: #fff;
  }

  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
  }

  #root {
    font-size: 1.4rem;
  }

  :root {
    --main-color: #1f1f21;
    --sub-color: #ebebeb;
    --point-color: #fa2847;
    --hB-color: rgba(129, 126, 126, 0.1);
  }
`;
