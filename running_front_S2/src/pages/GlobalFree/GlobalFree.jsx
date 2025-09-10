/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainContainer from '../../components/MainContainer/MainContainer';
import Pagination from '../../components/Pagination/Pagination';
import SearchBox from '../../components/SearchBox/SearchBox';
import useGetGlobalBoardQuery from '../../queries/Global/FreeBoard/useGetGlobalFreeBoardQuery';
import usePrincipalQuery from '../../queries/User/usePrincipalQuery';
import * as s from './styles';
import Button from '../../components/Button/Button';

function GlobalFree(props) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);
  const size = 10;
  const { data: principalData } = usePrincipalQuery();
  const userId = principalData?.data?.body?.user?.userId;

  const { data, isLoading, isError } = useGetGlobalBoardQuery({ page, size, searchText });

  const body = data?.data?.body;
  const totalPages = body?.totalPages ?? 1;
  const totalElements = body?.totalElements ?? 0;
  const start = (page - 1) * size;
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
    if (!userId) {
      alert('회원가입한 유저만 등록할 수 있습니다.');
      navigate('/');
      return;
    }
    navigate('/free/register');
  };

  const handlePostOnClick = (freeId) => {
    if (!freeId) return;
    navigate(`/free/${freeId}`);
  };


  return (
    <MainContainer>
      <div css={s.container}>
        <h2>자유게시판</h2>
        <SearchBox
          value={searchInput}
          onChange={setSearchInput}
          onSearch={handleSearchOnClick}
          >
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
                <td css={s.tdTitle} data-label="제목">{board.title}</td>
                <td css={s.td} data-label="작성자">{board?.user?.nickname}</td>
                <td css={s.td} data-label="날짜">{new Date(board.createdAt).toLocaleString("ko-KR")}</td>
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

export default GlobalFree;