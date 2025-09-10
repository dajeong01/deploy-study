/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import { IoIosLock } from 'react-icons/io';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainContainer from '../../components/MainContainer/MainContainer';
import Pagination from '../../components/Pagination/Pagination';
import SearchBox from '../../components/SearchBox/SearchBox';
import useGetAskBoardQuery from '../../queries/Global/Ask/useGetAskBoardQuery';
import usePrincipalQuery from '../../queries/User/usePrincipalQuery';
import * as s from './styles';
import Button from '../../components/Button/Button';

function Ask() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const searchText = searchParams.get('searchText') || '';
  const [searchInput, setSearchInput] = useState(searchText);
  const size = 10;

  const { data: principalData } = usePrincipalQuery();
  const userId = principalData?.data?.body?.user?.userId;

  const { data, isLoading, isError } = useGetAskBoardQuery({ page, size, searchText });
  const body = data?.data?.body;
  const totalPages = body?.totalPages ?? 1;
  const totalElements = body?.totalElements ?? 0;
  const start = (page - 1) * size;

  const askLists = useMemo(() => body?.contents ?? [], [body]);

  const handleSearchOnClick = () => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set('page', '1');
      p.set('searchText', searchInput);
      return p;
    });
  };

  if (isLoading) return <div>불러오는 중…</div>;
  if (isError) return <div>문제가 발생했어요.</div>;

  const goPage = (next) => {
    const nextPage = Math.min(Math.max(1, next), totalPages);
    setSearchParams({ page: nextPage, searchText });
  };

  const isMine = (b) => Number(b?.user?.userId ?? b?.userId) === Number(userId);

  const handleRowClick = (board) => {
    if (!board?.askId) return;
    if (!isMine(board)) {
      alert('본인이 작성한 문의만 열람할 수 있습니다.');
      return;
    }
    navigate(`/ask/${board.askId}`);
  };

  return (
    <MainContainer>
      <div css={s.container}>
        <h2>문의사항</h2>

        <SearchBox
          value={searchInput}
          onChange={setSearchInput}
          onSearch={handleSearchOnClick}
          >
          <Button onClick={() => {
            if (!userId) {
              alert('회원가입한 유저만 등록할 수 있습니다.');
              navigate('/');
              return;
            }
            navigate('/ask/register');
          }}>
            문의사항 등록
          </Button>
        </SearchBox>
        <table css={s.table}>
          <thead>
            <tr>
              <th css={s.th}>번호</th>
              <th css={s.th}>제목</th>
              <th css={s.th}>작성자</th>
              <th css={s.th}>등록일</th>
              <th css={s.th}>답변 유/무</th>
            </tr>
          </thead>
          <tbody>
            {askLists.map((board, index) => {
              const mine = isMine(board);
              const number = totalElements - (start + index); // 최신이 큰 번호
              const nickname = board?.user?.nickname ?? board?.nickname ?? '-';

              return (
                <tr
                  key={board.askId}
                  css={s.tr}
                  onClick={() => handleRowClick(board)}
                  style={{ cursor: mine ? 'pointer' : 'not-allowed', opacity: mine ? 1 : 0.95 }}
                  title={mine ? '열람 가능' : '본인 글만 열람 가능'}
                >
                  <td css={s.td}>{number}</td>
                  <td css={s.tdTitle} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {!mine && <IoIosLock aria-label="locked" />}
                    <span>{board.title}</span>
                  </td>
                  <td css={s.td}>{nickname}</td>
                  <td css={s.td}>{new Date(board.createdAt).toLocaleString("ko-KR")}</td>
                  <td css={s.td}>{board.isAnswer ? 'Y' : 'N'}</td>
                </tr>
              );
            })}

            {askLists.length === 0 && (
              <tr>
                <td className={s.td} colSpan={5} style={{ textAlign: 'center', color: '#888' }}>
                  문의가 없습니다.
                </td>
              </tr>
            )}
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

export default Ask;
