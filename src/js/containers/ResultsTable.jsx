import React from 'react';
import { Request, Paginate } from './../utils/Request.js';

import ResultsRow from './../components/ResultsRow.jsx';
import Pagination from './../components/Pagination.jsx';

export default class ResultsTable extends React.Component {
    constructor(props) {
        super(props);

        this.handleResponse = this.handleResponse.bind(this);
        this.changePage = this.changePage.bind(this);
        this.state = {
            resultsRows: null,
            pages: {
                pageRoot: null,
                prevPage: null,
                nextPage: null,
                firstPage: null,
                lastPage: null,
                totalPages: 1
            }
        }
    }
    componentDidMount() {
        this.ResultsTable();
    }
    
    componentWillReceiveProps(nextProps) {
        this.ResultsTable(nextProps)
    }

    ResultsTable(props) {
        let issues = [];
        Request({schemaName:"issues", filter:this.props.filters, completeResponse:issues, callback:this.handleResponse});
    }

    changePage(newPage) {
        Paginate(newPage, this.handleResponse);
    }

    handleResponse(response, linkHeader) {
        let issues = response.map(issue => ({
            key: issue.id,
            issueUrl: issue.html_url,
            state: issue.state,
            title: issue.title,
            number: issue.number,
            createdDate: issue.created_at,
            user: issue.user.login,
            userUrl: issue.user.html_url,
            labels: issue.labels,
            assignees: issue.assignees,
            comments: issue.comments
        }));

        let issueList = issues.map((item) => 
            <ResultsRow key={item.key} results={item} />
        );

        let root = null;
        let prev = null;
        let next = null;
        let first = null;
        let last = null;
        let total = null;
        
        if (linkHeader !== null) {
            (linkHeader.split(",")).forEach((link) => {
                let split = link.split(";");
                let linkStr = split[0].replace(/[<,>]/g, "").trim()
                let relStr = split[1].trim();
    
                if (relStr.match("prev") !== null) {
                    prev = linkStr;
                } else if (relStr.match("next") !== null) {
                    next = linkStr;
                } else if (relStr.match("first") !== null) {
                    first = linkStr;
                    root = linkStr.replace(/([&]*)page=([0-9]*)([&]*)/, "");
                } else if (relStr.match("last") !== null) {
                    last = linkStr;
                    let pageNoStr = new URL(linkStr).searchParams.get("page");
                    total = parseInt(pageNoStr, 10) || null;
                    root = linkStr.replace(/([&]*)page=([0-9]*)([&]*)/, "");
                }
            })
        }

        this.setState((prevState, props) => ({
            resultsRows: issueList,
            pages: {
                pageRoot: root,
                prevPage: prev,
                nextPage: next,
                firstPage: first,
                lastPage: last,
                totalPages: total
            }
        }));
    }

    render() {
        return(
            <div>
                <table className="table-contents">
                    <tbody>
                        {this.state.resultsRows}
                    </tbody>
                </table>
                <br />
                <Pagination pages={this.state.pages} onClick={i => this.changePage(i)}/>
            </div>
        );
    }
}