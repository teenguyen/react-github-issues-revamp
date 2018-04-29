import React from 'react';
import { Request } from './../utils/Request.js';

import Dropdown from './../components/Dropdown.jsx';

export default class MilestoneFilter extends React.Component {
    constructor(props) {
        super(props);

        this.handleResponse = this.handleResponse.bind(this);
        this.state = {
            milestones: <div>No Milestones found.</div>
        }
    }

    componentDidMount() {
        let milestones = [];
        Request({schemaName:"milestones", getAllItems:true, completeResponse:milestones, callback:this.handleResponse});
    }

    handleResponse(response) {
        let milestones = response.map(milestone => ({
            key: milestone.id,
            name: milestone.title
        }));

        let milestoneList = milestones.map(item => 
            <div key={item.key} onClick={() => this.props.onClick(`milestone=${item.name}`)}>
                {item.name}
            </div>
        );

        this.setState((prevState, props) => ({
            milestones: milestoneList
        }));
    }
    
    render() {
        return(
            <Dropdown name="Milestone" values={ this.state.milestones }/>
        );
    }
}