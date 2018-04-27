import React from 'react';

import { ChevronDown } from 'react-feather';

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            active: false
        }
    }

    toggle() {
        this.setState({
            active: !this.state.active
        });
    }
    
    render() {
        return(
            <div className="dropdown" onFocus={this.toggle} onBlur={this.toggle} tabIndex="0">
                <span className="icon-span dropdown-btn">
                    {this.props.name}
                    <ChevronDown className="black-chevron" />
                </span>
                <div className={this.state.active ? "active dropdown-content" : "dropdown-content"}>
                    {this.props.values}
                </div>
            </div>
        );
    }
}
