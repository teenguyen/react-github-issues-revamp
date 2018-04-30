import { ASC, DESC } from './Constants.js';

export function getFilterType(filter) {
    return filter.substring(0, filter.indexOf("="));
}

export function getFilterVal(filter) {
    return filter.substring(filter.indexOf("=") + 1);
}

export function includesSort(filter) {
    return filter.includes(ASC) || filter.includes(DESC);
}