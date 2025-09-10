/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reqRegisterCrewMember } from "../../../api/Crew/memberApi";
import { reqRejectWelcome } from "../../../api/Crew/welcomeApi";
import { reqGetReportByUserId } from "../../../api/User/UserApi";
import useGetCrewWelcomeListQuery from "../../../queries/Crew/Welcome/useGetCrewWelcomeListQuery";
import usePrincipalQuery from "../../../queries/User/usePrincipalQuery";
import { useCrewStore } from "../../../stores/useCrewStroes";
import * as s from "./styles";

function Welcome({ isCrewLeader }) {
  const { crewId } = useCrewStore();
  const crewWelcomeList = useGetCrewWelcomeListQuery(crewId);
  const welcomes = crewWelcomeList?.data?.body || [];
  const [selectedUser, setSelectedUser] = useState(null);
  const userId = selectedUser?.userId;
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const { data: principalData, isLoading } = usePrincipalQuery();

  useEffect(() => {
    if (!isLoading) {
      const userId = principalData?.data?.body?.user?.userId;

      if (!userId) {
        alert("로그인 후 이용 부탁드립니다.");
        navigate("/auth/oauth2/signin");
      }
    }
  }, [principalData, isLoading, navigate]);

  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      try {
        const res = await reqGetReportByUserId(userId);
        setReports(res.data.body);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    crewWelcomeList.refetch();
  }, [userId]);

  const handleApproveOnClick = async () => {
    const reqRegCrewMember = {
      crewId,
      userId: selectedUser?.userId,
    };
    await reqRegisterCrewMember(reqRegCrewMember);
    await crewWelcomeList.refetch();
    setSelectedUser(null);
  };

  const handleRejectOnClick = async (welcomeId) => {
    await reqRejectWelcome(welcomeId);
    await crewWelcomeList.refetch();
    setSelectedUser(null);
  };

  const handleSelectedRowOnClick = (welcome) => {
    if (isCrewLeader) {
      setSelectedUser(welcome);
    }
  };

  const handleCloseModalOnClick = () => {
    setSelectedUser(null);
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return "";
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear + 1;
  };

  const hasReport = (userId) => {
    if (selectedUser?.userId === userId) {
      return reports && reports.length > 0;
    }
    return false;
  };

  return (
    <div css={s.mainBox}>
      <h2>가입 인사 </h2>
      <table css={s.table}>
        <thead>
          <tr>
            <th css={s.th}>No.</th>
            <th css={s.th}>닉네임</th>
            {isCrewLeader && <th css={s.th}>이름</th>}
            {isCrewLeader && <th css={s.th}>나이</th>}
            <th css={s.th}>자기소개</th>
            <th css={s.th}>신청 상태</th>
            <th css={s.th}>등록일</th>
          </tr>
        </thead>
        <tbody>
          {welcomes.length > 0 ? (
            welcomes.map((welcome) => {
              const age = calculateAge(welcome.birthDate);

              return (
                <tr
                  key={welcome.welcomeRank}
                  css={isCrewLeader ? s.clickableRow : undefined}
                  onClick={() => handleSelectedRowOnClick(welcome)}
                >
                  <td css={s.td}>{welcome.welcomeRank}</td>
                  {isCrewLeader ? (
                    <td css={s.td}>
                      {welcome.nickname}
                      {hasReport(welcome.userId) && (
                        <span css={s.warningDot} title="신고 이력이 있습니다">
                          🔴
                        </span>
                      )}
                    </td>
                  ) : (
                    <td css={s.td}>{welcome.nickname}</td>
                  )}
                  {isCrewLeader && <td css={s.td}>{welcome.fullName}</td>}
                  {isCrewLeader && <td css={s.td}>{age}</td>}
                  <td css={s.td}>{welcome.content}</td>
                  <td css={s.td}>{welcome.status}</td>
                  <td css={s.td}>
                    {new Date(welcome.createdAt).toLocaleDateString("ko-KR")}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={isCrewLeader ? 7 : 5}>
                등록된 가입 인사가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedUser && (
        <div css={s.modalOverlay}>
          <div css={s.detailModalContent}>
            <div css={s.modalHeader}>
              <h3>가입 신청 상세정보</h3>
              <button css={s.closeBtn} onClick={handleCloseModalOnClick}>
                ×
              </button>
            </div>

            <div css={s.modalBody}>
              <div css={s.infoSection}>
                <h4>기본 정보</h4>
                <div css={s.infoGrid}>
                  <div css={s.infoItem}>
                    <span css={s.label}>No.:</span>
                    <span>{selectedUser.welcomeRank}</span>
                  </div>
                  <div css={s.infoItem}>
                    <span css={s.label}>닉네임:</span>
                    <span>{selectedUser.nickname}</span>
                  </div>
                  <div css={s.infoItem}>
                    <span css={s.label}>이름:</span>
                    <span>{selectedUser.fullName}</span>
                  </div>
                  <div css={s.infoItem}>
                    <span css={s.label}>나이:</span>
                    <span>{calculateAge(selectedUser.birthDate)}</span>
                  </div>
                  <div css={s.infoItem}>
                    <span css={s.label}>등록일:</span>
                    <span>
                      {new Date(selectedUser.createdAt).toLocaleDateString(
                        "ko-KR"
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div css={s.infoSection}>
                <h4>자기소개</h4>
                <div css={s.introContent}>{selectedUser.content}</div>
              </div>

              <div css={s.infoSection}>
                <h4>
                  신고 이력
                  {reports && reports.length > 0 && (
                    <span css={s.warningBadge}>주의 필요</span>
                  )}
                </h4>
                <div css={s.reportHistory}>
                  {reports && reports.length > 0 ? (
                    <div css={s.reportItem}>
                      {reports.map((report, index) => (
                        <div key={index} css={s.reportDetail}>
                          <div css={s.reportDate}>
                            <strong>신고일:</strong>{" "}
                            {new Date(report.createdAt).toLocaleDateString(
                              "ko-KR"
                            )}
                          </div>
                          <div css={s.reportReason}>
                            <strong>신고 사유:</strong> {report.reason?.reason}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div css={s.noReports}>신고 이력이 없습니다.</div>
                  )}
                </div>
              </div>
            </div>

            <div css={s.modalActions}>
              {selectedUser.status === "대기중" && (
                <>
                  <button
                    css={s.rejectBtn}
                    onClick={() => handleRejectOnClick(selectedUser.welcomeId)}
                  >
                    거절
                  </button>
                  <button css={s.approveBtn} onClick={handleApproveOnClick}>
                    승인
                  </button>
                </>
              )}

              {selectedUser.status === "거절" && (
                <span css={s.rejectedText}>❌ 거절된 신청입니다.</span>
              )}
              {selectedUser.status === "승인" && (
                <span css={s.approvedText}>✅ 이미 승인된 멤버입니다.</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Welcome;
