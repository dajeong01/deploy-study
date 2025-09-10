/** @jsxImportSource @emotion/react */
import { LuChevronsLeft, LuChevronLeft, LuChevronRight, LuChevronsRight } from "react-icons/lu";
import * as s from "./styles";

export default function Pagination({ page = 1, totalPages = 1, onChange, windowSize = 1 }) {
  const clamp = (p) => Math.min(Math.max(1, p), totalPages);
  const go = (p) => onChange?.(clamp(p));

  const bucket = new Set([1, totalPages]);
  for (let p = page - windowSize; p <= page + windowSize; p++) {
    if (p >= 1 && p <= totalPages) bucket.add(p);
  }
  const list = [...bucket].sort((a, b) => a - b);

  const withDots = [];
  for (let i = 0; i < list.length; i++) {
    withDots.push(list[i]);
    if (i < list.length - 1 && list[i + 1] - list[i] > 1) withDots.push("…");
  }

  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <nav css={s.wrap} aria-label="페이지네이션">
      <button
        css={[s.iconBtn, s.ghostDisabled]}
        onClick={() => go(1)}
        disabled={isFirst}
        aria-label="첫 페이지"
        title="첫 페이지"
      >
        <LuChevronsLeft />
      </button>

      <button
        css={[s.iconBtn, s.ghostDisabled]}
        onClick={() => go(page - 1)}
        disabled={isFirst}
        aria-label="이전 페이지"
        title="이전 페이지"
      >
        <LuChevronLeft />
      </button>

      {withDots.map((it, idx) =>
        it === "…" ? (
          <span key={`dots-${idx}`} css={s.dots}>…</span>
        ) : (
          <button
            key={it}
            css={[s.pageBtn, it === page && s.activeBtn]}
            onClick={() => go(it)}
            aria-current={it === page ? "page" : undefined}
          >
            {it}
          </button>
        )
      )}

      <button
        css={[s.iconBtn, s.ghostDisabled]}
        onClick={() => go(page + 1)}
        disabled={isLast}
        aria-label="다음 페이지"
        title="다음 페이지"
      >
        <LuChevronRight />
      </button>

      <button
        css={[s.iconBtn, s.ghostDisabled]}
        onClick={() => go(totalPages)}
        disabled={isLast}
        aria-label="마지막 페이지"
        title="마지막 페이지"
      >
        <LuChevronsRight />
      </button>
    </nav>
  );
}
