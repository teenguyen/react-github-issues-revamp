import { keepPreviousData, UseQueryOptions } from "@tanstack/react-query";

export type Issue = {
  number: number;
  title: string;
  html_url: string;
  state: "open" | "closed";
  comments: number;
  created_at: string;
  updated_at: string;
  user: { login: string } | null;
  labels: { name: string; color: string }[];
  pull_request?: { url: string };
};

export const ISSUES_PAGE_SIZE = 20;

export type IssuesResponse = {
  issues: Issue[];
  links: Record<string, string>;
};

export const issuesQueryOptions = (
  url?: string,
): UseQueryOptions<IssuesResponse> => ({
  queryKey: ["issues", url ?? ""],
  enabled: Boolean(url),
  placeholderData: keepPreviousData,
  queryFn: async (): Promise<IssuesResponse> => {
    if (!url) return { issues: [], links: {} };
    const issuesUrl = new URL(url);
    issuesUrl.searchParams.set("per_page", String(ISSUES_PAGE_SIZE));
    const res = await fetch(issuesUrl, {
      headers: { Accept: "application/vnd.github.raw+json" },
    });
    if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);

    const issues = (await res.json()) as Issue[];
    const links = res.headers
      .get("Link")
      ?.split(",")
      .reduce(
        (acc, link) => {
          const linkSplit = link.trim().split(";");
          const url = linkSplit[0].trim().replace(/<|>/g, "");
          const rel = linkSplit[1].trim().split("=")[1];
          acc[rel] = url;
          return acc;
        },
        {} as Record<string, string>,
      );

    return {
      issues,
      links: links ?? {},
    };
  },
});
