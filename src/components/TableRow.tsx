import { AlertTriangle, Check, X, MessageSquare } from "react-feather";
import { RowProps } from "../utils/types";
import LabelChip from "./LabelChip";
import "./TableRow.scss";

const TableRow = ({ row }: { row: RowProps }) => {
  const { id, title, number, created_at, state, user, labels } = row;

  const stateTd = () => {
    if (state === "open") return <AlertTriangle />;
    if (state === "closed") return <Check />;
    return <X />;
  };

  return (
    <tr>
      <td>{stateTd()}</td>
      <td className="details">
        <div>{title}</div>
        <div className="subtext">
          #{number} opened 1 hour ago by {user.login}
        </div>
        {labels.map(label => <LabelChip label={label} />)}
      </td>
      <td className="table-right-align">
        <span className="icon-span">
          <i data-feather="github"></i>
        </span>
      </td>
      <td className="table-right-align">
        <span className="icon-span">
          <i data-feather="message-square"></i>
        </span>
      </td>
    </tr>
  );
};

export default TableRow;
