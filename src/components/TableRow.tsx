import { JSXElement } from "@babel/types";
import { AlertTriangle, Check, X, MessageSquare } from "react-feather";
import { RowProps } from "../utils/types";
import LabelChip from "./LabelChip";
import "./TableRow.scss";

const TableRow = ({ row }: { row: RowProps }) => {
  const {
    id,
    title,
    html_url,
    number,
    created_at,
    state,
    user,
    labels,
    // assignees,
    comments,
    comments_url
  } = row;

  const stateTd = () => {
    if (state === "open") return <AlertTriangle className="icon-alert" />;
    if (state === "closed") return <Check className="icon-check" />;
    return <X />;
  };

  const createdAtTd = () => {
    let humanisedDate = "an unknown time";
    // difference divided by milliseconds/seconds/minutes
    let time = Math.round(
      (Date.now() - Date.parse(created_at)) / 1000 / 60 / 60
    );
    if (time < 24) {
      // divided by hours
      time <= 1
        ? (humanisedDate = "less than an hour")
        : (humanisedDate = `${time} hours`);
    } else {
      // divided by days
      time = Math.round(time / 24);
      time <= 1 ? (humanisedDate = "a day") : (humanisedDate = `${time} days`);
    }
    return `${humanisedDate} ago`;
  };

  return (
    <tr id={id}>
      <td className="icon-td">{stateTd()}</td>
      <td className="details-td">
        <a href={html_url} className="title">
          {title}
        </a>
        <div className="subtext">
          #{number} opened {createdAtTd()} by{" "}
          <a href={user.html_url} className="link">
            {user.login}
          </a>
        </div>
        <div className="labels">
          {labels.map(label => (
            <LabelChip key={label.name} {...label} />
          ))}
        </div>
      </td>
      <td className="icon-td comments-td">
        {comments > 0 && (
          <>
            {comments}
            <a href={comments_url}>
              <MessageSquare className="icon-text" />
            </a>
          </>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
