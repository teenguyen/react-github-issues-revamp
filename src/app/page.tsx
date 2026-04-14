"use client";

import { useEffect, useMemo, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import Summary from "./components/summary";
import IssuesTable from "./components/issues-table";
import styles from "./page.module.css";
import { summaryQueryOptions } from "@/queries/summary";
import { labelsQueryOptions } from "@/queries/labels";
import Dropdown from "./atoms/dropdown";
import { ISSUES_PAGE_SIZE, issuesQueryOptions } from "@/queries/issues";
import Pagination from "./components/pagination";

const DEFAULT_LABEL = "";

export default function Home() {
  const {
    data: summary,
    isPending: summaryIsPending,
    isError: summaryIsError,
    refetch: summaryRefetch,
    isFetching: summaryIsFetching,
  } = useQuery(summaryQueryOptions);
  const { full_name, issues_url, open_issues_count } = summary ?? {};

  const [labelFilter, setLabelFilter] = useState(DEFAULT_LABEL);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [labelFilter]);

  const issuesUrl = issues_url?.replace(/\{\/number\}$/, "");
  const issuesFetchUrl = useMemo(() => {
    if (!issuesUrl) return "";
    const u = new URL(issuesUrl);
    u.searchParams.set("per_page", String(ISSUES_PAGE_SIZE));
    u.searchParams.set("page", String(page));
    u.searchParams.set("state", "open");
    if (labelFilter) {
      u.searchParams.set("labels", labelFilter);
    } else {
      u.searchParams.delete("labels");
    }
    return u.toString();
  }, [issuesUrl, page, labelFilter]);

  const [{ data, isPending, isError, isFetching }, { data: labels = [] }] =
    useQueries({
      queries: [
        issuesQueryOptions(issuesFetchUrl),
        labelsQueryOptions(full_name),
      ],
    });

  const issues = data?.issues ?? [];
  const totalPages = Math.max(
    0,
    Math.ceil(open_issues_count ?? 0 / ISSUES_PAGE_SIZE),
  );

  return (
    <main className={styles.main}>
      <Summary
        {...summary}
        queryState={{
          isPending: summaryIsPending,
          isError: summaryIsError,
          refetch: summaryRefetch,
          isFetching: summaryIsFetching,
        }}
      />
      <div className={styles.filters}>
        <Dropdown
          id="issues-label-filter"
          label="Filter by label"
          value={labelFilter}
          onChange={(e) => setLabelFilter(e.target.value)}
          disabled={!full_name}
        >
          <option value={DEFAULT_LABEL}>All labels</option>
          {labels.map((label) => (
            <option key={label.name} value={label.name}>
              {label.name}
            </option>
          ))}
        </Dropdown>
      </div>
      <IssuesTable
        issues={issues}
        queryState={{
          isPending,
          isError,
          isFetching,
        }}
      />
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          isFetching={isFetching}
        />
      )}
    </main>
  );
}
