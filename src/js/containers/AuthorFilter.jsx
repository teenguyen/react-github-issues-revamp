import React from 'react';
import { Request } from './../utils/Request.js';

import Dropdown from './../components/Dropdown.jsx';

export default class AuthorFilter extends React.Component {
    constructor(props) {
        super(props);

        this.handleResponse = this.handleResponse.bind(this);
        this.state = {
            authors: []
        }
    }

    componentDidMount() {
        let authors = [];
        Request({schemaName:"assignees", getAllItems:true, completeResponse:authors, callback:this.handleResponse});
    }

    handleResponse(response) {
        let authors = []
        response.forEach((author) => {
            authors.push({
                key: author.id,
                name: author.login,
                avatar: author.avatar_url
            });
        });

        let authorList = authors.map((item) => 
            <div key={item.key} onClick={() => this.props.onClick(`creator=${item.name}`)}>
                <img src={item.avatar} className="icon-square" alt={item.name + "'s avatar"} /> {item.name}
            </div>
        );

        this.setState((prevState, props) => ({
            authors: authorList
        }));
    }
    
    render() {
        return(
            <Dropdown name="Author" values={this.state.authors} />
        );
    }
}