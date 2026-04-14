import type { Summary as SummaryType } from "@/queries/summary";
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

type SummaryProps = Partial<SummaryType> & {
  queryState: {
    isPending: boolean;
    isError: boolean;
    refetch: () => void;
    isFetching: boolean;
  };
};

export default function Summary({
  full_name,
  description,
  stargazers_count,
  open_issues_count,
  forks_count,
  html_url,
  queryState,
}: SummaryProps) {
  const { isPending, isError, refetch, isFetching } = queryState;
  return (
    <section
      className={styles.summary}
      aria-label={
        full_name ? `${full_name} stats on GitHub` : "Repository stats on GitHub"
      }
    >
      <div>
        <span className={styles.title}>
          <h1>github issues tracker</h1>
          {full_name && (
            <h2>
              <a href={html_url} target="_blank" rel="noopener noreferrer">
                {full_name}
              </a>
            </h2>
          )}
        </span>
        <p className={styles.description}>
          {description}
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
            <DataDisplay data={stargazers_count} isPending={isPending} />
          </dd>
        </div>
        <div>
          <dt>Open issues</dt>
          <dd>
            <DataDisplay data={open_issues_count} isPending={isPending} />
          </dd>
        </div>
        <div>
          <dt>Forks</dt>
          <dd>
            <DataDisplay data={forks_count} isPending={isPending} />
          </dd>
        </div>
      </dl>
    </section>
  );
}
