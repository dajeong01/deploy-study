import { css } from '@emotion/react';

export const mainBox = css`
  text-align: center;
  margin: 0 auto;
  width: 100%;
`;

export const table = css`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

export const th = css`
  padding: 1.2rem;
  border-bottom: 0.2rem solid #000;
  // font-weight: 600;
`;

export const td = css`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

export const loadingMessage = css`
  text-align: center;
  color: #666;
  // font-size: 1.6rem;
  padding: 2rem;
`;

export const errorMessage = css`
  text-align: center;
  color: #dc3545;
  // font-size: 1.6rem;
  padding: 2rem;
  margin-bottom: 2rem;
`;

export const emptyMessage = css`
  text-align: center;
  color: #666;
  // font-size: 1.6rem;
  padding: 2rem;
  margin-bottom: 2rem;
`;

export const messageContent = css`
  text-align: left;
  max-width: 40rem;
  word-wrap: break-word;
  white-space: pre-wrap;
  line-height: 1.5;
`;