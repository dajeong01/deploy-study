import { useState } from "react";
import useGetReportListQuery from "../../../queries/User/useGetReportListQuery";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import MemberModal from "../Member/MemberModal/MemberModal";
import ContentLayout from "../../../components/ContentLayout/ContentLayout";
import { useCrewStore } from "../../../stores/useCrewStroes";

function Report({ isCrewLeader }) {
  const { crewId } = useCrewStore();
  const isEnabled = !!crewId && !!isCrewLeader;
  const { data } = useGetReportListQuery({
    crewId,
    enabled: isEnabled,
  });
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  if (!isCrewLeader) return null;

  const reportList = data?.body ?? [];

  const handlePickMember = (memberId) => {
    if (!memberId) return;
    setSelectedMemberId(memberId);
  };

  return (
    <div css={s.mainBox}>
      <h2>신고 사항</h2>
      <table css={s.table}>
        <thead>
          <tr>
            <th css={s.th}>신고자</th>
            <th css={s.th}>피신고자</th>
            <th css={s.th}>사유</th>
            <th css={s.th}>신고 시각</th>
          </tr>
        </thead>
        <tbody>
          {reportList.length === 0 ? (
            <tr>
              <td css={s.td} colSpan={4}>신고 내역이 없습니다.</td>
            </tr>
          ) : (
            reportList.map((r) => (
              <tr key={r.reportId}>
                <td 
                  css={[s.td, s.clickableRow]} 
                  onClick={() => handlePickMember(r.reportMemberId)} 
                  title="신고자 정보 보기"
                >
                  {r.reporterUser === null ? "탈퇴한 유저입니다." : r.reporterUser?.fullName}
                </td>
                <td 
                  css={[s.td, s.clickableRow]} 
                  onClick={() => handlePickMember(r.reportedMemberId)} 
                  title="피신고자 정보 보기"
                >
                  {r.reportedUser?.fullName}
                </td>
                <td css={s.td}>{r.reason}</td>
                <td css={s.td}>{r.createdAt ? new Date(r.createdAt).toLocaleString() : "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedMemberId && (
        <MemberModal
        memberId={selectedMemberId}
        isOpen={!!selectedMemberId}
        isLeader={isCrewLeader}
        onClose={() => setSelectedMemberId(null)}
        onChanged={() => {
          setSelectedMemberId(null);
        }}
        onReport={() => {}}
        />
      )}
    </div>
  );
}
export default Report;