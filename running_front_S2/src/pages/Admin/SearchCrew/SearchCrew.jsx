/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useGetCrewListQuery from "../../../queries/Crew/List/useGetCrewListQuery";
import Pagination from "../../../components/Pagination/Pagination";
import CrewDetailModal from "./CrewDetailModal/CrewDetailModal";
import SearchBox from "../../../components/SearchBox/SearchBox";
import Button from "../../../components/Button/Button";

function SearchCrew() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);
  const [selectedCrew, setSelectedCrew] = useState(null);

  const crewListQuery = useGetCrewListQuery({
    page,
    size: 9,
    searchText,
    gunguId: "",
  });

  if (crewListQuery.isLoading) return <div>Loading...</div>;
  if (crewListQuery.isError) return <div>Error: {crewListQuery.error.message}</div>;

  const crews =
    crewListQuery.data?.pages?.flatMap((p) => p?.data?.body?.contents || []) || [];
  const totalPages =
    crewListQuery.data?.pages?.[0]?.data?.body?.totalPages || 1;

  const handleSearchOnChange = (e) => setSearchInput(e.target.value);

  const handleSearchOnClick = () => {
    setSearchParams({ page: 1, searchText: searchInput });
  };

  const goPage = (next) => {
    const nextPage = Math.min(Math.max(1, next), totalPages);
    setSearchParams({ page: nextPage, searchText });
  };

  return (
    <div css={s.container}>
      <SearchBox
        value={searchInput}
        onChange={setSearchInput}
        onSearch={handleSearchOnClick}
      />

      <div css={s.tableWrapper}>
        <table css={s.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>크루 이름</th>
              <th>썸네일</th>
              <th>한줄 소개</th>
              <th>군구</th>
              <th>상세보기</th>
            </tr>
          </thead>
          <tbody>
            {crews.length === 0 ? (
              <tr>
                <td colSpan="6">검색 결과가 없습니다.</td>
              </tr>
            ) : (
              crews.map((crew) => (
                <tr key={crew.crewId}>
                  <td>{crew.crewId}</td>
                  <td>{crew.crewName}</td>
                  <td>
                    <img
                      src={crew.thumbnailPicture}
                      alt={crew.crewName}
                      css={s.thumbnail}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </td>
                  <td>{crew.title}</td>
                  <td>{crew.gunguName}</td>
                  <td>
                    <Button onClick={() => setSelectedCrew(crew)}>상세보기</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div css={s.paginationWrapper}>
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={(p) => goPage(p)}
          windowSize={1}
        />
      </div>

      {selectedCrew && (
        <CrewDetailModal crew={selectedCrew} onClose={() => setSelectedCrew(null)} />
      )}
    </div>
  );
}

export default SearchCrew;
