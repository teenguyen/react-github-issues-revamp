export const API_ROOT = "https://api.github.com/repos/facebook/react/";
export const PAGE_START = 1;
export const MAX_RESULTS = 30;
export const AUTHOR = "creator";
export const ASSIGNEE = "assignee";
export const ASC = "asc";
export const DESC = "desc";

export const SORT_FILTERS = [
    { type:"created",                   direction:"desc",   name:"Newest" },
    { type:"created",                   direction:"asc",    name:"Oldest" },
    { type:"comments",                  direction:"desc",   name:"Most Commented" },
    { type:"comments",                  direction:"asc",    name:"Least Commented" },
    { type:"updated",                   direction:"desc",   name:"Recently Updated" },
    { type:"updated",                   direction:"asc",    name:"Least Recently Updated" },
    { type:"reactions-+1",              direction:"desc",   name:"👍"},
    { type:"reactions--1",              direction:"desc",   name:"👎"},
    { type:"reactions-smile",           direction:"desc",   name:"😊"},
    { type:"reactions-tada",            direction:"desc",   name:"🎉"},
    { type:"reactions-thinking_face",   direction:"desc",   name:"🤔"},
    { type:"reactions-heart",           direction:"desc",   name:"💗"}
]