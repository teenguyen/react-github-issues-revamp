import querystring from 'querystring';
import { PAGE_START, API_ROOT, MAX_RESULTS } from '../utils/Constants.js';
import * as common from './Common.js';

export function Request({schemaName, getAllItems = false, page=PAGE_START, filter=null, completeResponse, callback}) {
    let query = `?page=${page}`;
    if(filter !== null && filter.length > 0) {
        query += queryString(filter);
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_ROOT}${schemaName}${query}`);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                response.forEach((item) => {
                    completeResponse.push(item);
                });
    
                if (getAllItems && response.length === MAX_RESULTS) {
                    Request({schemaName:schemaName, getAllItems:getAllItems, page:page + 1, filter:filter, completeResponse:completeResponse, callback:callback});
                } else {
                    callback(completeResponse, xhr.getResponseHeader("link"));
                }
            }
        }
    };
}

export function Paginate(pagination, callback) {
    let completeResponse = [];
    var xhr = new XMLHttpRequest();
    xhr.open("GET", pagination);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                response.forEach((item) => {
                    completeResponse.push(item);
                });
                callback(completeResponse, xhr.getResponseHeader("link"));
            }
        }
    };
}

function queryString(filter) {
    let labelStr = combineLabels(filter);

    let filterStr = "";
    filter.forEach((i) => {
        if(common.getFilterType(i) !== "labels") {
            filterStr = filterStr.concat(`&${i}`);
        }
    });
    filterStr = filterStr.concat(labelStr);
    return encodeURI(filterStr.trim());
}

function combineLabels(filter) {
    let labelStr = "&labels="

    filter.forEach((i) => {
        let filterType = common.getFilterType(i);
        let filterVal = common.getFilterVal(i);
        if(filterType === "labels") {
            labelStr = labelStr.concat(`${filterVal},`);
        }
    })
    return labelStr;
}