/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import MainContainer from "../../../components/MainContainer/MainContainer";
import useGetUserRankingQuery from '../../../queries/Ranking/useGetUserRankingQuery';
import usePrincipalQuery from '../../../queries/User/usePrincipalQuery';
import RankingCard from '../CrewRanking/RankingCard';
import * as s from './styles';

function UserRanking(props) {
  const { data: rankings } = useGetUserRankingQuery();
  const { data: principalQuery, isLoading } = usePrincipalQuery();  
  const userId = principalQuery?.data?.body?.user?.userId;
  
  const myTotalKmRank = rankings?.totalKmRanking?.findIndex(user => {
    return user.userId === userId;
  });
  console.log(rankings);
  
  const myGatheringRank = rankings?.gatheringCount?.findIndex(user => user.userId === userId);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      const userId = principalQuery?.data?.body?.user?.userId;

      if (!userId) {
        alert("로그인 후 이용 가능합니다.");
        navigate("/auth/oauth2/signin");
      }
    }
  }, [principalQuery, isLoading, navigate]);

  return (
    <MainContainer>
      <h2 css={s.head}>유저 랭킹</h2>
      <p css={s.headFont}><FaStar style={{color: "gray"}}/> 랭킹은 매일 자정 마다 자동 갱신됩니다. </p>
      <div css={s.layout}>
        <section css={s.section}>
          <p css={s.sectionTitle}>🏃‍♂️ 총 거리 랭킹</p>
          <div css={s.rankingList}>
            {
              rankings?.totalKmRanking?.slice(0, 10).map((user, index) => (
              <div key={user.userId}>
                <RankingCard
                  data={user} 
                  rank={index + 1} 
                  type="distance" 
                  mode="user" 
                />
              </div>
              )) 
            }
          </div>
        </section>

        <section css={s.section}>
          <p css={s.sectionTitle}>👥 정모 참여 횟수</p>
          <div css={s.rankingList}>
            {
              rankings?.gatheringCount?.slice(0, 10).map((user, index) => (
              <div key={user.userId}>
                <RankingCard 
                  data={user} 
                  rank={index + 1} 
                  type="gathering" 
                  mode="user" 
                />
              </div>
              )) 
            }
          </div>
        </section>

        <section css={s.mySection}>
          <h1 css={{ fontSize: '1.5rem', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>나의 등수</h1>
          <div css={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div css={s.myRankCard}>
              <div css={s.rankingInfo}>
                <p css={s.myRankTitle}>🏃‍♂️ 총 거리</p>
                <p css={s.myRankSub}>
                  {rankings?.totalKmRanking?.find(user => user.userId === userId)?.totalKm ?? '0'} km
                </p>
              </div>
              <p css={s.myRankNumber}>
                {myTotalKmRank !== undefined && myTotalKmRank !== -1 ? myTotalKmRank + 1 + '위' : '순위 없음'}
              </p>
            </div>

            <div css={s.myRankCard}>
              <div css={s.rankingInfo}>
                <p css={s.myRankTitle}>👥 정모 참여 횟수</p>
                <p css={s.myRankSub}>
                  {rankings?.gatheringCount?.find(user => user.userId === userId)?.gatheringCount ?? '0'} 회
                </p>
              </div>
              <p css={s.myRankNumber}>
                {myGatheringRank !== undefined && myGatheringRank !== -1 ? myGatheringRank + 1 + '위' : '순위 없음'}
              </p>
            </div>

          </div>
        </section>
      </div>
    </MainContainer>
  );
}

export default UserRanking;