import { useContext } from "react";
import { AppCtx } from "../App";
import TableRow from "../components/TableRow";

const Table = () => {
  const appCtx = useContext(AppCtx);

  return (
    <table>
      <tbody>
        {appCtx?.data.map(row => (
          <TableRow key={row.id} row={row} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
