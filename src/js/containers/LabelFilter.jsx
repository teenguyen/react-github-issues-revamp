import React from 'react';
import { RequestAll } from './../utils/Request.js';

import Dropdown from './../components/Dropdown.jsx';

export default class LabelFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            labels: <div>No Labels found.</div>
        }
    }

    componentDidMount() {
        RequestAll("labels")
        .then(response => {
            let labels = response.map(label => ({
                key: label.id,
                name: label.name,
                color: label.color
            }));
            
            let labelList = labels.map(item => 
                <div key={item.key} onClick={() => this.props.onClick(`labels=${item.name}`)}>
                    <canvas className="icon-square" style={{backgroundColor: `#${item.color}`}} alt={`#${item.color} is the colour code for ${item.name}`}></canvas> {item.name}
                </div>
            );

            this.setState((prevState, props) => ({
                labels: labelList
            }));
        });
    }
    
    render() {
        return(
            <Dropdown name="Labels" values={ this.state.labels }/>
        );
    }
}