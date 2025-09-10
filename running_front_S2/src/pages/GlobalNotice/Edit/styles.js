import { css } from "@emotion/react";

/* ✅ 여기 숫자만 바꾸면 전체 폼 폭이 딱 고정됨 */
const FORM_W = 920; // ← 원하는 픽셀값 (예: 920, 1000, 1080)

export const wrap = css`
  /* 고정 폭 래퍼 */
  width: ${FORM_W}px;
  min-width: ${FORM_W}px;
  max-width: ${FORM_W}px;
  box-sizing: border-box;

  /* 배치 */
  display: flex;
  flex-direction: column;
  gap: 12px;

  /* 메인 영역 안에서 가운데 배치하고 싶으면 */
  margin: 0 auto;  /* 왼쪽 정렬 원하면 이 줄 지워도 OK */
`;

export const titleRow = css`
  width: 100%;
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const titleInput = css`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  // font-size: 16px;
  outline: none;
  background: #fff;
`;

/* 나머지는 폭을 100%로만 두면 wrap의 고정 폭을 그대로 사용 */
export const quillBox = css`
  width: 100%;
  height: 70vh;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .quillRoot { height: 100%; display: flex; flex-direction: column; }

  .ql-toolbar {
    position: sticky; top: 0; z-index: 5;
    display: flex; align-items: center; gap: 6px;
    padding: 6px 8px;
    border: none; border-bottom: 1px solid #e5e7eb; background: #fff;
  }
  .ql-container { flex: 1 1 0; border: none; overflow-y: auto; display: flex; flex-direction: column; }
  .ql-editor { flex: 1 1 auto; overflow: visible; line-height: 1.8; padding: 18px 22px 28px; margin: 0; text-align: left; // font-size: 15px; }
  .ql-editor img { max-height: 360px; height: auto; width: auto; max-width: 100%; display: block; margin: 12px auto; border-radius: 6px; }
  .ql-editor p { margin: 10px 0; }

  .ql-container::-webkit-scrollbar { width: 10px; }
  .ql-container::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 6px; }
  .ql-container::-webkit-scrollbar-track { background: #f1f5f9; }
`;

export const submitRow = css`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 4rem;
`;

export const submitBtn = css`
  min-width: 120px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: #222222;
  color: #fff;
  // font-weight: 700;
  cursor: pointer;
  &:disabled { opacity: 0.6; cursor: default; }

`;

export const cancleBtn = css`
  min-width: 120px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: #ffffff;
  border: solid 0.1rem #222222;
  color: #222222;
  // font-weight: 700;
  cursor: pointer;
  &:disabled { opacity: 0.6; cursor: default; }
    margin-right: 1.5rem;
`;