/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as s from "./styles";

const fmtDate = (iso) => {
  if (!iso) return "";
  const m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[1]}.${m[2]}.${m[3]}` : iso;
};

const fmtDistances = (value) => {
  if (!value && value !== 0) return "";

  let raw = Array.isArray(value) ? value.join(",") : String(value).trim();
  if (!raw) return "";

  if (/^\s*\d+,\d+\s*$/.test(raw)) {
    return `${raw.replace(",", ".")}km`;
  }

  const parts = raw
    .split(/[,\s/|]+/)
    .map((x) => x.trim())
    .filter(Boolean);

  const pretty = parts.map((p) => {
    const m = p.match(/(\d+(?:[.,]\d+)?)/);
    const num = m ? m[1].replace(",", ".") : p;
    return `${num}km`;
  });

  return pretty.join(", ");
};

function CompetitionDetail(props) {
  const { marathonId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const m = state?.marathon;

  const title = m?.title ?? "";
  const homepage =
    m?.homepage || m?.homePage || m?.detail_url || "";

  const image =
    m?.imageUrl ||
    m?.image_url ||
    (m?.bgImageUrls && String(m.bgImageUrls).split(",")[0]) ||
    "";

  const start = m?.startDate ?? m?.start_date;
  const end = m?.endDate ?? m?.end_date;

  const rawDistances =
    m?.distancesKm ?? m?.distances_km ?? (m?.distances && String(m.distances)) ?? "";
  const distancesText = fmtDistances(rawDistances);

  const metaRows = useMemo(
    () => [
      { label: "일시", value: `${fmtDate(start)} ~ ${fmtDate(end)}`.trim() },
      {
        label: "접수기간",
        value: `${fmtDate(m?.regStart ?? m?.reg_start)} ~ ${fmtDate(
          m?.regEnd ?? m?.reg_end
        )}`.trim(),
      },
      { label: "장소", value: m?.location ?? "" },
      { label: "홈페이지", value: homepage },
      { label: "종목", value: distancesText },     
      { label: "협찬", value: m?.sponsor ?? "" },
      { label: "문의", value: m?.contact ?? "" },
    ],
    [m, start, end, homepage, distancesText]
  );

  return (
    <div css={s.page}>
      <div css={s.topBar}>
        <button css={s.back} onClick={() => navigate(-1)}>
          ← 목록
        </button>
      </div>

      <div css={s.header}>
        <div css={s.thumb}>
          {image ? <img src={image} alt={title} /> : <div css={s.blank} />}
        </div>

        <div css={s.headerRight}>
          <div css={s.category}>마라톤</div>
          <h1 css={s.title}>{title}</h1>

          <div css={s.headerCtas}>
            {homepage && (
              <button
                css={s.homeButton}
                onClick={() => window.open(homepage, "_blank", "noopener")}
              >
                홈페이지 이동
              </button>
            )}
          </div>
        </div>
      </div>

      <h2 css={s.sectionTitle}>대회안내</h2>

      <div css={s.metaTable}>
        {metaRows
          .filter((r) => r.value && String(r.value).trim().length > 0)
          .map((row) => (
            <div css={s.metaRow} key={row.label}>
              <div css={s.metaLabel}>{row.label}</div>
              {row.label === "홈페이지" && homepage ? (
                <div css={s.metaValue}>
                  <a href={homepage} target="_blank" rel="noreferrer">
                    {homepage}
                  </a>
                </div>
              ) : (
                <div css={s.metaValue}>{row.value}</div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default CompetitionDetail;