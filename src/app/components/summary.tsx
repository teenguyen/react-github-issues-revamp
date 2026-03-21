import { GitHubRepoSummary } from "@/types/github-repo-summary";
import styles from "./summary.module.css";
import Skeleton from "../atoms/skeleton";

export default function Summary({ data }: { data?: GitHubRepoSummary }) {
  return (
    <>
      <span className={styles.summary}>
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
        <section
          className={styles.section}
          aria-label="facebook/react stats on GitHub"
        >
          <dl className={styles.stats}>
            <div>
              <dt>Stars</dt>
              {data?.stargazers_count ? (
                <dd>{data.stargazers_count.toLocaleString()}</dd>
              ) : (
                <Skeleton width="4rem" />
              )}
            </div>
            <div>
              <dt>Open issues</dt>
              {data?.open_issues_count ? (
                <dd>{data.open_issues_count.toLocaleString()}</dd>
              ) : (
                <Skeleton width="4rem" />
              )}
            </div>
            <div>
              <dt>Forks</dt>
              {data?.forks_count ? (
                <dd>{data.forks_count.toLocaleString()}</dd>
              ) : (
                <Skeleton width="4rem" />
              )}
            </div>
          </dl>
        </section>
      </span>
      {data?.description && (
        <p className={styles.description}>{data.description}</p>
      )}
    </>
  );
}
