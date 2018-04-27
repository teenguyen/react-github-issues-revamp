import React from 'react';

import Dropdown from './../components/Dropdown.jsx';

export default class ProjectFilter extends React.Component {
    constructor(props) {
        super(props);

        let project = <div>No Projects found. The Projects API is currently under beta testing!</div>
        this.state = {
            projects: project
        }
    }
    
    render() {
        return(
            <Dropdown name="Project" values={ this.state.projects }/>
        );
    }
}