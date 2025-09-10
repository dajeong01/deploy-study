/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import MainContainer from "../../../components/MainContainer/MainContainer";
import useGetAskDetailQuery from "../../../queries/Global/Ask/useGetAskDetailQuery";

function AskDetail() {
  const { askId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetAskDetailQuery({ askId });

  
  const post = useMemo(() => {
    const body = data?.body;
    return Array.isArray(body) ? body[0] : body;
  }, [data]);

  if (isLoading)
    return (
      <MainContainer>
        <div css={s.layout}>
          <div css={s.skeletonHeader} />
          <div css={s.skeletonBlock} />
          <div css={s.skeletonBlock} />
        </div>
      </MainContainer>
    );

  if (error)
    return (
      <MainContainer>
        <div css={s.layout}>에러가 발생했어요: {String(error)}</div>
      </MainContainer>
    );

  if (!post)
    return (
      <MainContainer>
        <div css={s.layout}>문의글을 찾을 수 없어요.</div>
      </MainContainer>
    );

  const askContentRaw = post.askContent ?? post.content ?? "";
  const askCreated =
    post.askCreatedAt ??
    post.createdAt ??
    null;
  const writerName = post.user?.nickname ?? post.nickname ?? "익명";

  const answerContent =
    post.answerContent ?? post.answer?.content ?? null;
  const answerCreated =
    post.answerCreatedAt ?? post.answer?.createdAt ?? null;

  const isAnswered =
    Boolean(post.isAnswer) || Boolean(answerContent);

  const cleanHtml = sanitizeHtml(askContentRaw, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt"],
    },
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" },
      }),
    },
  });

  const format = (d) =>
    d ? new Date(d).toLocaleString("ko-KR") : "-";

  return (
    <MainContainer>
      <div css={s.layout}>
        <div css={s.topBar}>
          <button css={s.backBtn} onClick={() => navigate(-1)} aria-label="목록으로">
            ← 목록
          </button>
          <div css={s.metaRight}>
            <span css={[s.stateChip, isAnswered ? s.chipAnswered : s.chipWaiting]}>
              {isAnswered ? "답변완료" : "대기"}
            </span>
            <span>글번호 #{post.askId}</span>
          </div>
        </div>

        <h1 css={s.title}>{post.title}</h1>
        <div css={s.metaRow}>
          <span>{writerName}</span>
          <span>{format(askCreated)}</span>
        </div>

        <div css={s.card}>
          <div css={s.content} dangerouslySetInnerHTML={{ __html: cleanHtml }} />
        </div>

        {answerContent && (
          <>
            <div css={s.sectionTitle}>관리자 답변</div>
            <div css={[s.card, s.answerCard]}>
              <div css={s.answerMeta}>
                <span>관리자</span>
                <span>{format(answerCreated)}</span>
              </div>
              <div css={s.answerContent}>{answerContent}</div>
            </div>
          </>
        )}
      </div>
    </MainContainer>
  );
}

export default AskDetail;