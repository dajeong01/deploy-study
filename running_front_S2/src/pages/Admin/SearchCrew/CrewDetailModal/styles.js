import { css } from "@emotion/react";
import { Bold } from "lucide-react";

export const overlay = css`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  z-index: 1000;
`;

export const modal = css`
  position: relative;
  background-color: #fff;
  border-radius: 0.8rem;
  width: 95%;
  height: 90%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  // font-size: 1.4rem;
`;

export const messageSendBtn = css`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.8rem 1.6rem;
  background: var(--main-color);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  z-index: 10;

  &:active {
    transform: translateY(0);
  }
`;

export const header = css`
  padding: 2rem;
  border-bottom: 0.1rem solid #dbdbdb;
`;

export const headerTop = css`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const crewThumbnail = css`
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  border-radius: 0.5rem;
  background-color: #f5f5f5;
`;

export const crewTitleBox = css`
  h3 {
    margin: 0;
  }
  p {
    margin: 0.5rem 0 0 0;
  }
`;

export const crewMeta = css`
  line-height: 1.4;
  span + span::before {
    content: " | ";
  }
`;

export const tabs = css`
  display: flex;
  border-bottom: 0.1rem solid #dbdbdb;
`;

export const tab = (active) => css`
  flex: 1;
  text-align: center;
  padding: 1.2rem 0.8rem;
  cursor: pointer;
  // font-weight: ${active ? "Bold" : "normal"};
  color: ${active ? "var(--main-color)" : "var(--main-color)"};
  border-bottom: ${active ? "0.2rem solid var(--main-color)" : "none"};
  background-color: ${active ? "var(--hB-color)" : "transparent"};
`;

export const content = css`
  padding: 1rem 3rem;
  overflow-y: auto;
  flex: 1;
`;

export const emptyState = css`
  text-align: center;
  padding: 4rem;
`;

export const memberItem = (withBorder) => css`
  display: flex;
  align-items: center;
  padding: 1.2rem 0;
  border-bottom: ${withBorder ? "0.1rem solid #dbdbdb" : "none"};
  gap: 1.2rem;
  position: relative;
`;

export const memberAvatar = css`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const memberInfo = css`
  flex: 1;
`;

export const memberName = css`
  margin-bottom: 0.2rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  span {
    // font-size: 1.2rem;
  }
`;

export const memberFullName = css`
  // font-size: 1.2rem;
  color: #666;
`;

export const memberActions = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const settingsBtn = css`
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const memberMenu = css`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: #fff;
  border: 0.1rem solid #ddd;
  border-radius: 0.4rem;
  box-shadow: 0 0.2rem 0.6rem rgba(0,0,0,0.1);
  z-index: 10;
  min-width: 14rem;
`;

export const menuItem = css`
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  border-bottom: 0.1rem solid #dbdbdb;
  &:last-of-type {
    border-bottom: none;
  }
  &:hover {
    background: #f9f9f9;
  }
`;

export const menuPrimary = css`
  color: #000000ff;
  // font-weight: 500;
`;

export const menuDanger = css`
  color: red;
  // font-weight: 500;
`;

export const gatheringItem = (withBorder) => css`
  padding: 1.5rem 0;
  border-bottom: ${withBorder ? "0.1rem solid #f0f0f0" : "none"};
`;

export const gatheringTitle = css`
  margin-bottom: 0.8rem;
`;

export const gatheringContent = css`
  line-height: 1.4;
  div {
    margin-bottom: 0.4rem;
  }
`;

export const gatheringMeta = css`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.6rem;
`;

export const container = css`
  text-align: center;
  margin: 0 auto;
  width: 100%;
`;

export const registerButton = css`
  margin-left: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: var(--main-color);
  color: var(--sub-color);
  border-radius: 0.5rem;
  cursor: pointer;
`;

export const table = css`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

export const th = css`
  padding: 1.2rem;
  border-bottom: 0.2rem solid var(--main-color);
  // font-weight: 600;
`;

export const td = css`
  padding: 1rem;
  border-bottom: 0.1rem solid #dbdbdb;
`;

export const tdTitle = css`
  ${td};
  text-align: left;
`;

export const tr = css`
  cursor: pointer;
  &:hover {
    background-color: var(--hB-color);
  }
`;

export const footer = css`
  padding: 1.5rem 2rem;
  border-top: 0.1rem solid #dbdbdb;
  text-align: right;
`;

export const closeBtn = css`
  padding: 0.8rem 2rem;
  border-radius: 0.5rem;
  border: none;
  background: var(--main-color);
  color: var(--sub-color);
  cursor: pointer;
`;

