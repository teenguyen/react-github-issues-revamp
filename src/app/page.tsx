"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Summary from "./organisms/summary";
import IssuesTable from "./organisms/issues-table";
import IssuesFilter, {
  DEFAULT_LABEL,
  ISSUE_SORT_BY,
  ISSUE_SORT_DIRECTION,
  IssuesFilterContext,
  type IssueSortBy,
  type IssueSortDirection,
} from "./organisms/issues-filter";
import styles from "./page.module.css";
import { summaryQueryOptions } from "@/queries/summary";
import { ISSUES_PAGE_SIZE, issuesQueryOptions } from "@/queries/issues";
import Pagination from "./components/pagination";

const ISSUES_STATE = "open";

export default function Home() {
  const {
    data: summary,
    isPending: summaryIsPending,
    isError: summaryIsError,
    refetch: summaryRefetch,
    isFetching: summaryIsFetching,
  } = useQuery(summaryQueryOptions);
  const { full_name, issues_url, open_issues_count } = summary ?? {};

  const [page, setPage] = useState(1);
  const [labelFilter, setLabelFilter] = useState(DEFAULT_LABEL);
  const [issueSortBy, setIssueSortBy] = useState<IssueSortBy>(
    ISSUE_SORT_BY.CREATED,
  );
  const [issueSortDirection, setIssueSortDirection] =
    useState<IssueSortDirection>(ISSUE_SORT_DIRECTION.DESC);

  useEffect(() => {
    setPage(1);
  }, [labelFilter, issueSortBy, issueSortDirection]);

  const issuesUrl = issues_url?.replace(/\{\/number\}$/, "");
  const issuesFetchUrl = useMemo(() => {
    if (!issuesUrl) return "";
    const u = new URL(issuesUrl);
    u.searchParams.set("per_page", String(ISSUES_PAGE_SIZE));
    u.searchParams.set("page", String(page));
    u.searchParams.set("state", ISSUES_STATE);
    u.searchParams.set("sort", issueSortBy);
    u.searchParams.set("direction", issueSortDirection);
    if (labelFilter) {
      u.searchParams.set("labels", labelFilter);
    } else {
      u.searchParams.delete("labels");
    }
    return u.toString();
  }, [issuesUrl, page, labelFilter, issueSortBy, issueSortDirection]);

  const {
    data: issuesData,
    isPending,
    isError,
    isFetching,
  } = useQuery(issuesQueryOptions(issuesFetchUrl));

  const issues = issuesData?.issues ?? [];
  const totalPages = Math.max(
    0,
    Math.ceil(open_issues_count ?? 0 / ISSUES_PAGE_SIZE),
  );

  const issuesFilterContextValue = useMemo(
    () => ({
      labelFilter,
      setLabelFilter,
      issueSortBy,
      setIssueSortBy,
      issueSortDirection,
      setIssueSortDirection,
    }),
    [labelFilter, issueSortBy, issueSortDirection],
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
      <IssuesFilterContext.Provider value={issuesFilterContextValue}>
        <IssuesFilter full_name={full_name} />
      </IssuesFilterContext.Provider>
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
