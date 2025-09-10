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
  gap: 0.8rem;
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const label = css`
  font-weight: bold;
  color: #333;
`;

export const selectBox = css`
  width: 11rem;
  height: 3.425rem;
  padding: 0.24rem 0.48rem;
  border-radius: 0.4rem;
  font-size: 1.2rem;
  background-color: #fff;
  color: #333;

  .MuiOutlinedInput-notchedOutline {
    border-color: #ccc;
  }
  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: #333;
  }
  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: var(--main-color) !important;
  }
`;

export const menuItem = css`
  font-size: 1.2rem;
  background-color: #fff !important;
  &:hover {
    background-color: var(--hB-color) !important;
  }
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
  border: 0.1rem solid #ddd;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.2s ease;
  width: 10rem;

  &:focus {
    border-color: #000000ff;
  }
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

export const mainLine = css`
  padding-left: 1rem;
`;

export const fontBold = css`
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 2rem;
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
  font-size: 1rem;

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