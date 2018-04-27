import React from 'react';

import Label from './Label.jsx';

export default function Filters(props) {
    let filters = props.filters.map(filter =>
        <Label key={filter} name={`${filter} x`} color="f2f2f2" onClick={() => props.onClick(filter)}/>
    )

    return (
        <div>
            Filters: {filters}
        </div>
    );
}