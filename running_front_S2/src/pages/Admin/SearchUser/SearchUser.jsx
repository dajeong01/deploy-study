/** @jsxImportSource @emotion/react */
import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import SearchBox from "../../../components/SearchBox/SearchBox";
import useSearchUserQuery from "../../../queries/Admin/useSearchUserQuery";
import * as s from "./styles";
import UserDetailModal from "./UserDetailModal/UserDetailModal";
import Button from "../../../components/Button/Button";

function SearchUser() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);
  const [selectedUser, setSelectedUser] = useState(null);

  const searchUserQuery = useSearchUserQuery({ page, size: 9, searchText });

  const clearFilters = useCallback(() => {
    setSearchParams({}, { replace: true }); 
  }, [setSearchParams]);

  const handleModalClose = useCallback(() => {
    setSelectedUser(null);
    clearFilters();
    searchUserQuery.refetch();
  }, [clearFilters, searchUserQuery]);

  const handleSearchOnClick = useCallback(() => {
    setSearchParams({ page: 1, searchText: searchInput });
  }, [setSearchParams, searchInput]);

  const goPage = useCallback((next, totalPages) => {
    const nextPage = Math.min(Math.max(1, next), totalPages);
    setSearchParams({ page: nextPage, searchText });
  }, [setSearchParams, searchText]);

  const { isLoading, isError, error, data } = searchUserQuery;
  const users = data?.data?.body?.contents ?? [];
  const totalPages = data?.data?.body?.totalPages ?? 1;

  let body;
  if (isLoading) {
    body = <div>Loading...</div>;
  } else if (isError) {
    body = <div>Error: {error.message}</div>;
  } else {
    body = (
      <>
        <div css={s.tableWrapper}>
          <table css={s.table}>
            <thead>
              <tr>
                <th>No</th><th>성명</th><th>프로필 사진</th><th>사용자이름</th>
                <th>이메일</th><th>주소</th><th>전화번호</th><th>상세보기</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan="8">검색 결과가 없습니다.</td></tr>
              ) : users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.fullName}</td>
                  <td>
                    <img
                      src={user.picture}
                      alt={user.fullName}
                      css={s.thumbnail}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </td>
                  <td>{user.nickname}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    <Button onClick={() => setSelectedUser(user)}>
                      상세보기
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div css={s.paginationWrapper}>
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={(p) => goPage(p, totalPages)}
            windowSize={1}
          />
        </div>
      </>
    );
  }

  return (
    <div css={s.container}>
      <SearchBox
        value={searchInput}
        onChange={setSearchInput}
        onSearch={handleSearchOnClick}
      />

      {body}

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={handleModalClose}
          onSave={(newUser) => setSelectedUser(newUser)}
        />
      )}
    </div>
  );
}

export default SearchUser;
