/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainContainer from "../../components/MainContainer/MainContainer";
import Pagination from "../../components/Pagination/Pagination";
import SearchBox from "../../components/SearchBox/SearchBox";
import useGetGlobalRoleAdminQuery from "../../queries/Admin/useGetGlobalRoleAdminQuery";
import useGetGlobalNotoiceQuery from "../../queries/Global/Notice/useGetGlobalNoticeQuery";
import usePrincipalQuery from "../../queries/User/usePrincipalQuery";
import * as s from "./styles";


function GlobalNotice() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);
  const size = 10;

  const { data: principalData, isSuccess: isPrincipalReady } = usePrincipalQuery();
  const userId = principalData?.data?.body?.user?.userId;

  const { data: roleData } = useGetGlobalRoleAdminQuery();
  const isAdmin = (roleData === 'ROLE_ADMIN');

  const { data, isLoading, isError } = useGetGlobalNotoiceQuery({
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
  const start = (page - 1) * size;
  const noticeList = useMemo(() => body?.contents ?? [], [body]);

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
    <MainContainer>
      <div css={s.container}>
        <h2>공지사항</h2>

        <SearchBox
          value={searchInput}
          onChange={setSearchInput}
          onSearch={handleSearchOnClick}
        >
          {isAdmin && (
            <button css={s.registerButton} onClick={() => navigate('/notice/register')}>공지 등록</button>
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
                onClick={() => navigate(`./${notice.noticeId}`)}
                css={s.tr}
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
    </MainContainer>
  );
}

export default GlobalNotice;