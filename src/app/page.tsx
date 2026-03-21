"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchFacebookReactRepo } from "@/types/github-repo-summary";
import Summary from "./components/summary";
import styles from "./page.module.css";

export default function Home() {
  const { data, isPending, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["github", "repo", "facebook/react"],
    queryFn: fetchFacebookReactRepo,
    staleTime: 60_000,
  });

  return (
    <main className={styles.main}>
      {<Summary data={data} />}
      {isPending && <p>Loading repository…</p>}
      {isError && (
        <div className={styles.error}>
          <p>
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
          <button type="button" onClick={() => refetch()} disabled={isFetching}>
            {isFetching ? "Retrying…" : "Retry?"}
          </button>
        </div>
      )}
    </main>
  );
}
