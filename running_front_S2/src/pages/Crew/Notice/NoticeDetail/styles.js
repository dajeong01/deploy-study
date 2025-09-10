
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
  width: 100%;
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

export const inputRow = css`
  margin-top: 16px;
  display: flex;
  gap: 10px;
`;

export const input = css`
  flex: 1;
  background: ${C.inputBg};
  color: ${C.text};
  border: 1.5px solid ${C.inputBorder};
  border-radius: 1rem;
  padding: 12px 14px;
  // font-size: 14px;
  outline: none;
  transition: .15s;
  &::placeholder { color: ${C.placeholder}; }
  &:hover { border-color: #cfd5df; }
  &:focus { border-color: ${C.focus}; background: ${C.white}; box-shadow: ${S.ring}; }
`;

/* 버튼들 */
export const btnPrimary = css`
  padding: 12px 18px;
  border-radius: 1rem;
  background: ${C.black};
  color: ${C.white};
  border: 1px solid ${C.black};
  // font-weight: 800;
  cursor: pointer;
  transition: .15s;
  &:hover { transform: translateY(-1px); background: #1a1a1a; }
  &:disabled { background: #999; border-color: #999; cursor: not-allowed; }
`;

export const btnOutline = css`
  padding: 12px 18px;
  border-radius: 1rem;
  background: ${C.white};
  color: ${C.black};
  border: 1.5px solid ${C.black};
  // font-weight: 800;
  cursor: pointer;
  transition: .15s;
  &:hover { transform: translateY(-1px); }
`;

/* 댓글 리스트 */
export const commentList = css`
  margin-top: 16px;
`;

export const commentItem = css`
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eef0f4;
`;

export const avatar = css`
  width: 5rem; height: 5rem; border-radius: 50%;
  margin-top: 0.5rem;
  overflow: hidden; flex-shrink: 0; background: #e8e8e8;
  img { width: 100%; height: 100%; object-fit: cover; }
`;

export const commentBody = css`
  flex: 1;
  .head {
    display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;
    strong { // font-weight: 800; }
    time { color: #94a3b8; // font-size: 1.3rem; }
    button {
      padding: 6px 10px; border-radius: 0.8rem; background: #f1f3f7;
      border: 1px solid ${C.border}; // font-weight: 700; cursor: pointer;
      &:hover { background: #e9ecf3; }
    }
  }
  .content { white-space: pre-wrap; }
`;

export const editRow = css`
  display: flex; gap: 8px; margin-top: 8px;
  input {
    flex: 1; padding: 1rem 1.2rem; border-radius: 0.6rem; // font-size: 1.2rem;
    border: 0.1rem solid ${C.inputBorder}; background: ${C.inputBg};
    &:focus { outline: none; border-color: ${C.focus}; background: ${C.white}; box-shadow: ${S.ring}; }
  }
`;


export const moreRow = css`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  margin-top: 10px;
`;

export const moreBtn = css`
  padding: 10px 14px;
  border-radius: 1rem;
  background: #f1f3f7;
  color: #141518;
  border: 1px solid #e7e9f0;
  // font-weight: 800;
  cursor: pointer;
  &:hover { background: #e9ecf3; transform: translateY(-1px); }
`;



export const headSpacer = css`
  margin-left: auto;
`;