import type { UseQueryOptions } from "@tanstack/react-query";
import { parseGithubLinkHeader } from "@/queries/githubLink";

const HEADERS = { Accept: "application/vnd.github+json" } as const;

export type RepoLabel = {
  name: string;
  color: string;
};

function getNextUrl(linkHeader: string | null): string | null {
  const links = parseGithubLinkHeader(linkHeader);
  return links.next ?? null;
}

export const labelsQueryOptions = (
  fullName: string | undefined,
): UseQueryOptions<RepoLabel[]> => ({
  queryKey: ["labels", fullName ?? ""],
  enabled: Boolean(fullName),
  queryFn: async (): Promise<RepoLabel[]> => {
    if (!fullName) return [];
    const collected: RepoLabel[] = [];
    let url: string | null =
      `https://api.github.com/repos/${encodeURI(fullName)}/labels?per_page=100`;

    while (url) {
      const res = await fetch(url, { headers: HEADERS });
      if (!res.ok) {
        throw new Error(`GitHub labels API responded with ${res.status}`);
      }
      const batch = (await res.json()) as RepoLabel[];
      collected.push(...batch);
      url = getNextUrl(res.headers.get("Link"));
    }

    return collected.sort((a, b) => a.name.localeCompare(b.name));
  },
});
