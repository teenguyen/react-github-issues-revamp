"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { summaryQueryOptions } from "@/queries/summary";
import { ISSUES_PAGE_SIZE, issuesQueryOptions } from "@/queries/issues";
import Skeleton from "../atoms/skeleton";
import styles from "./issues-table.module.css";
import IssuesRow from "./issues-row";
import Pagination from "./pagination";

export default function IssuesTable() {
  const { data: summary } = useQuery(summaryQueryOptions);
  const issuesUrl = summary?.issues_url.replace(/\{\/number\}$/, "");
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [issuesUrl]);

  const issuesFetchUrl = useMemo(() => {
    if (!issuesUrl) return undefined;
    const u = new URL(issuesUrl);
    u.searchParams.set("per_page", String(ISSUES_PAGE_SIZE));
    u.searchParams.set("page", String(page));
    return u.toString();
  }, [issuesUrl, page]);

  const { data, isPending, isError, isFetching } = useQuery(
    issuesQueryOptions(issuesFetchUrl),
  );

  const issues = data?.issues ?? [];
  const totalIssues = summary?.open_issues_count ?? 0;
  const totalPages = Math.ceil(totalIssues / ISSUES_PAGE_SIZE);

  return (
    <section aria-label="Open issues">
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.num} scope="col">
                #
              </th>
              <th scope="col">Title</th>
              <th className={styles.comments} scope="col">
                <span className="sr-only">Comments</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {issues.length > 0 &&
              issues.map((issue) => (
                <IssuesRow key={issue.number} issue={issue} />
              ))}
            {issuesFetchUrl &&
              !isPending &&
              !isFetching &&
              !isError &&
              issues.length === 0 && (
                <tr>
                  <td className={styles.tableMessage} colSpan={3}>
                    No issues found.
                  </td>
                </tr>
              )}
            {isPending &&
              !data &&
              new Array(3).fill(0).map((_, index) => (
                <tr key={index}>
                  <th className={styles.num}>
                    <Skeleton width="100%" height={12} />
                  </th>
                  <td className={styles.titleCell}>
                    <Skeleton width="85%" height={20} />
                    <Skeleton width="15%" height={12} />
                  </td>
                  <td className={styles.comments}>
                    <Skeleton width="100%" height={32} />
                  </td>
                </tr>
              ))}
            {isError && (
              <tr>
                <td className={styles.tableMessage} colSpan={3}>
                  Error loading issues.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          isFetching={isFetching}
        />
      )}
    </section>
  );
}
