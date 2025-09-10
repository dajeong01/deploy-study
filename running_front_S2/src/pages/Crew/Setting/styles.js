import { css } from "@emotion/react";

export const imageOverlay = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

export const mainBox = css`
  width: 100%;

  & > h2 {
    text-align: center;
  }
`;

export const settingHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
`;

export const settingTitle = css`
  margin: 0;
  color: #333;
`;

export const profileImageOverlay = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  border-radius: 50%;
`;

export const field = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const label = css`
  font-size: 1.6rem;
  font-weight: bold;
  color: #333;
`;

export const checkName = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export const input = css`
  flex: 1;
  padding: 1rem;
  border: 0.1rem solid #ddd;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #000000ff;
  }

  &::placeholder {
    color: #999;
  }
`;

export const numberInputContainer = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const numberInput = css`
  padding: 1rem;
  // font-size: 1.4rem;
  border: 0.1rem solid #ddd;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.2s ease;
  width: 10rem;

  &:focus {
    border-color: #000000ff;
  }
`;

export const inputHint = css`
  color: #666;
`;

export const errorMsg = css`
  color: #e74c3c;
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;

export const quillWrapper = css`
  padding-bottom: 3rem;
  .ql-editor {
    min-height: 15rem;
  }
  
  .ql-toolbar {
    border-top: 0.1rem solid #ddd;
    border-left: 0.1rem solid #ddd;
    border-right: 0.1rem solid #ddd;
    border-bottom: none;
    border-radius: 0.5rem 0.5rem 0 0;
  }
  
  .ql-container {
    border-left: 0.1rem solid #ddd;
    border-right: 0.1rem solid #ddd;
    border-bottom: 0.1rem solid #ddd;
    border-top: none;
    border-radius: 0 0 0.5rem 0.5rem;
  }
`;

export const memberSection = css`
  background-color: #fff;
  border: 0.1rem solid #dbdbdb;
  border-radius: 0.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
`;

export const sectionTitle = css`
  color: #333;
  margin: 0 0 1.5rem 0;
`;

export const memberContainer = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

export const memberBox = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 0.1rem solid #eee;
  border-radius: 0.5rem;
  background-color: #fafafa;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
    border-color: #ddd;
  }
`;

export const memberImg = css`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e0e0e0;
  flex-shrink: 0;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const memberInfo = css`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;
`;

export const memberName = css`
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const memberStatus = css`
  // font-size: 1.2rem;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const mainLine = css`
  padding-left: 1rem;
`;

export const fontBold = css`
  font-size: 2rem;
  margin-top: 2rem;
  font-weight: bold;
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
  cursor: pointer;

  & > div {
    width: 100%;
    height: 100%;
    background-color: black;
    display: block;
    position: relative;

    &:hover .overlay {
      opacity: 1;
    }

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.2s ease;
    }

    &:hover > img {
      transform: scale(1.05);
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
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:hover .overlay {
    opacity: 1;
  }

  & > div {
    width: 100%;
    height: 100%;
    background-color: #5f5f5f;
  }
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
    // font-size: 2rem;
    // font-weight: bold;
    margin: 0;
  }

  p {
    // font-size: 1.4rem;
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

export const Button = css`
  margin-top: 4rem;
  padding: 0.8rem 2rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;