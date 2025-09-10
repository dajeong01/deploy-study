import { css } from "@emotion/react";

export const footer = css`
  padding: 6rem;
  /* width: 100%; */
  background-color: #1f1f21;
  color: #a6a6a6;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
`;

export const links = css`
  display: flex;
  gap: 2rem;

  a {
    color: #a6a6a6;
    text-decoration: none;
    /* font-weight: 400; */
    transition: color 0.2s, text-shadow 0.2s;

    &:hover {
      color: #fff;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
`;

export const socialIcons = css`
  display: flex;
  gap: 1.5rem;
  font-size: 1.8rem;

  a {
    color: #a6a6a6;
    transition: color 0.2s, transform 0.2s;

    &:hover {
      color: #fff;
      transform: scale(1.1);
    }
  }
`;

export const contact = css`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  font-size: 1.2rem;

  div {
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
`;

export const copyright = css`
  font-size: 1.1rem;
  opacity: 0.7;
  border-top: 0.1rem solid #333;
  padding-top: 1rem;
  text-align: center;
`;
