import React from 'react';
import { Request } from './../utils/Request.js';

import Dropdown from './../components/Dropdown.jsx';

export default class LabelFilter extends React.Component {
    constructor(props) {
        super(props);

        this.handleResponse = this.handleResponse.bind(this);
        this.state = {
            labels: <div>No Labels found.</div>
        }
    }

    componentDidMount() {
        let labels = [];
        Request({schemaName:"labels", getAllItems:true, completeResponse:labels, callback:this.handleResponse});
    }

    handleResponse(response) {
        let labels = response.map(label => ({
            key: label.id,
            name: label.name,
            color: label.color
        }));

        let labelList = labels.map(item => 
            <div key={item.key} onClick={() => this.props.onClick(`labels=${item.name}`)}>
                <img className="icon-square" style={{backgroundColor: `#${item.color}`}} alt="Label colour"></img> {item.name}
            </div>
        );

        this.setState((prevState, props) => ({
            labels: labelList
        }));
    }
    
    render() {
        return(
            <Dropdown name="Labels" values={ this.state.labels }/>
        );
    }
}