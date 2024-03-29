import React from 'react';
import { SORT_FILTERS } from './../utils/Constants.js';

import Dropdown from './../components/Dropdown.jsx';

export default class SortFilter extends React.Component {
    constructor(props) {
        super(props);
        
        let sort = [];
        SORT_FILTERS.forEach((item) => {
            sort.push(
                <div key={`${item.type}-${item.direction}`} onClick={() => this.props.onClick(`sort=${item.type}&direction=${item.direction}`)}>
                    {item.name}
                </div>
            );
        });
        this.state = {
            sort: sort
        }
    }
    
    render() {
        return(
            <Dropdown name="Sort" values={ this.state.sort }/>
        );
    }
}