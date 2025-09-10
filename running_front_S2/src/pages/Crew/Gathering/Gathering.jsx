/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import {
  FaCalendar,
  FaMapMarkerAlt,
  FaRunning,
  FaWonSign,
} from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetGatheringsQuery } from "../../../queries/Crew/Gathering/useGetGatheringsQuery";
import useGetCrewRoleQuery from "../../../queries/Crew/useGetCrewRoleQuery";
import usePrincipalQuery from "../../../queries/User/usePrincipalQuery";
import { useCrewStore } from "../../../stores/useCrewStroes";
import GatheringDetailModal from "./GatheringDetailModal/GatheringDetailModal";
import * as s from "./styles";
import { IoSearch } from "react-icons/io5";
import Button from "../../../components/Button/Button";
import SearchBox from "../../../components/SearchBox/SearchBox";

function Gathering() {
  const { crewId } = useCrewStore();
  const navigate = useNavigate();
  const gatheringsQuery = useGetGatheringsQuery(crewId);
  const [isRegOpen, setRegOpen] = useState(false);
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [selectedGathering, setSelectedGathering] = useState(null);
  const [gatherings, setGatherings] = useState([]);
  const { data: principalData, isLoading } = usePrincipalQuery();
  const userId = principalData?.data?.body?.user?.userId;
  const CrewRoleQuery = useGetCrewRoleQuery(userId);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);

  const crewRole = CrewRoleQuery?.data?.some(
    (role) => role.crewId === Number(crewId)
  );
  const isCrewMember = !!crewRole;

  const handleSearchOnClick = () => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", "1");
      p.set("searchText", searchInput);
      return p;
    });
  };
  const handleSearchOnChange = (e) => setSearchInput(e.target.value);
  const handleSearchOnKeyDown = (e) => {
    if (e.key === "Enter") handleSearchOnClick();
  };

  useEffect(() => {
    if (!isLoading) {
      if (!userId) {
        alert("로그인 후 이용 부탁드립니다.");
        navigate("/auth/oauth2/signin");
        return;
      }
    }

    if (gatheringsQuery?.data?.data?.body) {
      const now = new Date();
      const updatedGatherings = gatheringsQuery.data.data.body.filter((g) => {
        const gatheringDateTime = new Date(`${g.runningDate}T${g.runningTime}`);
        const diffInMs = now - gatheringDateTime;
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        return diffInDays <= 3;
      });

      setGatherings(updatedGatherings);
    }
  }, [gatheringsQuery?.data, principalData, isLoading, navigate, userId]);

  const handleModalClose = () => {
    setRegOpen(false);
    setDetailOpen(false);
  };
  const handleOpenDetailModal = (gathering) => {
    if (!isCrewMember) {
      alert("크루 멤버만 접근 가능합니다. 크루에 가입해주세요.");
      navigate(`/crews/${crewId}`);
      return;
    }
    setSelectedGathering(gathering);
    setDetailOpen(true);
  };

  const handleUpdateParticipants = (
    gatheringId,
    currentParticipants,
    isAttending
  ) => {
    setGatherings((prev) =>
      prev.map((g) =>
        g.gatheringId === gatheringId
          ? { ...g, currentParticipants, isAttending }
          : g
      )
    );
  };

  return (
    <>
      <div css={s.layout}>
        <h2>정모 일정</h2>
        <SearchBox value={searchInput} onChange={setSearchInput} onSearch={handleSearchOnClick}>
          {isCrewMember && (
            <Button onClick={() => navigate(`/crews/${crewId}/gathering/register`)}>
              일정 등록
            </Button>
          )}
        </SearchBox>

        <main
          css={[
            gatherings.length === 0 ? s.noGatheringWrapper : s.gatheringMain,
          ]}
        >
          {gatherings.length === 0 ? (
            <div css={s.noGatheringMessage}>
              등록된 정모 일정이 없습니다.
            </div>
          ) : (
            gatherings.map((g, index) => {
              const dateObj = new Date(`${g.runningDate}T${g.runningTime}`);
              let hours = dateObj.getHours();
              const ampm = hours >= 12 ? "오후" : "오전";
              hours = hours % 12 || 12;
              const formattedDate = `${dateObj.getFullYear()}년 ${
                dateObj.getMonth() + 1
              }월 ${dateObj.getDate()}일`;
              const formattedTime = `${ampm} ${hours}시 ${String(
                dateObj.getMinutes()
              ).padStart(2, "0")}분`;

              const isPastTime = (runningDate, runningTime) => {
                const gatheringDateTime = new Date(
                  `${runningDate}T${runningTime}`
                );
                return gatheringDateTime < new Date();
              };

              return (
                <div
                  key={index}
                  css={[
                    s.gatheringContainer,
                    isPastTime(g.runningDate, g.runningTime) &&
                      s.closedOverlay,
                  ]}
                  onClick={() => handleOpenDetailModal(g)}
                >
                  <div css={s.thumbnailImg}>
                    <img src={g?.thumbnailPicture} alt="썸네일 이미지" />
                  </div>
                  <div css={s.gatheringInfoContainer}>
                    <div css={s.gatheringTitle}>{g.title}</div>
                    <div css={s.gatheringDetailContainer}>
                      <div>
                        <FaCalendar /> {formattedDate}
                      </div>
                      <div>
                        <MdAccessTimeFilled /> {formattedTime}
                      </div>
                      <div>
                        <FaMapMarkerAlt /> {g.placeName}
                      </div>
                      <div>
                        <FaWonSign /> {g.cost}
                      </div>
                      <div>
                        <FaRunning /> {g.km} km
                      </div>
                    </div>
                    <div css={s.statusContainer}>
                      <div>
                        <div css={s.profileImg}>
                          <img src={g?.user?.picture} alt="프로필 사진" />
                        </div>
                        <div>
                          {g.currentParticipants} / {g.maxParticipants}
                        </div>
                      </div>
                      <div css={s.status}>
                        {g.status === 1 ? (
                          <div css={s.recruiting}>모집중</div>
                        ) : (
                          <div css={s.closed}>마감</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </main>
      </div>

      <GatheringDetailModal
        isOpen={isDetailOpen}
        onClose={handleModalClose}
        gathering={selectedGathering}
        onUpdateParticipants={handleUpdateParticipants}
      />
    </>
  );
}

export default Gathering;
