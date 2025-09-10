/** @jsxImportSource @emotion/react */
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { reqRegisterAnswer } from "../../../api/Admin/adminApi";
import Pagination from "../../../components/Pagination/Pagination";
import SearchBox from "../../../components/SearchBox/SearchBox";
import useGetAskBoardQuery from "../../../queries/Global/Ask/useGetAskBoardQuery";
import * as s from "./styles";
import MainContainer from "../../../components/MainContainer/MainContainer";

function AskAnswer() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);
  const size = 10;

  const { data, isLoading, isError, refetch } = useGetAskBoardQuery({ page, size, searchText });
  const body = data?.data?.body;
  
  const totalPages = body?.totalPages ?? 1;
  const totalElements = body?.totalElements ?? 0;
  const start = (page - 1) * size;
  const askLists = useMemo(() => body?.contents ?? [], [body]);

  const [answers, setAnswers] = useState({});
  const onChangeAnswer = (askId, v) => setAnswers((prev) => ({ ...prev, [askId]: v }));

  const handleRegister = async (askId) => {
    const content = (answers[askId] || "").trim();
    if (!content) {
      alert("내용을 입력하세요.");
      return;
    }
    try {
      await reqRegisterAnswer({ askId, content });
      alert("답변 등록 성공");
      await refetch();
    } catch (e) {
      alert(e?.response?.data?.message ?? "답변 등록 실패");
    }
  };


  const handleSearchOnClick = () => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", "1");
      p.set("searchText", searchInput);
      return p;
    });
  };

  const goPage = (next) => {
    const nextPage = Math.min(Math.max(1, next), totalPages);
    setSearchParams({ page: String(nextPage), searchText });
  };

  if (isLoading) return <MainContainer>불러오는 중…</MainContainer>;
  if (isError) return <MainContainer>문제가 발생했어요.</MainContainer>;

  return (
    <div css={s.container}>
      <h2>문의 관리 (Admin)</h2>
      <SearchBox
        value={searchInput}
        onChange={setSearchInput}
        onSearch={handleSearchOnClick}
      />

      <table css={s.table}>
        <thead>
          <tr>
            <th css={s.th}>번호</th>
            <th css={s.th}>제목</th>
            <th css={s.th}>작성자</th>
            <th css={s.th}>등록일</th>
            <th css={s.th}>답변</th>
            <th css={s.th}>상태</th>
          </tr>
        </thead>
        <tbody>
          {askLists.map((board, index) => {
            const number = totalElements - (start + index);
            const askId = board.askId;

            const authorName =
              board?.user?.fullName ??
              board?.user?.nickname ??
              board?.nickname ??
              "-";

            const createdAtText = board?.createdAt
              ? new Date(board.createdAt).toLocaleString("ko-KR", {
                dateStyle: "medium",
                timeStyle: "short",
              })
              : "";

            const value = answers[askId] ?? "";

            return (
              <tr key={askId} css={s.tr}>
                <td css={s.td}>{number}</td>

                <td
                  css={s.tdTitle}
                  style={{ cursor: "pointer" }}
                  title="문의 상세 보기"
                  onClick={() => navigate(`/ask/${askId}`)}
                >
                  {board.title}
                </td>

                <td css={s.td}>{authorName}</td>
                <td css={s.td}>{createdAtText}</td>

                <td css={s.tdInputGroup}>
                  <input
                    type="text"
                    placeholder="답변 내용을 입력하세요"
                    value={value}
                    onChange={(e) => onChangeAnswer(askId, e.target.value)}
                  />
                  <button css={s.registerButton} onClick={() => handleRegister(askId)}>
                    등록
                  </button>
                </td>
                <td css={s.td}>{board.isAnswer ? "답변완료" : "대기"}</td>
              </tr>
            );
          })}

          {askLists.length === 0 && (
            <tr>
              <td className={s.td} colSpan={6} style={{ textAlign: "center", color: "#888" }}>
                문의가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => goPage(p)}
        windowSize={1}
      />
    </div>
  );
}

export default AskAnswer;
