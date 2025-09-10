/** @jsxImportSource @emotion/react */
import { useMemo, useState } from "react";
import ReactModal from "react-modal";
import { reqReportMember } from "../../../../api/Crew/reportApi";
import * as s from "./styles";

function ReportModal({ isOpen, onClose, memberId, nickname, crewId}) {
  const [reason, setReason] = useState("");

  const modalStyles = useMemo(() => s.modalStyles, []);

  const [submitting, setSubmitting] = useState(false);

  const ReportOnClick = async () => {
    if (submitting) return;
    if (!memberId) {
      alert("신고 대상이 없습니다.");
      return;
    }
    if (!reason.trim()) {
      alert("신고 사유를 입력해주세요.");
      return;
    }

    try {
      setSubmitting(true);
      await reqReportMember({ crewId, memberId, reason });
      alert("신고가 접수되었습니다.");
      setReason("");
      onClose();
    } catch (error) {
      console.error(error);
      alert("신고 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <ReactModal isOpen={!!isOpen} onRequestClose={onClose} shouldCloseOnOverlayClick style={modalStyles}>
      <div css={s.headerStyle}>
        신고하기
      </div>

      <div css={s.contentStyle}>
        <div css={s.nicknameStyle}>닉네임: {nickname}</div>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="신고 사유를 입력하세요"
          css={s.textareaStyle}
        />
        <div css={s.buttonContainerStyle}>
          <button css={s.cancleButton}onClick={onClose}>취소</button>
          <button css={s.reportButton}onClick={ReportOnClick}>제출</button>
        </div>
      </div>
    </ReactModal>
  );
}

export default ReportModal;