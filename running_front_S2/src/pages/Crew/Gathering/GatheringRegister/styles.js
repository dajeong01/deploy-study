import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

export const header = css`
  text-align: center;
`;

export const main = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  input,
  textarea {
    padding: 1.2rem 1.4rem;
    border: 1px solid #e0e0e0;
    border-radius: 1rem;
    // font-size: 1.4rem;
    transition: border 0.2s;

    &:focus {
      outline: none;
      border-color: var(--main-color);
    }
  }
`;

export const thumbnailContainer = css`
  // font-size: 1.2rem;
  height: 30rem;
  border: 0.1rem solid #dbdbdb;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & svg {
    // font-size: 8rem;
    color: var(--sub-color);
  }

`;

export const thumbnailImg = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
`;

export const mapContainer = css`
  display: flex;
  flex-direction: column;
  /* gap: 1.2rem; */
  border: 0.1rem solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
`;

export const mapSearchResultList = css`
  div {
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #f1f9ff;
    }

    h3 {
      // font-size: 1.4rem;
      margin: 0;
      // font-weight: bold;
    }

    p {
      // font-size: 1.2rem;
      margin: 0.2rem 0;
      color: #555;
    }
  }
`;

export const addressWrapper = css`
  display: flex;
  gap: 0.8rem;

  & > input {
    flex: 1;
  }

  & > button {
    padding: 0 1.6rem;
    background: var(--main-color);
    color: #fff;
    border: none;
    border-radius: 0.8rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: var(--main-color);
    }
  }
`;

export const buttonContainer = css`
  text-align: center;
  width: 100%;
  margin: 3rem 0;
`;

export const registerButton = css`
  width: 12rem;
  height: 4rem;
  border-radius: 0.8rem;
  background: var(--main-color);
  color: #fff;
  cursor: pointer;
  border: none;
`;

export const cancelButton = css`
  width: 12rem;
  height: 4rem;
  border-radius: 0.8rem;
  background: #ffffff;
  border: solid 0.1rem var(--main-color);
  color: #000;
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
  margin-right: 1.5rem;
`;
