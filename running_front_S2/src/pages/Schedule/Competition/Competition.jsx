/** @jsxImportSource @emotion/react */
import { MenuItem, Select } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import * as s from "./styles";
import MainContainer from "../../../components/MainContainer/MainContainer";
import useGetMarathonsInfiniteQuery from "../../../queries/useGetMarathonsInfiniteQuery";
import SearchBox from "../../../components/SearchBox/SearchBox";

const pick = (obj, ...keys) => keys.map((k) => obj?.[k]).find((v) => v !== undefined);
const fmtDate = (iso) => {
  if (!iso) return "";
  const m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[1]}.${m[2]}.${m[3]}` : iso;
};

const months = [
  { value: "", label: "전체" },
  { value: "9", label: "9월" },
  { value: "10", label: "10월" },
  { value: "11", label: "11월" },
];

function Competition(props) {
  const navigate = useNavigate();
  const [month, setMonth] = useState("");
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetMarathonsInfiniteQuery({ size: 12, searchText, month });

  const items = useMemo(() => {
    const pages = data?.pages ?? [];
    return pages.flatMap((p) => {
      const b = p?.data?.body ?? p?.data ?? p;
      return b?.contents ?? b?.content ?? b?.items ?? [];
    });
  }, [data]);

  const sentinelRef = useRef(null);
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "300px", threshold: 0 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const [input, setInput] = useState("");
  const doSearch = () => setSearchText(input);
  const onKeyDown = (e) => e.key === "Enter" && doSearch();

  return (
    <MainContainer>
        <h2 css={s.sectionTitle}>마라톤 대회 일정</h2>
        <div css={s.headerRow}>
          <Select
            css={s.selectBox}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            displayEmpty
            aria-label="월 선택"
          >
            {months.map((m) => (
              <MenuItem key={m.value} value={m.value} css={s.menuItem}>
                {m.label}
              </MenuItem>
            ))}
          </Select>

          <SearchBox
            value={input}
            onChange={setInput}
            onSearch={doSearch}
          />
        </div>


        {isLoading && <div css={s.empty}>불러오는 중…</div>}
        {isError && <div css={s.empty}>목록을 불러오지 못했어요.</div>}

        {!isLoading && !isError && (
          <>
            <div css={s.grid}>
              {items.map((m, idx) => {
                const marathonId = pick(m, "marathonId", "id") ?? idx;
                const title = pick(m, "title", "name") ?? "";
                const start = pick(m, "startDate", "start_date");
                const end = pick(m, "endDate", "end_date");
                const img = pick(m, "imageUrl", "image_url") || (m?.bgImageUrls && String(m.bgImageUrls).split(",")[0]) || "";

                return (
                  <div css={s.card} key={marathonId} onClick={() => navigate(`/marathons/${marathonId}`, { state: { marathon: m } })}>
                    <div css={s.thumb}>{img ? <img src={img} alt={title} /> : <div css={s.thumbFallback} />}</div>
                    <div css={s.cardBody}>
                      <div css={s.locationSmall}>{m?.location ?? ""}</div>
                      <div css={s.title}>{title}</div>
                      <div css={s.dateText}>
                        {fmtDate(start)}
                        {(start || end) && " ~ "}
                        {fmtDate(end)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div css={s.sentinel} ref={sentinelRef} />
            {isFetchingNextPage && <div css={s.loader}>더 불러오는 중…</div>}
            {!hasNextPage && items.length > 0 && <div css={s.done}>마지막입니다.</div>}
          </>
        )}
    </MainContainer>
  );
}

export default Competition;