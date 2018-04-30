import fetchlink from 'fetch-link';
import querystring from 'querystring';
import { API_ROOT, PAGE_START } from '../utils/Constants.js';
import * as Utils from './Utils.js';

export function RequestAll(schema) {
    let results = [];
    return fetchlink.all(`${API_ROOT}${schema}`, {direction: 'next'})
    .then(response => {
        response.forEach(res => {
            res.json().then(r => {
                results.push(...(r));
            });
        });
        return results;
    });
}

export function Request(schema, filters) {
    let params = convertParamsToObject(filters);
    let query = querystring.stringify(params);
    
    return fetch(`${API_ROOT}${schema}?${query}`)
    .then(response => {
        return response.json().then(r => {
            return {results: r, link: response.headers.get('link')};
        });
    });
}

export function Paginate(url) {
    return fetch(url)
    .then(response => response.json());
}

function convertParamsToObject(filters) {
    let params = {
        page: PAGE_START
    };

    if (filters) {
        let labelsFilter = "";
        filters.forEach(filter => {
            let filterType = Utils.getFilterType(filter);
            let filterVal = Utils.getFilterVal(filter);
            if (filterType === "labels") {
                labelsFilter += `${filterVal},`;
            } else {
                Object.assign(params, {[filterType]: filterVal});
            }
        });
        
        if(labelsFilter) {
            Object.assign(params, {labels: labelsFilter});
        }
    }

    return params;
}