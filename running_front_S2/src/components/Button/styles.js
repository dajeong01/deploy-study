import { css } from "@emotion/react";

export const styleButton = css`
  min-width: 6rem;
  max-width: 100%;
  min-height: 3.667rem;
  max-height: 100%;
  padding: 0 1rem;
  background-color: var(--main-color);
  color: var(--sub-color);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  text-align: center;

  &:hover:not(:disabled) {
    background-color: #222;
  }

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;
