import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
`;

export const titleBox = css`
  border: 0.1rem solid #dbdbdb;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #fff;
`;

export const banner = css`
  width: 100%;
  height: 20rem;
  overflow: hidden;
  position: relative;

  & > div {
    width: 100%;
    height: 100%;
    background-color: black;
    display: block;
    position: relative;


    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.2s ease;
    }

  }
`;

export const crewInfoSection = css`
  position: relative;
  padding: 3rem 2rem 0.2rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const profilePicture = css`
  position: absolute;
  top: -4rem;
  left: 2rem;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: 0.3rem solid #fff;
  overflow: hidden;
  background-color: #f0f0f0;
  transition: transform 0.2s ease;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const crewTextBox = css`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    margin: 0;
  }

  p {
    color: #555;
  }
`;

export const crewText = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  & > p {
    padding-right: 1rem;
  }
`;

export const gungu = css`
  border: 0.1rem solid #dbdbdb;
  border-radius: 0.5rem;
  padding-left: 1rem;
  margin-right: 1rem;
  background-color: #f0f0f0;
`;

export const mainLine = css`
  padding-left: 1rem;
`;

export const fontBold = css`
  font-size: 1.6rem;
  margin-top: 2rem;
  font-weight: bold;
`;

export const section = css`
  margin-bottom: 2rem;
`;

export const sectionHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const gatheringRow = css`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const gatheringCard = css`
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 2px 8px;
  gap: 12px;
  max-width: 20rem;
  flex: 1 1 calc(20% - 1.5rem);
  min-width: 15rem;
`;

export const thumbWrap = css`
  position: relative;
  width: 100px;
  height: 12rem;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const timeOverlay = css`
  position: absolute;
  bottom: 6px;
  left: 6px;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  // font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
`;

export const cardBody = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  gap: 4px;
`;

export const title = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 150px;
  display: block;
`;

export const time = css`
  color: #4b5563;
`;

export const place = css`
  color: #4b5563;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const meta = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const cost = css`
  color: #4b5563;
`;

export const participants = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const fontSetting = css`
  padding-left: 0.4rem;
  color: #4b5563;
`;

export const participantImg = css`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
`;

export const memberRow = css`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 5rem;
`;

export const memberItem = css`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0;
  box-sizing: border-box;
  flex: 1 1 calc(16.66% - 1rem);
  min-width: 11rem;
  max-width: 13rem;
`;

export const avatarWrap = css`
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  overflow: hidden;
  background: #eee;
`;

export const avatar = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const badge = css`
  left: 4px;
  bottom: 4px;
  line-height: 1;
`;

export const textBox = css`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  line-height: 1.1;
`;

export const fullName = css`
  font-size: 1.2rem;
  text-align: start;
  color: #6b7280;
`;

export const arrowBtnOverlay = css`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;