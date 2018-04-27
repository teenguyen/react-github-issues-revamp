import React, { Component } from 'react';

import * as GITHUB_CONST from './js/utils/Constants.js';
import * as Common from './js/utils/Common.js';

import StatusBar from './js/containers/StatusBar.jsx';
import Filters from './js/components/Filters.jsx';
import AuthorFilter from './js/containers/AuthorFilter.jsx';
import LabelFilter from './js/containers/LabelFilter.jsx';
import ProjectFilter from './js/containers/ProjectFilter.jsx';
import MilestoneFilter from './js/containers/MilestoneFilter.jsx';
import AssigneeFilter from './js/containers/AssigneeFilter.jsx';
import SortFilter from './js/containers/SortFilter.jsx';
import ResultsTable from './js/containers/ResultsTable.jsx';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.addFilter = this.addFilter.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
        this.state = {
            filters: []
        }
    }

    addFilter(newFilter) {
        let existingFilter = false;
        let newFilterIsCreator = Common.getFilterType(newFilter) === GITHUB_CONST.AUTHOR;
        let newFilterIsAssignee = Common.getFilterType(newFilter) === GITHUB_CONST.ASSIGNEE;
        let newFilterContainsSort = Common.includesSort(newFilter);
        let currentFilters = this.state.filters;
        for(let i = 0; i < currentFilters.length; i++) {
            if(currentFilters[i] === newFilter) {
                currentFilters.splice(i, 1);
                existingFilter = true;
            } else if (newFilterIsCreator && Common.getFilterType(currentFilters[i]) === GITHUB_CONST.AUTHOR) { // 1 author only
                currentFilters.splice(i, 1);
            } else if (newFilterIsAssignee && Common.getFilterType(currentFilters[i]) === GITHUB_CONST.ASSIGNEE) { // 1 assignee only
                currentFilters.splice(i, 1);
            } else if(newFilterContainsSort && Common.includesSort(currentFilters[i])) {
                currentFilters.splice(i, 1);
            }
        }

        if(!existingFilter) {
            currentFilters.push(newFilter);
        }

        this.setState((prevState, props) => ({
            filters: currentFilters
        }));
    }

    removeFilter(filter) {
        let currentFilters = this.state.filters;
        for(let i = 0; i < currentFilters.length; i++) {
            if(currentFilters[i] === filter) {
                currentFilters.splice(i, 1);
                break;
            }
        }

        this.setState((prevState, props) => ({
            filters: currentFilters
        }));
    }

    render() {
        return (
            <div>
                <div id="table-title">Github Issues</div>
                <div id="github-issues">
                    <StatusBar />
                    <Filters filters={this.state.filters} onClick={i => this.removeFilter(i)}/>
                    <div className="table-filter">
                        <AuthorFilter onClick={i => this.addFilter(i)} />
                        <LabelFilter onClick={i => this.addFilter(i)} />
                        <ProjectFilter />
                        <MilestoneFilter onClick={i => this.addFilter(i)}/>
                        <AssigneeFilter onClick={i => this.addFilter(i)}/>
                        <SortFilter onClick={i => this.addFilter(i)}/>
                    </div>
                    <ResultsTable filters={this.state.filters} />
                </div>
            </div>
        )
    }
}