import { css } from "@emotion/react";

export const headerlayout = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 1rem 0.5rem;
  gap: 1rem;
`;

export const head = css`
  text-align: center;
`;

export const headFont = css`
  margin: 0;
  color: gray;
  padding-left: 2rem;
  text-align: left;
`;

export const moreButton = css`
  border: none;
  border-radius: 1rem;
  width: 8rem;
  height: 3rem;
  background: #5f5f5f;
  color: white;
  cursor: pointer;

  :hover {
    background: black;
  }
`;

export const layout = css`
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 64rem) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 0 1rem;
  }
`;

export const section = css`
  flex: 1 1 30rem;
  min-width: 28rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 3rem;

  @media (max-width: 64rem) {
    min-width: 100%;
    flex: none;
    padding-bottom: 2rem;
  }
`;

export const sectionTitle = css`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const rankingList = css`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const notice = css`
  text-align: center;
  color: black;
`;

export const card = (rank) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 1.2rem;
  background: white;
  margin-bottom: 1rem;

  ${rank === 1 && `box-shadow: 0 0.4rem 1rem rgba(255, 217, 0, 0.9);`}
  ${rank === 2 && `box-shadow: 0 0.4rem 0.8rem rgba(255, 217, 0, 0.6);`}
  ${rank === 3 && `box-shadow: 0 0.4rem 0.6rem rgba(255, 217, 0, 0.4);`}
  ${rank > 3 && `box-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.1);`}
`;

export const rankBadge = css`
  width: 3rem;
  text-align: center;
  padding-right: 1rem;
`;

export const crewInfo = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

export const avatar = css`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
  object-fit: cover;
  background: #f5f5f5;
`;

export const crewName = css``;

export const crewLocation = css`
  color: #777;
`;

export const crewStats = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
`;

export const mainStat = css``;

export const subStat = css`
  color: #555;
`;

export const myRankCard = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1 1 20rem;
  padding: 1rem;
  border-radius: 1.2rem;
  box-shadow: 0 0.6rem 1rem rgba(0, 0, 0, 0.2);
  background-color: #fff;
  text-align: center;

  @media (max-width: 64rem) {
    flex: none;
    width: 100%;
  }
`;

export const rankingInfo = css``;

export const myRankTitle = css`
  color: #555;
  margin-bottom: 1rem;
`;

export const myRankNumber = css`
  color: black;
  margin-bottom: 0.5rem;
`;

export const myRankSub = css`
  color: #555;
`;

export const mySection = css`
  flex: 1 1 20rem;
  min-width: 28rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 3rem;

  @media (max-width: 64rem) {
    order: -1;
  }

`;