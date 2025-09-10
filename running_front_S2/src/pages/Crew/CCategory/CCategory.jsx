/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { reqGetMemberId, reqWithDrawMember } from "../../../api/Crew/memberApi";
import LeftSideBarLayout from "../../../components/LeftSideBarLayout/LeftSideBarLayout";
import Loading from "../../../components/Loading/Loading";
import MainContainer from "../../../components/MainContainer/MainContainer";
import { isNewSinceLastVisit, setLastVisitedNow } from "../../../components/Time/newBadgeUtil";
import useCrewDetailQuery from "../../../queries/Crew/List/useCrewDetailQuery";
import useCrewSectionsLatestQuery from "../../../queries/Crew/useCrewSectionsLatestQuery";
import useGetCrewRoleQuery from "../../../queries/Crew/useGetCrewRoleQuery";
import usePrincipalQuery from "../../../queries/User/usePrincipalQuery";
import CrewRoutes from "../../../routes/CrewRoute/CrewRoutes";
import { useCrewStore } from "../../../stores/useCrewStroes";
import * as s from "./styles";

function CCategory() {
  const navigate = useNavigate();
  const principal = usePrincipalQuery();
  const userId = principal?.data?.data?.body?.user?.userId;
  const { crewId: crewIdParam } = useParams();
  const crewId = crewIdParam;
  const crewKey = String(crewIdParam ?? "");
  const { data: crewData, isLoading, isSuccess } = useCrewDetailQuery(crewId);
  const { setCrewId, setCrew } = useCrewStore();
  const crewRoleQuery = useGetCrewRoleQuery(userId);
  const crewRole = crewRoleQuery?.data?.find((role) => role.crewId === Number(crewId));
  const canRegister = crewRole && [2, 3].includes(crewRole.roleId);
  const [ memberId, setMemberId ] = useState(0);
  const { data: latestMeta } = useCrewSectionsLatestQuery(crewId);

  useEffect(() => {
    if (!crewId) return;

    reqGetMemberId(crewId).then((res) => setMemberId(res.data.body));
    
    setCrewId(crewId);
    setCrew(crewData?.body);
    principal.refetch();
  }, [crewId, crewData?.body, setCrewId, setCrew]);

  const latest = {
    members: latestMeta?.members ?? 0,
    gatherings: latestMeta?.gatherings ?? 0,
    freeBoards: latestMeta?.freeBoards ?? 0,
    notices: latestMeta?.notices ?? 0,
  };

  useEffect(() => {
    if (!crewKey) return;
    ["members", "gatherings", "freeBoards", "notices"].forEach(sec => {
      const L = latest[sec];
    });
  }, [crewKey, latest]);

  const [refreshTick, setRefreshTick] = useState(0);

  const showNew = {
    members: isNewSinceLastVisit(crewKey, "members", latest.members),
    gatherings: isNewSinceLastVisit(crewKey, "gatherings", latest.gatherings),
    freeBoards: isNewSinceLastVisit(crewKey, "freeBoards", latest.freeBoards),
    notices: isNewSinceLastVisit(crewKey, "notices", latest.notices),
  };
  void refreshTick;

  if (isLoading) return <Loading isLoading={isLoading} />;

  const crew = crewData?.body || {
    crewId: Number(crewId),
    gunguId: 0,
    profilePicture: "",
    crewName: "",
    userId: 0,
    title: "",
    content: "",
    limitedPeople: 0,
    crewTotalKm: 0,
  };


  const isCrewLeader = crew?.userId === userId;

  const go = (section, to) => () => {
    setLastVisitedNow(crewKey, section);
    setRefreshTick((t) => t + 1);
    navigate(to);
  };

  const profileSection = isSuccess && (
    <div css={s.crewInfoBox} onClick={() => navigate(`/crews/${crewId}`)}>
      <div css={s.crewImgBox}>
        <img src={crew?.profilePicture} alt="크루 프로필 이미지" />
      </div>
      <div css={s.crewNameBox}>{crew.crewName}</div>
    </div>
  );

  const navigationButtons = (
    <>
      <button onClick={go("members", `/crews/${crewId}/members`)}>
        크루 멤버 {showNew.members && <span css={s.newBadge1}>NEW</span>}
      </button>
      {isCrewLeader && (
        <>
          <button onClick={go("welcome", `/crews/${crewId}/welcome`)}>가입 인사 관리</button>
        </>
      )}
      <button onClick={go("gatherings", `/crews/${crewId}/gathering`)}>
        정모 일정 {showNew.gatherings && <span css={s.newBadge1}>NEW</span>}
      </button>
      {isCrewLeader && (
        <>
          <button onClick={go("gathering-management", `/crews/${crewId}/gathering-management`)}>정모 관리</button>
        </>
      )}

      <button onClick={go("freeBoards", `/crews/${crewId}/freeBoards`)}>
        자유게시판 {showNew.freeBoards && <span css={s.newBadge1}>NEW</span>}
      </button>

      <button onClick={go("albums", `/crews/${crewId}/albums`)}>
        사진첩
      </button>

      <button onClick={go("notices", `/crews/${crewId}/notices`)}>
        공지사항 {showNew.notices && <span css={s.newBadge1}>NEW</span>}
      </button>
      {isCrewLeader && (
        <>
          <button onClick={go("report", `/crews/${crewId}/report`)}>신고사항</button>
          <button onClick={go("setting", `/crews/${crewId}/message`)}>메세지</button>
          <button onClick={go("setting", `/crews/${crewId}/setting`)}>설정</button>
        </>
      )}
    </>
  );

  const handleWithdrawOnClick = async () => {
    if (!memberId) {
      alert("멤버 ID를 불러오지 못했습니다.");
      return;
    }
    await reqWithDrawMember(memberId);
    alert("크루 탈퇴가 완료되었습니다.");
    setMemberId(0);
    setCrew(null);
    navigate("/");
  };

  const bottomSection = (memberId && canRegister) ? (
    <div css={s.getout}>
      <button onClick={handleWithdrawOnClick}>탈퇴하기</button>
    </div>
  ) : (<></>);



  return (
    <MainContainer>
      <LeftSideBarLayout
        profileSection={profileSection}
        navigationButtons={navigationButtons}
        bottomSection={bottomSection}
      >
        {CrewRoutes({ isCrewLeader })}
      </LeftSideBarLayout>
    </MainContainer>
  );
}

export default CCategory;
