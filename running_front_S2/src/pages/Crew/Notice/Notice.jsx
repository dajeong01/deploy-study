/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePrincipalQuery from "../../../queries/User/usePrincipalQuery";
import { IoSearch } from "react-icons/io5";
import useGetCrewRoleQuery from "../../../queries/Crew/useGetCrewRoleQuery";
import { useCrewStore } from "../../../stores/useCrewStroes";
import useGetCrewNotoiceQuery from "../../../queries/Crew/Notice/useGetCrewNoticeQuery";
import Pagination from "../../../components/Pagination/Pagination";
import Button from "../../../components/Button/Button";
import SearchBox from "../../../components/SearchBox/SearchBox";

function Notice() {
  const navigate = useNavigate();
  const { crewId } = useCrewStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);
  const size = 10;

  const { data: principalData, isSuccess: isPrincipalReady } = usePrincipalQuery();
  const userId = principalData?.data?.body?.user?.userId;

  const CrewRoleQuery = useGetCrewRoleQuery(userId);
  const crewRole = CrewRoleQuery?.data?.find((role) => role.crewId === Number(crewId));

  const isCrewMember = !!crewRole;
  const canRegister = crewRole && [1, 2].includes(crewRole.roleId);

  const { data, isLoading, isError } = useGetCrewNotoiceQuery({
    crewId: Number(crewId),
    page,
    size,
    searchText,
  });


  useEffect(() => {
    if (isPrincipalReady && !userId) {
      alert("로그인 후 이용 부탁드립니다.");
      navigate("/auth/oauth2/signin");
    }
  }, [isPrincipalReady, userId, navigate]);

  const body = data?.data?.body;
  const totalPages = body?.totalPages ?? 1;
  const totalElements = body?.totalElements ?? 0;
  const noticeList = useMemo(() => body?.contents ?? [], [body]);
  const start = (page - 1) * size;

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


  return (
    <div css={s.container}>
      <h2>공지사항</h2>
      <SearchBox value={searchInput} onChange={setSearchInput} onSearch={handleSearchOnClick}>
        {canRegister && (
          <Button onClick={() => navigate(`./register`)}>
            공지글 등록
          </Button>
        )}
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
          {noticeList.map((notice, index) => (
            <tr
              key={notice.noticeId}
              onClick={isCrewMember ? () => navigate(`./${notice.noticeId}`) : undefined}
              css={s.tr(isCrewMember)}
            >
              <td css={s.td}>{totalElements - (start + index)}</td>
              <td css={s.tdTitle}>{notice.title}</td>
              <td css={s.td}>{notice?.user?.nickname}</td>
              <td css={s.td}>{new Date(notice.createdAt).toLocaleString("ko-KR")}</td>
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

export default Notice;