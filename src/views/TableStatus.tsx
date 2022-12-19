import { AlertTriangle, Check } from "react-feather";
import "./TableStatus.scss";

type TableStatusProps = {
  openCount: number | string;
  closedCount: number | string;
};

const TableStatus = ({ openCount, closedCount }: TableStatusProps) => {
  return (
    <div id="table-status">
      <span>
        <AlertTriangle className="icon-alert" />
        {openCount} Open
      </span>
      <span>
        <Check className="icon-check" />
        {closedCount} Closed
      </span>
    </div>
  );
};

export default TableStatus;
