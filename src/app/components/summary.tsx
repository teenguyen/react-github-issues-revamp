"use client";

import { useQuery } from "@tanstack/react-query";
import { summaryQueryOptions } from "@/queries/summary";
import styles from "./summary.module.css";
import Skeleton from "../atoms/skeleton";

const DataDisplay = ({
  data,
  isPending,
}: {
  data?: number;
  isPending: boolean;
}) => {
  if (isPending) return <Skeleton width="4rem" />;
  if (!data) return "--";
  return data?.toLocaleString();
};

export default function Summary() {
  const { data, isPending, isError, error, refetch, isFetching } =
    useQuery(summaryQueryOptions);

  return (
    <section
      className={styles.summary}
      aria-label={`${data?.full_name} stats on GitHub`}
    >
      <div>
        <span className={styles.title}>
          <h1>github issues tracker</h1>
          {data && (
            <h2>
              <a href={data.html_url} target="_blank" rel="noopener noreferrer">
                {data.full_name}
              </a>
            </h2>
          )}
        </span>
        <p className={styles.description}>
          {data?.description && data.description}
          {isPending && "Loading repository…"}
          {isError && "Something went wrong :("}
        </p>
        {isError && (
          <button type="button" onClick={() => refetch()} disabled={isFetching}>
            {isFetching ? "Retrying…" : "Retry?"}
          </button>
        )}
      </div>

      <dl className={styles.stats}>
        <div>
          <dt>Stars</dt>
          <dd>
            <DataDisplay data={data?.stargazers_count} isPending={isPending} />
          </dd>
        </div>
        <div>
          <dt>Open issues</dt>
          <dd>
            <DataDisplay data={data?.open_issues_count} isPending={isPending} />
          </dd>
        </div>
        <div>
          <dt>Forks</dt>
          <dd>
            <DataDisplay data={data?.forks_count} isPending={isPending} />
          </dd>
        </div>
      </dl>
    </section>
  );
}
