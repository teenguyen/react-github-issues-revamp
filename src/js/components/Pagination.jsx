import React from 'react';

export default function Pagination(props) {
    let pageApi = [];
    for(let i = 1; i <= props.pages.totalPages; i++) {
        pageApi.push({
            idx: i,
            api: `${props.pages.pageRoot}&page=${i}`
        });
    }

    let pageList = pageApi.map((item) =>
        <span key={`page-${item.idx}`} onClick={() => props.onClick(item.api)}>{item.idx}</span>
    );

    return(
        <div className="pagination">
            <span key="prev" className={props.pages.prevPage ? "" : "disabled"} onClick={() => props.onClick(props.pages.prevPage)}>Previous</span>
            {pageList}
            <span key="next" className={props.pages.nextPage ? "" : "disabled"} onClick={() => props.onClick(props.pages.nextPage)}>Next</span>
        </div>
    );
}