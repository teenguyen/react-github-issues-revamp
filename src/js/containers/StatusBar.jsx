import React from 'react';
import { AlertTriangle, Check} from 'react-feather';

export default class StatusBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { openIssues: "?", closedIssues: "?" };
    }

    render() {
        return(    
            <div title="There isn't a way to fetch this unfortunately :( Purely aesthetic reasons this is here">
                <span className="icon-span">
                    <AlertTriangle className="alert-orange"/> {this.state.openIssues} Open
                </span>
                <span className="icon-span">
                    <Check className="success-green"/> {this.state.closedIssues} Closed
                </span>
            </div>
        );
    }
}