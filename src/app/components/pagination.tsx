"use client";

import clsx from "clsx";
import styles from "./pagination.module.css";

const VISIBLE_PAGE_BUTTONS = 10;

/** Distance from page 1 is > 5 → page 7+ */
const CENTER_AFTER_PAGE = 6;
/** Fewer than 5 pages before last → page >= totalPages - 4 */
const END_ZONE_FIRST_PAGE = 4;

function getVisiblePageRange(
  currentPage: number,
  totalPages: number,
): { start: number; end: number } {
  if (totalPages <= VISIBLE_PAGE_BUTTONS) return { start: 1, end: totalPages };

  if (currentPage <= CENTER_AFTER_PAGE)
    return { start: 1, end: VISIBLE_PAGE_BUTTONS };

  if (currentPage >= totalPages - END_ZONE_FIRST_PAGE)
    return {
      start: totalPages - VISIBLE_PAGE_BUTTONS + 1,
      end: totalPages,
    };

  const start = currentPage - 5;
  return { start, end: start + VISIBLE_PAGE_BUTTONS - 1 };
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isFetching = false,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isFetching?: boolean;
}) {
  if (totalPages <= 1) return null;

  const { start, end } = getVisiblePageRange(currentPage, totalPages);
  const visiblePages = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i,
  );

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      className={styles.pagination}
      aria-label="Issues pages"
      aria-busy={isFetching}
    >
      <button
        type="button"
        disabled={isFirstPage}
        onClick={() => onPageChange(1)}
        title="First page"
      >
        «
      </button>
      <button
        type="button"
        disabled={isFirstPage}
        onClick={() => onPageChange(currentPage - 1)}
        title="Previous page"
      >
        ‹
      </button>
      {visiblePages.map((n) => (
        <button
          className={clsx(currentPage === n && styles.selected)}
          type="button"
          key={n}
          aria-current={currentPage === n ? "page" : undefined}
          disabled={currentPage === n}
          onClick={() => {
            if (n === currentPage) return;
            onPageChange(n);
          }}
          title={`Page ${n}`}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        disabled={isLastPage}
        onClick={() => onPageChange(currentPage + 1)}
        title="Next page"
      >
        ›
      </button>
      <button
        type="button"
        disabled={isLastPage}
        onClick={() => onPageChange(totalPages)}
        title="Last page"
      >
        »
      </button>
    </nav>
  );
}
