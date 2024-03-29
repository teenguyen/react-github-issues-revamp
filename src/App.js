import React, { Component } from 'react';

import { AUTHOR, ASSIGNEE } from './js/utils/Constants.js';
import * as Utils from './js/utils/Utils.js';

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
        let newFilterIsCreator = Utils.getFilterType(newFilter) === AUTHOR;
        let newFilterIsAssignee = Utils.getFilterType(newFilter) === ASSIGNEE;
        let newFilterContainsSort = Utils.includesSort(newFilter);
        let currentFilters = this.state.filters;
        for(let i = 0; i < currentFilters.length; i++) {
            if(currentFilters[i] === newFilter) {
                currentFilters.splice(i, 1);
                existingFilter = true;
            } else if (newFilterIsCreator && Utils.getFilterType(currentFilters[i]) === AUTHOR) { // 1 author only
                currentFilters.splice(i, 1);
            } else if (newFilterIsAssignee && Utils.getFilterType(currentFilters[i]) === ASSIGNEE) { // 1 assignee only
                currentFilters.splice(i, 1);
            } else if(newFilterContainsSort && Utils.includesSort(currentFilters[i])) {
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