import React from 'react';
import { Request } from './../utils/Request.js';

import Dropdown from './../components/Dropdown.jsx';

export default class AssigneeFilter extends React.Component {
    constructor(props) {
        super(props);

        this.handleResponse = this.handleResponse.bind(this);
        this.state = {
            assignees: <div>No Assignees found.</div>
        }
    }

    componentDidMount() {
        let assignees = [];
        Request({schemaName:"assignees", getAllItems:true, completeResponse:assignees, callback:this.handleResponse});
    }

    handleResponse(response) {
        let assignees = response.map(assignee => ({
            key: assignee.id,
            name: assignee.login,
            avatar: assignee.avatar_url
        }));

        let assigneeList = assignees.map(item => 
            <div key={item.key} onClick={() => this.props.onClick(`assignee=${item.name}`)}>
                <img src={item.avatar} className="icon-square" alt={item.name + "'s avatar"}/> {item.name}
            </div>
        );

        this.setState((prevState, props) => ({
            assignees: assigneeList
        }));
    }
    
    render() {
        return(
            <Dropdown name="Assignee" values={this.state.assignees}/>
        );
    }
}