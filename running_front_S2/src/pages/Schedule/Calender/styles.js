import { css } from '@emotion/react';

export const mainLayout = css`
  display: flex;
  gap: 2rem;
  height: 100%;
  align-items: flex-start;
  width: 100%;
  padding-bottom: 3rem;
`;

export const calendarWrapper = css`
  flex: 0 0 70%;
  background: white;
  border: 0.1rem solid #dbdbdb;
  display: flex;
  flex-direction: column;
  min-height: 60rem;
`;

export const calendarWrapperFullWidth = css`
  flex: 1;
  background: white;
  border: 0.1rem solid #dbdbdb;
  display: flex;
  flex-direction: column;
  min-height: 60rem;
`;

export const selectedDateContainer = css`
  flex: 0 0 30%;
  min-width: 25rem;
  height: fit-content;
`;

export const header = css`
  background: black;
  color: white;
  padding: 1.5rem 2rem;
`;

export const headerContent = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const headerRight = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const navButton = css`
  padding: 0.75rem;
  border-radius: 0.375rem;
  cursor: pointer;
  border: none;
  background: transparent;
  color: white;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const toggleButton = css`
  padding: 0.75rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
  cursor: pointer;
  border: none;
  background: transparent;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const headerTitle = css`
  // font-weight: bold;
  margin: 0;
`;

export const weekDaysContainer = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #f9fafb;
  border-bottom: 0.1rem solid #dbdbdb;
`;

export const weekDayWeekday = css`
  text-align: center;
  padding: 1rem 0;
  color: #4b5563;
`;

export const weekDayWeekend = css`
  text-align: center;
  padding: 1rem 0;
  color: #9ca3af;
`;

export const calendarGrid = css`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const daysGrid = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.1rem;
  background: #e5e7eb;
  flex: 1;
  min-height: 40rem;
`;

export const emptyCell = css`
  height: 8rem;
`;

export const dayCell = css`
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  border: 0.1rem solid #dbdbdb;
  background: white;
  color: var(--main-color);
  // font-weight: 500;

  &:hover {
    background: var(--sub-color);
  }
`;

export const dayCellToday = css`
  ${dayCell};
  background: black;
  color: white;
  // font-weight: bold;

  &:hover {
    background: #374151;
  }
`;

export const dayCellSelected = css`
  ${dayCell};
  background: #374151;
  color: white;

  &:hover {
    background: #4b5563;
  }
`;

export const eventDotDefault = css`
  position: absolute;
  bottom: 0.8rem;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: #9ca3af;
`;

export const eventDotSelected = css`
  position: absolute;
  bottom: 0.8rem;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: white;
`;

export const selectedDateInfo = css`
  background: #ffffff;
  border: 0.1rem solid black;
  border-radius: 0.5rem;
  padding: 2rem;
  height: fit-content;
  min-height: 15rem;
`;

export const selectedDateTitle = css`
  color: #374151;
  margin-bottom: 1rem;
`;

export const selectedEventTitle = css`
  color: black;
  // font-weight: 600;
  margin: 0;
  line-height: 1.4;
`;

export const noEventText = css`
  color: #6b7280;
  margin: 0;
  font-style: italic;
`;

export const eventBox = css`
  background: #f9fafb;
  border: 0.1rem solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-0.3rem);
  }

  h3 {
    // font-weight: 700;
    color: #111827;
    margin-bottom: 0.75rem;
  }

  p {
    margin: 0.25rem 0;
    color: black;
  }

  p:first-of-type {
    // font-weight: 600;
    color: #2563eb;
  }
`;