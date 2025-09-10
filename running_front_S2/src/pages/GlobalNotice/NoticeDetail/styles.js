import { css } from "@emotion/react";

/* Light Mono */
const C = {
  bg: "#f6f7fb",
  card: "#ffffff",
  text: "#222222",
  sub: "#6b7280",
  border: "#e7e9f0",
  inputBg: "#fafbfe",
  inputBorder: "#dfe3ea",
  focus: "#111111",
  placeholder: "#9aa0aa",
  black: "#111111",
  white: "#ffffff",
};

const R = { sm: "8px", md: "12px", lg: "16px" };
const S = { ring: "0 0 0 8px rgba(17,17,17,.06)" };

/* ===== 레이아웃 ===== */
export const layout = css`
  width: 80%;
  margin: 24px auto 40px;
  background: none;
  border: none;
  padding: 20px 22px;
  color: ${C.text};

  @media (max-width: 980px) {
    width: 92%;
    padding: 16px;
  }
`;

/* 상단 바 */
export const topBar = css`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;

  button {
    padding: 8px 12px;
    border-radius: 1.2rem;
    background: #ffffff;
    color: ${C.text};
    border: 0.2rem solid ${C.border};
    // font-weight: 700;
    cursor: pointer;
    transition: transform .08s ease, background .15s ease;

    &:hover { transform: translateY(-1px); background: #e9ecf3; }
  }

  span { color: #94a3b8; // font-size: 13px; }
`;

export const titleCss = css`
  // font-size: 28px;
  // font-weight: 800;
  margin: 4px 0 6px;
`;

export const metaCss = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  color: #6b7280;
  // font-size: 1.6rem;
  margin-bottom: 2rem;

  .dot {
    margin-left: 2rem;
    width: 4px; height: 4px; border-radius: 50%;
    background: none; display: inline-block;
  }
  button {
    padding: 6px 10px;
    border-radius: 1rem;
    background: #f1f3f7;
    color: #141518;
    border: 1px solid #e7e9f0;
    // font-weight: 700; cursor: pointer;
  }
`;

export const metaSpacer = css`
  margin-left: auto;   /* 이 아이템 이후로는 우측 끝으로 */
`;

export const contentCss = css`
  // font-size: 1.6rem;
  line-height: 1.7;
  word-break: break-word;

  border-bottom: 0.1rem solid #dbdbdb;
  border-top: 0.1rem solid #dbdbdb;

  img, video, iframe {
    max-width: 60%;
    height: auto;
    border-radius: 0.6rem;
  }

  p { margin: 10px 0; }
`;
