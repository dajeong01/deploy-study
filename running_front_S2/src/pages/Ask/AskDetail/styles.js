import { css } from "@emotion/react";

export const layout = css`
  max-width: 86rem;
  margin: 0 auto;
  padding: 2.4rem 2rem 8rem;
`;

export const topBar = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
`;

export const backBtn = css`
  appearance: none;
  border: 0.1rem solid #dbdbdb;
  background: #fff;
  border-radius: 0.5rem;
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  &:hover {
    background: #f8fafc;
  }
`;

export const metaRight = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const stateChip = css`
  padding: 4px 10px;
  border-radius: 999px;
  // font-size: 12px;
  // font-weight: 600;
  border: 1px solid transparent;
`;

export const chipAnswered = css`
  color: var(--sub-color);
  background: var(--main-color);
`;

export const chipWaiting = css`
  color: var(--sub-color);
  background: var(--point-color);
`;

export const title = css`
  margin: 14px 0 8px;
  // font-size: 28px;
  line-height: 1.25;
  letter-spacing: -0.01em;
`;

export const metaRow = css`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #64748b;
  // font-size: 14px;
  margin-bottom: 16px;
`;

export const card = css`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
`;

export const content = css`
  color: #0f172a;
  line-height: 1.75;
  word-break: break-word;

  p + p {
    margin-top: 12px;
  }
  img {
    max-width: 100%;
    border-radius: 8px;
  }
  a {
    color: #575757ff;
    text-decoration: underline;
  }
`;

export const sectionTitle = css`
  margin: 28px 2px 10px;
  // font-size: 18px;
  // font-weight: 700;
  color: #0f172a;
`;

export const answerCard = css`
  background: var(--hB-color);
`;

export const answerMeta = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #474747ff;
  // font-size: 13px;
  margin-bottom: 10px;
`;

export const answerContent = css`
  white-space: pre-wrap;
  color: #0f172a;
  line-height: 1.6;
`;

export const skeletonHeader = css`
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 37%, #f1f5f9 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s infinite;
  margin-bottom: 12px;

  @keyframes shimmer {
    0% { background-position: 100% 0; }
    100% { background-position: 0 0; }
  }
`;
export const skeletonBlock = css`
  height: 120px;
  border-radius: 14px;
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 37%, #f1f5f9 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s infinite;
  margin-top: 12px;
`;
