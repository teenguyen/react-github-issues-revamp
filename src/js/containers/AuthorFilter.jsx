import React from 'react';
import { RequestAll } from './../utils/Request.js';

import Dropdown from './../components/Dropdown.jsx';

export default class AuthorFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authors: <div>No Authors found.</div>
        }
    }

    componentDidMount() {
        RequestAll("assignees")
        .then(response => {
            let authors = response.map(author => ({
                key: author.id,
                name: author.login,
                avatar: author.avatar_url
            }));

            let authorList = authors.map(item => 
                <div key={item.key} onClick={() => this.props.onClick(`creator=${item.name}`)}>
                    <img src={item.avatar} className="icon-square" alt={`${item.name}'s avatar`} /> {item.name}
                </div>
            );

            this.setState((prevState, props) => ({
                authors: authorList
            }));
        });
    }
    
    render() {
        return(
            <Dropdown name="Author" values={this.state.authors} />
        );
    }
}