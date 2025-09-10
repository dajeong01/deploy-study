/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import usePrincipalQuery from "../../../queries/User/usePrincipalQuery";
import useGetMyCrewsQuery from "../../../queries/User/useGetMyCrewsQuery";
import useGetMyPostQuery from "../../../queries/User/useGetMyPostQuery";
import Pagination from "../../../components/Pagination/Pagination";
import { MenuItem, Select } from "@mui/material";

const SRC_OPTIONS = [
  { value: "", label: "전체" },
  { value: "global_free", label: "전체 자유" },
  { value: "global_notice", label: "전체 공지" },
  { value: "crew_free", label: "크루 자유" },
  { value: "crew_notice", label: "크루 공지" },
];

function buildPostUrl({ src, postId, crewId }) {
  if (!src || postId == null) return null;
  switch (src) {
    case "global_free":
      return `/free/${postId}`;
    case "global_notice":
      return `/notice/${postId}`;
    case "crew_free":
      return crewId ? `/crews/${crewId}/freeBoards/${postId}` : null;
    case "crew_notice":
      return crewId ? `/crews/${crewId}/notices/${postId}` : null;
    default:
      return null;
  }
}

function srcLabel(v) {
  return SRC_OPTIONS.find((o) => o.value === v)?.label ?? v ?? "";
}

export default function Post() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const size = 10;
  const src = searchParams.get("src") || "";
  const crewId = searchParams.get("crewId") || "";
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);

  const principalQuery = usePrincipalQuery();
  const userId = principalQuery?.data?.data?.body?.user?.userId ?? principalQuery?.data?.body?.user?.userId ?? null;

  const { data: myCrewsRes } = useGetMyCrewsQuery(userId);

  const myCrews = useMemo(() => {
    const raw = myCrewsRes?.data?.body ?? myCrewsRes?.body ?? myCrewsRes ?? [];
    return (Array.isArray(raw) ? raw : []).filter((c) => c && c.crewId != null);
  }, [myCrewsRes]);

  const { data, isLoading, isError } = useGetMyPostQuery({
    page,
    size,
    searchText,
    src,
    crewId: crewId || "",
  });

  const body = data?.data?.body ?? data?.body ?? data ?? {};
  const totalPages = body?.totalPages ?? 1;
  const totalElements = body?.totalElements ?? 0;
  const contents = useMemo(() => {
    const base = body?.contents ?? body?.items ?? [];
    return (Array.isArray(base) ? base : []).filter((p) => p && p.postId != null);
  }, [body]);

  const start = (page - 1) * size;

  const handleSearchOnClick = () => {
    setSearchParams((p) => {
      const next = new URLSearchParams(p);
      next.set("page", "1");
      next.set("searchText", searchInput);
      next.set("src", src);
      if (crewId) next.set("crewId", crewId);
      else next.delete("crewId");
      return next;
    });
  };

  const handleSrcChange = (e) => {
    const next = e.target.value;
    setSearchParams((p) => {
      const nextParams = new URLSearchParams(p);
      nextParams.set("page", "1");
      nextParams.set("src", next);
      if (searchInput || searchText) {
        nextParams.set("searchText", searchInput || searchText);
      }
      if (crewId) nextParams.set("crewId", crewId);
      return nextParams;
    });
  };

  const handleCrewChange = (e) => {
    const next = e.target.value;
    setSearchParams((p) => {
      const nextParams = new URLSearchParams(p);
      nextParams.set("page", "1");
      nextParams.set("src", src);
      if (next) nextParams.set("crewId", next);
      else nextParams.delete("crewId");
      if (searchInput || searchText) {
        nextParams.set("searchText", searchInput || searchText);
      }
      return nextParams;
    });
  };

  const goPage = (next) => {
    const nextPage = Math.min(Math.max(1, next), Math.max(1, totalPages));
    setSearchParams((p) => {
      const params = new URLSearchParams(p);
      params.set("page", String(nextPage));
      params.set("src", src);
      if (crewId) params.set("crewId", crewId);
      else params.delete("crewId");
      if (searchText) params.set("searchText", searchText);
      else params.delete("searchText");
      return params;
    });
  };

  const handleRowClick = (item) => {
    const url = buildPostUrl(item);
    if (url && url !== "/") navigate(url);
  };

  if (isLoading) return <div>불러오는 중…</div>;
  if (isError) return <div>문제가 발생했어요.</div>;

  return (
    <div css={s.container}>
      <h2>내가 쓴 글</h2>
      <div css={s.searchBox}>
        <div css={s.inputGroup}>
          <div css={s.selectGroup}>
            <Select
              css={s.selectBox}
              value={src}
              onChange={handleSrcChange}
              displayEmpty
            >
              {SRC_OPTIONS.map((op) => (
                <MenuItem
                  key={op.value}
                  value={op.value}
                  css={s.menuItem}
                >
                  {op.label}
                </MenuItem>
              ))}
            </Select>
            <Select
              css={s.selectBox}
              value={crewId}
              onChange={handleCrewChange}
              displayEmpty
            >
              <MenuItem value="" css={s.menuItem}>내 크루: 전체</MenuItem>
              {myCrews.map((c) => (
                  <MenuItem
                    key={c.crewId}
                    value={String(c.crewId)}
                    css={s.menuItem}
                  >
                    {c.crewName ?? `Crew #${c.crewId}`}
                  </MenuItem>
                ))}
            </Select>
          </div>

          <div css={s.asd}>
            <input
              type="text"
              placeholder="제목/내용 검색"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              css={s.searchInput}
              onKeyDown={(e) => e.key === "Enter" && handleSearchOnClick()}
            />
            <button css={s.searchButton} onClick={handleSearchOnClick}>
              <IoSearch />
            </button>
          </div>
        </div>
      </div>


      <table css={s.table}>
        <thead>
          <tr>
            <th css={s.th}>번호</th>
            <th css={s.th}>분야</th>
            <th css={s.th}>제목</th>
            <th css={s.th}>크루</th>
            <th css={s.th}>등록일</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((item, index) => (
            <tr
              key={`${item.src}-${item.postId}`}
              className={s.tr}
              onClick={() => {
                const url = buildPostUrl(item);
                if (url) navigate(url);
              }}
              style={{ cursor: "pointer" }}
            >
              <td css={s.td}>{totalElements - (start + index)}</td>
              <td css={s.td}>{srcLabel(item.src)}</td>
              <td css={s.tdTitle}>{item.title}</td>
              <td css={s.td}>{item.crew.crewName ?? "-"}</td>
              <td css={s.td}>{new Date(item.createdAt).toLocaleDateString("ko-KR")}</td>
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
