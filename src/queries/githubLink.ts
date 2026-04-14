export type GithubLinks = Record<string, string>;

/** Merge one comma-separated segment from a GitHub `Link` header into the map. */
function addLinkPartFromHeaderSegment(
  acc: GithubLinks,
  part: string,
): GithubLinks {
  const segments = part.trim().split(";");
  if (segments.length < 2) return acc;
  const url = segments[0].trim().replace(/^<|>$/g, "");
  const relSeg = segments.find((s) => s.trim().startsWith("rel="));
  if (!relSeg) return acc;
  const rel = relSeg.trim().match(/^rel="([^"]+)"$/)?.[1];
  if (!rel) return acc;
  acc[rel] = url;
  return acc;
}

/** Parse GitHub `Link` response header into rel → URL (e.g. next, last, first, prev). */
export function parseGithubLinkHeader(header: string | null): GithubLinks {
  if (!header?.trim()) return {};
  return header.split(",").reduce(addLinkPartFromHeaderSegment, {} as GithubLinks);
}
