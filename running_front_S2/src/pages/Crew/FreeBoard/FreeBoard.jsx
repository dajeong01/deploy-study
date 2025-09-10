/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useMemo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGetCrewFreeBoardQuery from "../../../queries/Crew/FreeBoard/useGetCrewFreeBoardQuery";
import { IoSearch } from "react-icons/io5";
import usePrincipalQuery from "../../../queries/User/usePrincipalQuery";
import useGetCrewRoleQuery from "../../../queries/Crew/useGetCrewRoleQuery";
import { useCrewStore } from "../../../stores/useCrewStroes";
import Pagination from "../../../components/Pagination/Pagination";
import Button from "../../../components/Button/Button";
import SearchBox from "../../../components/SearchBox/SearchBox";

function FreeBoard() {
  const { crewId } = useCrewStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);
  const size = 10;
  const { data: principalData, isPLoading } = usePrincipalQuery();
  const userId = principalData?.data?.body?.user?.userId;
  const CrewRoleQuery = useGetCrewRoleQuery(userId);

  const crewRole = CrewRoleQuery?.data?.some((role) => role.crewId === Number(crewId));

  const isCrewMember = !!crewRole;

  useEffect(() => {
    if (!isPLoading) {
      const userId = principalData?.data?.body?.user?.userId;

      if (!userId) {
        alert("로그인 후 이용 부탁드립니다.");
        navigate("/auth/oauth2/signin");
      }
    }
  }, [principalData, navigate]);

  const { data, isLoading, isError } = useGetCrewFreeBoardQuery({ crewId, page, size, searchText });
  const body = data?.data?.body;
  const totalPages = body?.totalPages ?? 1;
  const totalElements = body?.totalElements ?? 0;
  const freeLists = useMemo(() => body?.contents ?? [], [body]);
  const handleSearchOnClick = () => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", "1");
      p.set("searchText", searchInput);
      return p;
    });
  };

  if (isLoading) return <div>불러오는 중…</div>;
  if (isError) return <div>문제가 발생했어요.</div>;

  const goPage = (next) => {
    const nextPage = Math.min(Math.max(1, next), totalPages);
    setSearchParams({ page: nextPage, searchText });
  };

  const handleRegisterOnClick = () => {
    if (!isCrewMember) {
      alert('크루 멤버만 접근 가능합니다. 크루에 가입해주세요.');
      navigate(`/crews/${crewId}`);
      return;
    }
    navigate(`./register`);
  }

  const handlePostOnClick = (freeId) => {
    if (!isCrewMember) {
      alert('크루 멤버만 접근 가능합니다. 크루에 가입해주세요.');
      navigate(`/crews/${crewId}`);
      return;
    }
    if (!freeId) return;
    navigate(`./${freeId}`);
  };

  const start = (page - 1) * size;

  return (
    <div css={s.container}>
      <h2>자유게시판</h2>
      <SearchBox value={searchInput} onChange={setSearchInput} onSearch={handleSearchOnClick}>
        <Button onClick={handleRegisterOnClick}>
          게시글 등록
        </Button>
      </SearchBox>

      <table css={s.table}>
        <thead>
          <tr>
            <th css={s.th}>번호</th>
            <th css={s.th}>제목</th>
            <th css={s.th}>작성자</th>
            <th css={s.th}>등록일</th>
          </tr>
        </thead>
        <tbody>
          {freeLists.map((board, index) => (
            <tr key={board.freeId} css={s.tr} onClick={() => handlePostOnClick(board.freeId)}>
              <td css={s.td}>{totalElements - (start + index)}</td>
              <td css={s.tdTitle}>{board.title}</td>
              <td css={s.td}>{board?.user?.nickname}</td>
              <td css={s.td}>{new Date(board.createdAt).toLocaleString("ko-KR")}</td>
            </tr>
          ))}
        </tbody>

      </table>
      <Pagination
        page={page}                // 1-base 현재 페이지
        totalPages={totalPages}    // 총 페이지 수
        onChange={(p) => goPage(p)}// 페이지 변경 핸들러
        windowSize={1}
      />
    </div>
  );
}

export default FreeBoard;
