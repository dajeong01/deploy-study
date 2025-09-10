import { css } from "@emotion/react";

export const container = css`
  display: flex;
  height: 100vh;
`;

export const sidebar = css`
  width: 24rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-right: 0.1rem solid #dbdbdb;
`;

export const sidebarHeader = css`
  padding: 2.4rem;
  border-bottom: 0.1rem solid #dbdbdb;
`;

export const headerContent = css`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const logoIcon = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  width: 3.2rem;
  height: 3.2rem;
  background-color: gray;
`;

export const logoIconSvg = css`
  width: 2rem;
  height: 2rem;
  color: white;
`;

export const title = css`
  // font-weight: 600;
  margin: 0;
`;

export const subtitle = css`
  margin: 0;
`;

export const navigation = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.6rem;
  gap: 1rem;
`;

export const menuItem = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 1.6rem;
  border-radius: 0.5rem;
  cursor: pointer;

  :hover {
    // font-weight: bold;
    background-color: var(--hB-color);
  }
`;

export const logoutButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1.2rem 1.6rem;
  background-color: var(--hB-color);
  color: var(--main-color);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  
  &:hover {
    // font-weight: bold;
    background-color: #c1c1c1ff;
  }
`;