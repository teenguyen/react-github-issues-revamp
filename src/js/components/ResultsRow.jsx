import React from 'react';

import { AlertTriangle, Check, X, MessageSquare } from 'react-feather';
import Label from './Label.jsx'

export default function ResultsRow(props) {
    let state = setIssueStateIcon(props.results.state);
    let date = setHumanisedDates(props.results.createdDate);
    let labels = setLabels(props.results.labels);
    let avatars = setAvatars(props.results.assignees);

    function setIssueStateIcon(state) {
        switch (state) {
            case "open":
                return <AlertTriangle className="alert-orange" />;
            case "closed":
                return <Check className="success-green" />;
            default:
                return <X className="fail-red" />;
        }
    }
    
    function setHumanisedDates(createdDate) {
        let humanisedDate = "an unknown time";
        // difference divided by milliseconds/seconds/minutes
        let time = Math.round((Date.now() - Date.parse(createdDate))/1000/60/60);
        if (time < 24) {
            // divided by hours
            time <= 1 ? humanisedDate = "less than an hour" : humanisedDate = `${time} hours`;
        } else {
            // divided by days
            time = Math.round(time/24);
            time <= 1 ? humanisedDate = "a day" : humanisedDate = `${time} days`;
        }
        return humanisedDate;
    }
    
    function setLabels(labels) {
        let labelList = []
        if (labels.length > 0) {
            labelList = labels.map((label, idx) =>
                <Label key={idx} name={label.name} color={label.color} />
            )
        }
    
        return labelList;
    }
    
    function setAvatars(assignees) {
        let avatarList = [];
        if (assignees.length > 0) {
            avatarList = assignees.map((assignee, idx) => 
                <a key={idx} href={assignee.html_url}>
                    <img src={assignee.avatar_url} alt="Assignee's avatar" />
                </a>
            )
        }
    
        return avatarList;
    }

    return(
        <tr id={props.id}>
            <td>
                <span className="icon-span" title={props.results.state}>
                    {state}
                </span>
            </td>
            <td className="details">
                <div className="title">
                    <a href={props.results.issueUrl}>{props.results.title}</a>
                </div>
                <div className="subtext">
                    #{props.results.number} opened {date} ago by <a href={props.results.userUrl}>{props.results.user}</a>
                </div>
                <div>
                    {labels}
                </div>
            </td>
            <td className="avatars">
                {avatars}
            </td>
            <td className="comments">
                <span className="icon-span">
                    <a href={props.results.issueUrl}><MessageSquare /> {props.results.comments}</a>
                </span>
            </td>
        </tr>
    );
}