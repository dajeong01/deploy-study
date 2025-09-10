import { css } from "@emotion/react";

export const layout = css`
  text-align: center;
  margin: 0 auto;
  width: 100%;
  min-width: 0;
  padding-bottom: 3rem;
`;

export const dataGridWrapper = css`
  height: 100%;
  width: 100%;
  .MuiDataGrid-cell {
    font-size: 1.4rem;
  }

  .MuiDataGrid-columnHeaderTitle {
    // font-size: 1.5rem;
    // font-weight: 600;
  }
`;

export const modalBox = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2.4rem;
  border-radius: 0.8rem;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
  min-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
`;

export const profileRow = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.4rem;
`;

export const profileImg = css`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
`;

export const attendanceButton = css`
  background: var(--main-color);
  color: #fff;
  border-radius: 0.5rem;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
`;
