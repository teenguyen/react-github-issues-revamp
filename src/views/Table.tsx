import { useContext } from "react";
import { AppCtx } from "../App";
import TableRow from "../components/TableRow";
import { RowProps } from "../utils/types";
import "./Table.scss";

const Table = () => {
  const appCtx = useContext(AppCtx);
  let data = null;
  if (appCtx !== null) data = appCtx.data;

  return (
    <table>
      <tbody>
        {data &&
          data.map((row: RowProps) => <TableRow key={row.id} row={row} />)}
      </tbody>
    </table>
  );
};

export default Table;
