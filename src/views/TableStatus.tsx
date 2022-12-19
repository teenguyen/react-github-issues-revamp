import { useEffect, useState } from "react";
import { AlertTriangle, Check } from "react-feather";
import "./TableStatus.scss";

const ENDPOINT =
  "https://api.github.com/search/issues?per_page=1&q=repo:facebook/react+type:issue+";
const IS_OPEN = "state:open";
const IS_CLOSED = "state:closed";

const FETCH_GET = {
  method: "GET",
  headers: {
    accept: "application/vnd.github+json"
  }
};

const TableStatus = () => {
  const [openCount, setOpenCount] = useState<number>(0);
  const [closedCount, setClosedCount] = useState<number>(0);

  useEffect(() => {
    (async () => {
      Promise.all([
        fetch(`${ENDPOINT}${IS_OPEN}`, FETCH_GET).then(resp => resp.json()),
        fetch(`${ENDPOINT}${IS_CLOSED}`, FETCH_GET).then(resp => resp.json())
      ]).then(([open, closed]) => {
        setOpenCount(open.total_count);
        setClosedCount(closed.total_count);
      });
    })();
  }, []);

  return (
    <div id="table-status">
      <span>
        <AlertTriangle id="alert-icon" />
        {openCount} Open
      </span>
      <span>
        <Check id="check-icon" />
        {closedCount} Closed
      </span>
    </div>
  );
};

export default TableStatus;
