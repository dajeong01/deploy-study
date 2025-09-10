import { css } from "@emotion/react";

export const layout = css`
  text-align: center;
  margin: 0 auto;
  width: 100%;
  min-width: 0;
  padding-bottom: 3rem;
`;

export const asd = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const searchBar = css`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
`;

export const searchInput = css`
  height: 3.425rem;
  box-sizing: border-box;
  padding: 0.8rem;
  border: 0.1rem solid var(--main-color);
  border-right: none;
  border-radius: 0.6rem 0 0 0.6rem;
  outline: none;
`;

export const searchButton = css`
  display: flex;
  height: 3.425rem;
  box-sizing: border-box;
  padding: 0.5rem 0.5rem;
  border: 0.1rem solid var(--main-color);
  border-left: none;
  background: #fff;
  color: var(--main-color);
  // font-size: 1.8rem;
  border-radius: 0 0.6rem 0.6rem 0;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

export const scrollBox = css`
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const memberItem = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid #f2f2f2;
  border-radius: 0.5rem;
  background: #fff;
  cursor: pointer;
  transition: background 0.15s ease, box-shadow 0.15s ease;
  min-width: 0;

  &:hover {
    background: var(--hB-color);
  }
`;

export const memberInfo = css`
  display: flex;
  align-items: center;
  min-width: 0;
  flex: 1;
`;

export const profileImg = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  flex-shrink: 0;
`;

export const textBox = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: flex-start;     
  min-width: 0;
  word-break: break-word;
  gap: 0.2rem; 
`;

export const nickname = css`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const fullName = css`
  align-self: flex-start;
  color: #5f5f5f;
  font-size: 1.2rem;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;