/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import sanitizeHtml from "sanitize-html";
import { reqDeleteNotice } from '../../../../api/Crew/noticeApi';
import useGetCrewNoticeDetailQuery from '../../../../queries/Crew/Notice/useGetCrewNoticeDetailQuery';
import usePrincipalQuery from '../../../../queries/User/usePrincipalQuery';
import { useCrewStore } from '../../../../stores/useCrewStroes';
import * as s from './styles';


export default function NoticeDetail() {
  const { crewId } = useCrewStore();
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const principalQuery = usePrincipalQuery();

  const principalId =
    principalQuery?.data?.data?.body?.user?.userId ??
    principalQuery?.data?.body?.user?.userId ??
    null;

  const { data, isLoading, error } = useGetCrewNoticeDetailQuery({ crewId, noticeId });
  const post = useMemo(() => {
    const body = data?.data?.body ?? data?.body;
    return Array.isArray(body) ? body[0] : body;
  }, [data]);


  if (isLoading) return <div css={s.layout}>로딩중…</div>;
  if (error) return <div css={s.layout}>에러가 발생했어요: {String(error)}</div>;
  if (!post) return <div css={s.layout}>공지글을 찾을 수 없어요.</div>;

  const authorId = post?.user?.userId ?? post?.userId ?? null;
  const isAuthor =
    principalId != null && authorId != null && Number(principalId) === Number(authorId);

  const cleanHtml = sanitizeHtml(post.content ?? "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: { a: ["href", "name", "target", "rel"], img: ["src", "alt"] },
    transformTags: {
      a: (tagName, attribs) => ({ tagName, attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" } }),
    },
  });

  const goEdit = () => navigate(`/crews/${crewId}/notices/${noticeId}/edit`);

  const handleDeleteOnClick = async () => {
    if (!window.confirm("정말 이 공지글을 삭제할까요?")) return;
    try {
      await reqDeleteNotice(crewId, noticeId);
      alert("삭제되었습니다.");
      navigate(`/crews/${crewId}/notices`, { replace: true });
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div css={s.layout}>
      <div css={s.topBar}>
        <button onClick={() => navigate(-1)}>← 목록</button>
      </div>

      <h1 css={s.titleCss}>{post.title}</h1>

      <div css={s.metaCss}>
        <span>{post.user?.nickname ?? "익명"}</span>
        <span className="dot" />
        <span>{post.createdAt ? new Date(post.createdAt).toLocaleString() : "-"}</span>
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
  );
}