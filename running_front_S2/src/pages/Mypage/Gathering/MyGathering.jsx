/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { useNavigate } from 'react-router-dom';
import usePrincipalQuery from '../../../queries/User/usePrincipalQuery';
import useGetMyGatheringQuery from '../../../queries/User/useGetMyGatheringQuery';
import { IoLocation, IoTimeSharp } from 'react-icons/io5';

function MyGathering() {
  const navigate = useNavigate();
  const principal = usePrincipalQuery();
  const userId = principal?.data?.data?.body?.user?.userId;

  const { data, isLoading, isError } = useGetMyGatheringQuery(userId);
  const gatherings = data?.body || [];
  
  const handleNavigate = (crewId) => {
    navigate(`/crews/${crewId}`);
  };

  if (isLoading) {
    return (
      <div css={s.container}>
        <div css={s.headerBox}>내 일정을 불러오는 중...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div css={s.container}>
        <div css={s.headerBox}>일정을 불러오는 중 오류가 발생했습니다.</div>
      </div>
    );
  }

  return (
    <div css={s.container}>
      <div css={s.headerBox}>
        <h2>나의 정모 일정</h2>
      </div>

      {gatherings.length === 0 ? (
        <div css={s.textBox}>
          <p>참여한 일정이 없습니다.</p>
        </div>
      ) : (
        <div css={s.gridBox}>
          {gatherings.map((g, index) => {
            const isPast = new Date(`${g.runningDate}T${g.runningTime}`) < new Date();
            return (
              <div
                key={index}
                css={[s.card, isPast && s.disabledCard]}
                onClick={() => {
                  if (!isPast) handleNavigate(g.crewId);
                }}
              >
                <div css={s.thumbnailBox}>
                  <img src={g.thumbnailPicture} alt={g.title} />
                </div>
                <div css={s.textBox}>
                  <div css={s.gungu}>{g.gunguName}</div>
                  <div css={s.crewName}>[{g.crewName}]</div>
                  <div css={s.crewTitle}>{g.title}</div>
                  <div css={s.gungu}>
                    <IoTimeSharp /> {g.runningDate} {g.runningTime}
                  </div>
                  <div css={s.gungu}>
                    <IoLocation /> {g.placeName}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyGathering;
