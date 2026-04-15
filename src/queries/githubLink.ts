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
  return header
    .split(",")
    .reduce(addLinkPartFromHeaderSegment, {} as GithubLinks);
}

/** `rel="last"` URL → total page count for this list request, or null if not present. */
export function getLastPageNumberFromGithubLinks(
  links: GithubLinks,
): number | null {
  const last = links.last;
  if (!last) return null;
  try {
    const raw = new URL(last).searchParams.get("page");
    if (raw == null) return null;
    const n = Number.parseInt(raw, 10);
    return Number.isFinite(n) && n > 0 ? n : null;
  } catch {
    return null;
  }
}

/**
 * Total pages for the current issues list from `Link` headers and the requested page.
 * GitHub omits `last` when there is only one page; `next` implies at least one more page.
 */
export function inferTotalPagesFromGithubLinks(
  links: GithubLinks,
  currentPage: number,
): number {
  const fromLast = getLastPageNumberFromGithubLinks(links);
  if (fromLast != null) return fromLast;
  if (links.next != null) return Math.max(currentPage + 1, 2);
  return Math.max(1, currentPage);
}
