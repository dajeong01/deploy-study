/** @jsxImportSource @emotion/react */
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import {
  reqDeleteComment,
  reqDeleteFree,
  reqRegisterComment,
  reqUpdateFreeComment,
} from "../../../../api/Crew/freeboardApi";
import useGetCrewFreeBoardDetailQuery from "../../../../queries/Crew/FreeBoard/useGetCrewFreeBoardDetailQuery";
import useGetCrewFreeCommentQuery from "../../../../queries/Crew/FreeBoard/useGetCrewFreeCommentQuery";
import usePrincipalQuery from "../../../../queries/User/usePrincipalQuery";
import { useCrewStore } from "../../../../stores/useCrewStroes";
import * as s from "./styles";
import Button from "../../../../components/Button/Button";

export default function FeedDetail() {
  const { crewId } = useCrewStore();
  const { freeId } = useParams();
  const navigate = useNavigate();

  const principalQuery = usePrincipalQuery();
  const principalId =
    principalQuery?.data?.data?.body?.user?.userId ??
    principalQuery?.data?.body?.user?.userId ?? null;


  const {
    data,
    isLoading,
    error,
    refetch: refetchDetail,
  } = useGetCrewFreeBoardDetailQuery({ crewId, freeId });

  const {
    data: cdata,
    isLoading: cLoading,
    isError: cError,
    refetch: refetchComments,
  } = useGetCrewFreeCommentQuery(crewId, freeId);

  const [comment, setComment] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentValue, setEditCommentValue] = useState("");


  const post = useMemo(() => {
    const body = data?.data?.body ?? data?.body;
    return Array.isArray(body) ? body[0] : body;
  }, [data]);

  const commentList =
    cdata?.data?.data?.body ?? cdata?.data?.body ?? cdata?.body ?? [];

  if (isLoading) return <div css={s.layout}>로딩중…</div>;
  if (error) return <div css={s.layout}>에러가 발생했어요: {String(error)}</div>;
  if (!post) return <div css={s.layout}>게시글을 찾을 수 없어요.</div>;

  const authorId = post?.user?.userId ?? post?.userId ?? null;
  const isAuthor =
    principalId != null && authorId != null && Number(principalId) === Number(authorId);

  const INITIAL_COUNT = 5;
  const displayedComments = showAll ? commentList : commentList.slice(0, INITIAL_COUNT);

  const cleanHtml = sanitizeHtml(post.content ?? "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: { a: ["href", "name", "target", "rel"], img: ["src", "alt"] },
    transformTags: {
      a: (tag, attribs) => ({
        tagName: tag,
        attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" },
      }),
    },
  });

  const goEdit = () => navigate(`/crews/${crewId}/freeBoards/${freeId}/edit`);

  const handleDeleteOnClick = async () => {
    if (!window.confirm("정말 이 게시글을 삭제할까요?")) return;
    try {
      await reqDeleteFree(crewId, freeId);
      alert("삭제되었습니다.");
      navigate(`/crews/${crewId}/freeBoards`, { replace: true });
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleCommentOnClick = async () => {
    const text = comment.trim();
    if (!text) return alert("댓글을 입력해주세요.");
    try {
      await reqRegisterComment(text, crewId, freeId);
      setComment("");
      await refetchComments();
      // setShowAll(true); 
    } catch (e) {
      console.error(e);
      alert("댓글 등록 중 오류가 발생했습니다.");
    }
  };


  const startEditComment = (c) => {
    setEditingCommentId(c.freeCommentId);
    setEditCommentValue(c.content ?? "");
  };
  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditCommentValue("");
  };

  const saveEditComment = async () => {
    const content = editCommentValue.trim();
    if (!content) return alert("수정할 내용을 입력해주세요.");
    try {
      await reqUpdateFreeComment(crewId, freeId, editingCommentId, content);
      await refetchComments();
      setEditingCommentId(null);
      setEditCommentValue("");
      alert("댓글이 수정되었습니다.");
    } catch (e) {
      console.error(e);
      alert("댓글 수정 중 오류가 발생했습니다.");
    }
  };

  const deleteComment = async (freeCommentId) => {
    if (!window.confirm("정말 이 댓글을 삭제할까요?")) return;
    try {
      await reqDeleteComment(crewId, freeId, freeCommentId);
      await refetchComments();
    } catch (e) {
      console.error(e);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    }
  };


  return (
    <div css={s.layout}>
      <div>
        <div css={s.topBar}>
          <button onClick={() => navigate(-1)}>← 목록</button>
        </div>

        <h1 css={s.titleCss}>{post.title}</h1>
        <div css={s.metaCss}>
          <span>{post.user?.nickname ?? "익명"}</span>
          <span className="dot" />
          <span>{post.createdAt ? new Date(post.createdAt).toLocaleString("ko-KR") : "-"}</span>
          {isAuthor && (
            <>
              <span className="dot" />
              <button onClick={goEdit}>수정</button>
              <button onClick={handleDeleteOnClick}>삭제</button>
            </>
          )}
        </div>

        <div css={s.contentCss} dangerouslySetInnerHTML={{ __html: cleanHtml }} />
      </div>

      <div>
        <div css={s.inputRow}>
          <input
            css={s.input}
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력하세요"
          />
          <Button onClick={handleCommentOnClick}>
            등록
          </Button>
        </div>

        {/* 댓글 목록 */}
        <div css={s.commentList}>
          {cLoading && <div>댓글 불러오는 중…</div>}
          {cError && <div>댓글을 불러오지 못했습니다.</div>}

          {displayedComments.map((c) => {
            const cAuthorId = c?.user?.userId ?? c?.userId;
            const isMyComment =
              principalId != null && cAuthorId != null && Number(principalId) === Number(cAuthorId);
            const isEditingThis = editingCommentId === c.freeCommentId;

            return (
              <div key={c.freeCommentId} css={s.commentItem}>
                <div css={s.avatar}>
                  <img src={c?.user?.picture} alt="" />
                </div>
                <div css={s.commentBody}>
                  <div className="head">
                    <strong>{c?.user?.nickname ?? "익명"}</strong>
                    <time>{c?.createdAt ? new Date(c.createdAt).toLocaleString() : ""}</time>
                    <span css={s.headSpacer} />
                    {isMyComment && !isEditingThis && (
                      <>
                        <button onClick={() => startEditComment(c)}>수정</button>
                        <button onClick={() => deleteComment(c.freeCommentId)}>삭제</button>
                      </>
                    )}
                  </div>

                  {isEditingThis ? (
                    <div css={s.editRow}>
                      <input
                        value={editCommentValue}
                        onChange={(e) => setEditCommentValue(e.target.value)}
                        placeholder="수정할 내용을 입력하세요"
                      />
                      <button css={s.btnPrimary} onClick={saveEditComment}>
                        수정 완료
                      </button>
                      <button css={s.btnOutline} onClick={cancelEditComment}>
                        취소
                      </button>
                    </div>
                  ) : (
                    <div className="content">{c.content}</div>
                  )}
                </div>
              </div>
            );
          })}

          {/* 댓글 더 보기 */}
          {commentList.length > INITIAL_COUNT && (
            <div css={s.moreRow}>
              <button css={s.moreBtn} onClick={() => setShowAll((v) => !v)}>
                {showAll ? "접기" : `댓글 더 보기 (${commentList.length - INITIAL_COUNT}개)`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}