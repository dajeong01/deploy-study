import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 70vh;
  text-align: center;

`;

export const loginTitle = css`
    // font-size: 2.5rem;
    // font-weight: 500;
    margin-bottom: 3rem;
`;

export const buttons = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  & > button {
    display: flex; 
    align-items: center; 
    justify-content: center;
    // font-weight: 600;
    // font-size: 1.2rem;
    width: 32rem;
    height: 5rem;
    border: 0.1rem solid #000;
    border-radius: 0.2rem;
    background-color: transparent;

    &:nth-of-type(1) > svg {
      // font-size: 2rem;
      margin-right: 0.5rem;
    }

    &:nth-of-type(2) > svg {
      // font-size: 2rem;
      color: #ffe603;
      margin-right: 0.5rem;
    }

    &:nth-of-type(3) > svg {
      color: #04c75c;
      margin-right: 0.5rem;
    }
  }
`;