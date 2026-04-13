import type { UseQueryOptions } from "@tanstack/react-query";

const REACT_REPO_URL = "https://api.github.com/repos/facebook/react";

const HEADERS = { Accept: "application/vnd.github+json" } as const;

export type Summary = {
  full_name: string;
  description: string | null;
  stargazers_count: number;
  open_issues_count: number;
  forks_count: number;
  html_url: string;
  issues_url: string;
};

type SearchIssuesJson = {
  total_count: number;
};

export const summaryQueryOptions: UseQueryOptions<Summary> = {
  queryKey: ["summary"],
  queryFn: async (): Promise<Summary> => {
    const res = await fetch(REACT_REPO_URL, { headers: HEADERS });
    if (!res.ok) {
      throw new Error(`GitHub API responded with ${res.status}`);
    }
    const repo = (await res.json()) as Summary;
    const q = `repo:${repo.full_name} type:issue state:open`;
    const searchUrl = `https://api.github.com/search/issues?q=${encodeURIComponent(q)}&per_page=1`;
    const searchRes = await fetch(searchUrl, { headers: HEADERS });
    if (!searchRes.ok) {
      throw new Error(`GitHub search API responded with ${searchRes.status}`);
    }
    const search = (await searchRes.json()) as SearchIssuesJson;
    return {
      ...repo,
      open_issues_count: search.total_count,
    };
  },
};
