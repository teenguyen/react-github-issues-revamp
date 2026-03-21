const REACT_REPO_URL = "https://api.github.com/repos/facebook/react";

export type GitHubRepoSummary = {
  full_name: string;
  description: string | null;
  stargazers_count: number;
  open_issues_count: number;
  forks_count: number;
  html_url: string;
};

export async function fetchFacebookReactRepo(): Promise<GitHubRepoSummary> {
  const res = await fetch(REACT_REPO_URL);
  if (!res.ok) {
    throw new Error(`GitHub API responded with ${res.status}`);
  }
  return res.json() as Promise<GitHubRepoSummary>;
}
