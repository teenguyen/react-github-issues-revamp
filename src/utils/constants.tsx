import { GITHUB_TOKEN } from "../private";

export const ISSUES_ENDPOINT =
  "https://api.github.com/repos/Facebook/react/issues";
export const SEARCH_ENDPOINT =
  "https://api.github.com/search/issues?per_page=1&q=repo:facebook/react+type:issue+";
export const IS_OPEN = "state:open";
export const IS_CLOSED = "state:closed";

export const FETCH_GET = {
  method: "GET",
  headers: {
    authorization: `Bearer ${GITHUB_TOKEN}`,
    accept: "application/vnd.github+json"
  }
};
