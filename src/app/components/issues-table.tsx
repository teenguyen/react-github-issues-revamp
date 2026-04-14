"use client";

import { type Issue } from "@/queries/issues";
import Skeleton from "../atoms/skeleton";
import styles from "./issues-table.module.css";
import IssuesRow from "./issues-row";

export default function IssuesTable({
  issues,
  queryState,
}: {
  issues: Issue[];
  queryState: {
    isPending: boolean;
    isError: boolean;
    isFetching: boolean;
  };
}) {
  const { isPending, isError, isFetching } = queryState;
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
            {!isPending && !isFetching && !isError && issues.length === 0 && (
              <tr>
                <td colSpan={3}>
                  <p className={styles.tableMessage}>No issues found.</p>
                </td>
              </tr>
            )}
            {isPending &&
              issues.length === 0 &&
              new Array(3).fill(0).map((_, index) => (
                <tr key={index}>
                  <th className={styles.num}>
                    <Skeleton width="100%" height={12} />
                  </th>
                  <td className={styles.titleCell}>
                    <Skeleton width="85%" height={22} />
                    <Skeleton width="15%" height={16} />
                    <span className={styles.labels}>
                      <Skeleton width="8%" height={18} />
                      <Skeleton width="8%" height={18} />
                      <Skeleton width="8%" height={18} />
                    </span>
                  </td>
                  <td className={styles.comments}>
                    <Skeleton width="100%" height={32} />
                  </td>
                </tr>
              ))}
            {isError && (
              <tr>
                <td colSpan={3}>
                  <p className={styles.tableMessage}>Error loading issues.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
