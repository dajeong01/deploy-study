/** @jsxImportSource @emotion/react */
import { useCallback, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/axios";
import { reqRegisterNotice } from "../../../../api/Crew/noticeApi";
import * as s from "./styles";
import { useCrewStore } from "../../../../stores/useCrewStroes";

function NoticeReg() {
  const { crewId } = useCrewStore();
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const [title, setTitle] = useState("");
  const [quillValue, setQuillValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const scrollCursorIntoView = useCallback(() => {
    const quill = quillRef.current?.getEditor?.();
    if (!quill) return;

    requestAnimationFrame(() => {
      const sel = quill.getSelection();
      if (!sel) return;

      const editorRoot = quill.root;
      const scrollEl = editorRoot.parentElement;
      const b = quill.getBounds(sel.index, sel.length || 0);
      const pad = 16;

      const viewTop = scrollEl.scrollTop;
      const viewBottom = viewTop + scrollEl.clientHeight;

      if (b.bottom > viewBottom - pad) {
        scrollEl.scrollTop = b.bottom - scrollEl.clientHeight + pad;
      } else if (b.top < viewTop + pad) {
        scrollEl.scrollTop = Math.max(0, b.top - pad);
      }
    });
  }, []);

  const imageHandler = useCallback(() => {
    const quill = quillRef.current?.getEditor?.();
    if (!quill) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("imageConfigName", "crewNoticeBoard");
      formData.append("file", file);

      try {
        const res = await api.post("/api/images", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const url = res?.data?.body;
        if (!url) return;

        quill.focus();
        let range = quill.getSelection(true);

        const prevChar = quill.getText(Math.max(range.index - 1, 0), 1);
        if (prevChar && prevChar !== "\n") {
          quill.insertText(range.index, "\n");
          range = { index: range.index + 1, length: 0 };
        }

        quill.insertEmbed(range.index, "image", url);
        quill.insertText(range.index + 1, "\n");
        quill.setSelection(range.index + 2, 0);
        quill.focus();
        requestAnimationFrame(() => {
          const sel = quill.getSelection();
          if (!sel) return;
          const b = quill.getBounds(sel.index, sel.length || 0);
          const ed = quill.root;
          const pad = 16;
          const viewTop = ed.scrollTop;
          const viewBottom = viewTop + ed.clientHeight;
          if (b.bottom > viewBottom - pad) ed.scrollTop = b.bottom - ed.clientHeight + pad;
          else if (b.top < viewTop + pad) ed.scrollTop = Math.max(0, b.top - pad);
        });

        scrollCursorIntoView();
      } catch (_) { }
    };
  }, [scrollCursorIntoView]);

  const isContentEmpty = useCallback((html) => {
    const hasImg = /<img[^>]*src=/.test(html);
    const text = html
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
    return !hasImg && text.length === 0;
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!title.trim()) return alert("제목을 입력해 주세요.");
    if (isContentEmpty(quillValue)) return alert("내용을 입력해 주세요.");

    setSubmitting(true);
    try {
      await reqRegisterNotice({ crewId, title, content: quillValue });
      alert("등록되었습니다.");
      navigate("..");
    } catch (e) {
      alert("등록 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }, [crewId, title, quillValue, isContentEmpty, navigate]);

  return (
    <div css={s.wrap}>
      <div css={s.titleRow}>
        <input css={s.titleInput} type="text" placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={255} />
      </div>
      <div css={[s.quillBox]}>
        <ReactQuill
          ref={quillRef}
          className="quillRoot"
          style={{ height: "100%" }}
          theme="snow"
          value={quillValue}
          onChange={setQuillValue}
          modules={{
            toolbar: {
              container: [[{ header: [false, 1, 2, 3] }], ["bold", "italic", "underline", "strike"], [{ align: [] }], ["blockquote", "link", "image"]],
              handlers: { image: imageHandler },
            },
          }}
        />
      </div>

      <div css={s.submitRow}>
        <button css={s.cancleBtn} onClick={() => navigate(-1)}>취소</button>
        <button css={s.submitBtn} onClick={handleSubmit} disabled={submitting}>
          {submitting ? "등록 중..." : "등록"}
        </button>
      </div>
    </div>
  );
}

export default NoticeReg;
