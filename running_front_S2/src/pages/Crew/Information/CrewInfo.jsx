/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from 'react';
import * as s from './styles';
import { useCrewStore } from '../../../stores/useCrewStroes';
import WelcomeRegModal from '../Welcome/WelcomeRegModal/WelcomeRegModal';
import { reqGetMemberCount, reqGetMembers, } from '../../../api/Crew/memberApi';
import usePrincipalQuery from '../../../queries/User/usePrincipalQuery';
import useGetCrewRoleQuery from '../../../queries/Crew/useGetCrewRoleQuery';
import { useNavigate } from 'react-router-dom';
import { useGetGatheringsQuery } from '../../../queries/Crew/Gathering/useGetGatheringsQuery';
import { IoTimeSharp, IoLocation } from "react-icons/io5";
import { FaWonSign } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import Button from '../../../components/Button/Button';

function CrewInfo() {
  const principal = usePrincipalQuery();
  const navigate = useNavigate();
  const userId = principal?.data?.data?.body?.user?.userId;
  const { crew, crewId } = useCrewStore();
  const [isOpen, setIsOpen] = useState(false);
  const [countMember, setCountMember] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const CrewRoleQuery = useGetCrewRoleQuery(userId);

  const crewRole = CrewRoleQuery?.data?.some((role) => role.crewId === Number(crewId));

  const isCrewMember = !!crewRole;
  const [members, setMembers] = useState([]);
  const displayMembers = (members ?? []).slice(0, 6);
  const [gatherings, setGatherings] = useState([]);
  const { data } = useGetGatheringsQuery(crewId);
  
  useEffect(() => {
    if (!crewId) return; (
      async () => {
        try {
          const res = await reqGetMembers(crewId);
          setMembers(res.data.body ?? []);
        }
        catch (e) {
          console.error("멤버 불러오기 실패:", e);
          alert("멤버 정보를 불러오는 중 오류가 발생했습니다.");
        }
      })();
  }, [crewId]);

  useEffect(() => {
    const body = data?.data?.body;
    if (body) setGatherings(body);
  }, [data]);

  useEffect(() => {
    if (!crewId) return;               
    (async () => {
      try {
        const res = await reqGetMemberCount(crewId);
        const count = res?.data?.body ?? res?.body;
        setCountMember(Number(count));   
      } catch (e) {
        console.error("getMemberCount error", e);
      }
    })();
  }, [crewId]);

  const getKey = (dateStr, timeStr) =>
    dateStr ? `${dateStr.replaceAll("-", "")}${(timeStr || "00:00").replace(":", "")}` : null;

  const nowKey = (() => {
    const n = new Date();
    const y = n.getFullYear();
    const m = String(n.getMonth() + 1).padStart(2, "0");
    const d = String(n.getDate()).padStart(2, "0");
    const hh = String(n.getHours()).padStart(2, "0");
    const mm = String(n.getMinutes()).padStart(2, "0");
    return `${y}${m}${d}${hh}${mm}`;
  })();

  const displayGatherings = useMemo(() => {
    const list = (gatherings ?? []).filter(g => {
      const k = getKey(g.runningDate, g.runningTime);
      return k && k >= nowKey;
    });
    list.sort((a, b) => getKey(a.runningDate, a.runningTime).localeCompare(getKey(b.runningDate, b.runningTime)));
    return list.slice(0, 3);
  }, [gatherings]);

  const formatRelativeDate = (dateStr, timeStr) => {
    const now = new Date();
    const targetDate = new Date(dateStr);

    if (timeStr) {
      const [hour, minute] = timeStr.split(":").map(Number);
      targetDate.setHours(hour, minute, 0, 0);
    }

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    const diffDays = Math.floor((targetDay - today) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `오늘 ${timeStr || ""}`;
    } else if (diffDays === 1) {
      return `내일 ${timeStr || ""}`;
    } else {
      return `${targetDate.getFullYear()}.${targetDate.getMonth() + 1}.${targetDate.getDate()} ${timeStr || ""}`;
    }
  };


  return (
    <div css={s.layout}>
      <div css={s.titleBox}>
        <div css={s.banner}>
          <div>
            <img src={crew?.thumbnailPicture} alt="" />
          </div>
        </div>
        <div css={s.crewInfoSection}>
          <div css={s.profilePicture}>
            <img src={crew?.profilePicture} alt="크루 프로필" />
          </div>

          <div css={s.crewTextBox}>
            <h2>{crew?.crewName}</h2>
            <div css={s.crewText}>
              <p css={s.gungu}>{crew?.gunguName}</p>
              <p>멤버수 {countMember} / {crew?.limitedPeople}</p>
              <p>•</p>
              <p>총 {crew?.totalKm} KM</p>
            </div>
          </div>
          {!isCrewMember && (
            <Button
              onClick={() => setIsOpen(true)}
              disabled={isPending || countMember >= crew?.limitedPeople}
            >
              {countMember >= crew?.limitedPeople ? "정원마감" : isPending ? "처리중" : "크루가입"}
            </Button>
          )}
          {isOpen && (
            <WelcomeRegModal
              setIsOpen={setIsOpen}
              crewId={crewId}
              onSuccess={() => setIsPending(true)}
            />
          )}
        </div>
      </div>

      <div css={s.mainLine}>
        <div>
          <p css={s.fontBold}>한줄 소개</p>
          <div>{crew?.title}</div>
          <h2 css={s.fontBold}>크루 소개</h2>
          <div dangerouslySetInnerHTML={{ __html: crew?.content }} />
        </div>

        <div css={s.section}>
          <div css={s.sectionHeader}>
            <h2 css={s.fontBold}>정모 일정</h2>
          </div>

          {Array.isArray(displayGatherings) && displayGatherings.length > 0 ? (
            <div css={s.gatheringRow}>
              {displayGatherings.map((g) => (
                <div key={g.gatheringId} css={s.gatheringCard}>
                  <div css={s.thumbWrap}>
                    <img src={g.thumbnailPicture} alt={g.title} />
                  </div>
                  <div css={s.cardBody}>
                    <div css={s.title}>{g.title}</div>
                    <div css={s.time}><IoTimeSharp /> {formatRelativeDate(g.runningDate, g.runningTime)}</div>
                    <div css={s.place}><IoLocation /> {g.placeName}</div>
                    <div css={s.cost}> <FaWonSign /> {g.cost.toLocaleString()} </div>
                      <div css={s.participants}>
                        <img src={g?.user?.picture} alt="참여자" css={s.participantImg}/>
                        <div css={s.fontSetting}>
                          {g.currentParticipants}/{g.maxParticipants}
                        </div>
                      </div>
                  </div>
                </div>
              ))}
              <button
                css={s.arrowBtnOverlay}
                aria-label="정모 전체 보기"
                onClick={() => navigate(`/crews/${crewId}/gathering`)}
              >
                <IoIosArrowForward size={22}/>
              </button>
            </div>
            
          ) : (
            <div>현재 등록된 정모 일정이 없습니다.</div>
          )}
        </div>

        <div>
          <h2 css={s.fontBold}>크루 멤버 ({countMember})</h2>
          <div css={s.memberRow}>
            {displayMembers.map((m) => (
              <div key={m.memberId} css={s.memberItem}>
                <div css={s.avatarWrap}>
                  <img css={s.avatar} src={m.user?.picture} alt={m.user?.nickname ?? "member"} />
                </div>
                <div css={s.textBox}>
                  <div>
                    <span>
                      {m.user?.nickname ?? "이름없음"}
                    </span>
                    {m.roleId === 1 && <span css={s.badge}>👑</span>}
                    {m.roleId === 2 && <span css={s.badge}>⭐</span>}
                  </div>
                  <div css={s.fullName}>{m.user?.fullName ?? ""}</div>
                </div>
              </div>
            ))}

            <button
              type="button"
              css={s.arrowBtnOverlay}
              aria-label="멤버 전체 보기"
              onClick={() => navigate(`/crews/${crewId}/members`)}
            >
              <IoIosArrowForward size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrewInfo;