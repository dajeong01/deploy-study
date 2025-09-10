/** @jsxImportSource @emotion/react */
import * as s from './styles';
import MainContainer from "../../../components/MainContainer/MainContainer";
import useGetCrewRankingQuery from "../../../queries/Ranking/useGetCrewRankingQuery";
import RankingCard from "./RankingCard";
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

function CrewRanking() {
  const navigate = useNavigate();
  const { data: rankings } = useGetCrewRankingQuery();


  return (
    <MainContainer>
      <h2 css={s.head}>크루 랭킹</h2>
      <p css={s.headFont}><FaStar style={{color: "gray"}}/> 랭킹은 매일 자정 마다 자동 갱신됩니다. </p>
      <div css={s.layout}>
        <section css={s.section}>
          <p css={s.sectionTitle}>🏃‍♂️ 총 거리 랭킹</p>
          <div css={s.rankingList}>
            {rankings?.totalKmRanking?.slice(0, 10).map((crew, index) => (
              <div key={crew.crewId} css={s.cardDiv} onClick={() => navigate(`/crews/${crew.crewId}`)}>
                <RankingCard
                  key={crew.crewId}
                  data={crew}
                  rank={index + 1}
                  type="distance"
                  mode="crew"
                />
              </div>
            ))}
          </div>
        </section>

        <section css={s.section}>
          <p css={s.sectionTitle}>👥 멤버 수 랭킹</p>
          <div css={s.rankingList}>
            {rankings?.memberRanking?.slice(0, 10).map((crew, index) => (
              <div key={crew.crewId} css={s.cardDiv} onClick={() => navigate(`/crews/${crew.crewId}`)}>
                <RankingCard
                  key={crew.crewId}
                  data={crew}
                  rank={index + 1}
                  type="member"
                  mode="crew"
                />
              </div>
            ))}
          </div>
        </section>

        <section css={s.section}>
          <p css={s.sectionTitle}>🌟 신규 크루</p>
          <div css={s.rankingList}>
            {rankings?.newRanking?.slice(0, 10).map((crew, index) => (
              <div key={crew.crewId} css={s.cardDiv} onClick={() => navigate(`/crews/${crew.crewId}`)}>
                <RankingCard
                  key={crew.crewId}
                  data={crew}
                  rank={index + 1}
                  type="new"
                  mode="crew"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainContainer>
  );
}

export default CrewRanking;
