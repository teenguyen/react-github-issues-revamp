import React from 'react';

import Dropdown from './../components/Dropdown.jsx';

export default class ProjectFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: <div>No Projects found. The Projects API is currently under beta testing!</div>
        }
    }
    
    render() {
        return(
            <Dropdown name="Project" values={ this.state.projects }/>
        );
    }
}