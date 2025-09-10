/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import * as s from "./styles";
import { reqPostCrewMessage } from "../../../../api/Admin/adminApi";


function MessageSendModal({ open, onClose, crewId, onSent }) {
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => { if (!open) setText(""); }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = async () => {
    const content = text.trim();
    if (!content) { alert("메시지를 입력하세요."); return; }
    try {
      setPending(true);
      await reqPostCrewMessage(crewId, content);
      onSent?.();
      onClose?.();
    } catch (e) {
      console.error(e);
      alert("메시지 전송에 실패했습니다.");
    } finally {
      setPending(false);
    }
  };

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return createPortal(
    <div css={s.backdrop} onClick={onBackdropClick} role="presentation">
      <div css={s.modal} role="dialog" aria-modal="true" aria-labelledby="msg-modal-title">
        <div css={s.headerRow}>
          <h3 id="msg-modal-title" css={s.title}>크루에게 메시지 보내기</h3>
          <button type="button" css={s.closeBtn} onClick={onClose} aria-label="닫기">×</button>
        </div>

        <div css={s.meta}>크루 ID: {String(crewId)}</div>

        <textarea
          css={s.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="내용을 입력하세요. (Ctrl/⌘+Enter 전송)"
          rows={5}
        />

        <div css={s.footer}>
          <button type="button" css={s.submitBtn} onClick={onClose} disabled={pending}>취소</button>
          <button type="button" css={s.cancelBtn} onClick={submit} disabled={pending || !text.trim()}>
            {pending ? "전송중..." : "보내기"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default MessageSendModal;
