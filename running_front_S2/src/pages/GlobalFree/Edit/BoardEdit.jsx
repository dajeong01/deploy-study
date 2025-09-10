/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import { reqUpdateGlobalFreeBoard } from "../../../api/GlobalFree/globalFreeApi";
import MainContainer from "../../../components/MainContainer/MainContainer";
import useGetGlobalFreeBoardDetailQuery from "../../../queries/Global/FreeBoard/useGetGlobalFreeBoardDetailQuery";
import usePrincipalQuery from "../../../queries/User/usePrincipalQuery";
import * as s from './styles';

function BoardEdit() {
    const { freeId } = useParams();
    const navigate = useNavigate();
    const quillRef = useRef(null);

    const principalQuery = usePrincipalQuery();
    const principalId = principalQuery?.data?.data?.body?.user?.userId ?? null;

    const { data, isLoading, error } = useGetGlobalFreeBoardDetailQuery({ freeId });

    const post = useMemo(() => {
        const body = data?.data?.body ?? data?.body;
        return Array.isArray(body) ? body[0] : body;
    }, [data]);

    const authorId = post?.user?.userId ?? post?.userId ?? null;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState(""); // quill value

    useEffect(() => {
        if (post) {
            setTitle(post.title ?? "");
            setContent(post.content ?? "");
        }
    }, [post]);

    useEffect(() => {
        if (authorId != null && principalId != null && Number(authorId) !== Number(principalId)) {
            alert("작성자만 수정할 수 있습니다.");
            navigate(-1);
        }
    }, [authorId, principalId, navigate]);

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
            formData.append("imageConfigName", "globalFreeBoard");
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
            } catch (e) {
                console.error(e);
                alert("이미지 업로드 중 오류가 발생했습니다.");
            }
        };
    }, []);

    const isContentEmpty = useCallback((html) => {
        const hasImg = /<img[^>]*src=/.test(html);
        const text = html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
        return !hasImg && text.length === 0;
    }, []);

    const handleSave = async () => {
        const t = title.trim();
        if (!t) return alert("제목을 입력해주세요.");
        if (isContentEmpty(content)) return alert("내용을 입력해주세요.");

        try {
            await reqUpdateGlobalFreeBoard({ freeId, title, content });
            alert("수정되었습니다.");
            navigate(`/free/${freeId}`);
        } catch (e) {
            console.error(e);
            alert("수정 중 오류가 발생했습니다.");
        }
    };

    if (isLoading) return <div>로딩중…</div>;
    if (error) return <div>에러가 발생했어요: {String(error)}</div>;
    if (!post) return <div>게시글을 찾을 수 없어요.</div>;

    return (
        <MainContainer>
            <div css={s.wrap}>
                <h2 css={s.titleRow}>게시글 수정</h2>
                <input
                    css={s.titleInput}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력하세요"
                />

                <div css={[s.quillBox]}>
                    <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={{
                            toolbar: {
                                container: [
                                    [{ header: [false, 1, 2, 3] }],
                                    ["bold", "italic", "underline", "strike"],
                                    [{ align: [] }],
                                    ["blockquote", "link", "image"],
                                ],
                                handlers: { image: imageHandler },
                            },
                        }}
                    />
                </div>

                <div css={s.submitRow}>
                    <button css={s.cancleBtn} onClick={() => navigate(-1)}>취소</button>
                    <button css={s.submitBtn} onClick={handleSave}>저장</button>
                </div>
            </div>
        </MainContainer>
    );
}

export default BoardEdit;
