import { css } from "@emotion/react";

export const overlay = css`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.5);
  padding: 2rem;
  z-index: 1000;
`;

export const modal = css`
  position: relative;
  background-color: #fff;
  border-radius: 0.5rem;
  width: 95%;
  height: 90%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const editIcon = css`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  gap: 1rem;
`;

export const IconButton = css`
  cursor: pointer;
`;

export const profileSection = css`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  border-bottom: 0.1rem solid #dbdbdb;
`;

export const profileImageWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  width: 12rem;
  height: 12rem;
  overflow: hidden;
  cursor: pointer;
`;

export const profileImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const nicknameErrMsg = css`
  // font-size: 1.2rem;
  color: red;
  margin-left: 0.5rem;
`;

export const errMsg = css`
  // font-size: 1.2rem;
  color: red;
  margin-left: 0.5rem;
`;

export const editButtons = css`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const saveButton = css`
  padding: 0.6rem 1.6rem;
  border-radius: 0.5rem;
  border: none;
  background: var(--main-color);
  color: var(--sub-color);
  cursor: pointer;
`;

export const cancelButton = css`
  padding: 0.6rem 1.6rem;
  border-radius: 0.5rem;
  border: none;
  background: var(--sub-color);
  color: var(--main-color);
  cursor: pointer;
`;

export const tabMenu = css`
  display: flex;
  border-bottom: 0.1rem solid #dbdbdb;
`;

export const tab = css`
  flex: 1;
  text-align: center;
  padding: 1.2rem 0.8rem;
  cursor: pointer;
`;

export const activeTab = css`
  // font-weight: bold;
  border-bottom: 0.2rem solid var(--main-color);
  background-color: var(--hB-color);
`;

export const tabContent = css`
  padding: 1rem 3rem;
  overflow-y: auto;
  flex: 1;
`;

export const cardWrapper = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
  gap: 1.5rem;
`;

export const card = css`
  border: 0.1rem solid #dbdbdb;
  border-radius: 0.5rem;
  padding: 1.2rem 1.5rem;

  p {
    margin: 0.4rem 0;
  }

  &:hover {
    background-color:var(--hB-color);
    transform: translateY(-2px);
  }
`;

export const gatheringWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const gatheringCard = css`
  border: 0.1rem solid #dbdbdb;
  border-radius: 0.5rem;
  padding: 1.2rem 1.5rem;

  p {
    margin: 0.4rem 0;
  }

  &:hover {
    background-color:var(--hB-color);
    transform: translateY(-2px);
  }
`;

export const reportList = css`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 2rem 0;
  max-height: 20rem;
  overflow-y: auto;
`;

export const reportItem = css`
  padding: 1rem 1.4rem;
  margin-bottom: 0.5rem;
  border-left: 0.4rem solid var(--point-color);
  border-radius: 0.5rem;

  &:hover {
    background-color: var(--hB-color);
  }
`;

export const reportContent = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const reportMain = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const reportReason = css`
  // font-weight: 600;
`;

export const reportTarget = css`
  // font-size: 1.2rem;
  font-style: italic;
`;

export const reportDate = css`
  white-space: nowrap;
`;


export const searchBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0 2rem 0;
`;

export const inputGroup = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const selectGroup = css`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

export const selectBox = css`
  width: 100%;
  height: 3.667rem;
  padding: 0.24rem 0.48rem;
  border-radius: 0.4rem;
  background-color: #fff;
  color: #333;
  font-size: 1.2rem;

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

export const searchGroup = css`
  display: flex;
  align-items: center;
`;

export const asd = css`
  display: flex;
  flex-direction: row;
`;

export const searchInput = css`
  height: 3.667rem;
  box-sizing: border-box;
  padding: 0.8rem;
  border: 0.1rem solid var(--main-color);
  border-right: none;
  border-radius: 0.6rem 0 0 0.6rem;
  outline: none;
`;

export const searchButton = css`
  display: flex;
  height: 3.667rem;
  box-sizing: border-box;
  padding: 0.5rem 0.5rem;
  border: 0.1rem solid var(--main-color);
  border-left: none;
  background: #fff;
  color: var(--main-color);
  border-radius: 0 0.6rem 0.6rem 0;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
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

export const closeButton = css`
  padding: 0.8rem 2rem;
  border-radius: 0.5rem;
  border: none;
  background: var(--main-color);
  color: var(--sub-color);
  cursor: pointer;
`;
