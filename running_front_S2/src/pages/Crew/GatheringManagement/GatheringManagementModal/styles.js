import { css } from "@emotion/react";

export const modalBox = css`
  background-color: #fff;
  padding: 2rem;
  width: 40rem;
  max-height: 80vh;
  overflow-y: auto;
  margin: 5rem auto;
  border-radius: 0.5rem;
`;

export const participantTable = css`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  th, td {
    text-align: left;
    padding: 0.8rem;
    border-bottom: 0.1rem solid #ebebeb;
  }
`;

export const participantRow = css`
  &:hover {
    background-color: #f9f9f9;
  }
`;

export const participantCell = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const participantImg = css`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const buttonContainer = css`
  text-align: center;
  width: 100%;
  margin-top: 2rem;
`;


export const cancelButton = css`
  padding: 0.5rem 0.8rem;
  border: 0.1rem solid var(--main-color);
  border-radius: 0.8rem;
  background: #ffffff;
  color: var(--main-color);
  cursor: pointer;
    margin-right: 1rem;

`;

export const saveButton = css`
  padding: 0.5rem 0.8rem;

  border: none;
  border-radius: 0.8rem;
  background: var(--main-color);
  color: #fff;
  cursor: pointer;

`;
