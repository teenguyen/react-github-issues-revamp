import { createContext, useEffect, useState } from "react";
import Filter from "./components/Filter";
import Pagination from "./views/Pagination";
import Table from "./views/Table";
import TableStatus from "./views/TableStatus";
import { HEADERS } from "./utils/constants";
import { RowProps } from "./utils/types";
import "./App.scss";

export interface AppInterface {
  data: RowProps[];
  openFilter: string | null;
  setOpenFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const AppCtx = createContext<AppInterface | null>(null);

const ENDPOINT = "https://api.github.com/repos/Facebook/react/issues";

function App() {
  const [openFilter, setOpenFilter] = useState<string>("");
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      fetch(ENDPOINT, {
        method: "GET",
        headers: HEADERS
      })
        .then(response => response.json())
        .then(data => {
          setData(data);
        });
    })();
  }, []);

  const appContext: AppInterface = {
    data,
    openFilter,
    setOpenFilter
  };

  return (
    <AppCtx.Provider value={appContext}>
      <div id="app">
        <header>
          <h1>Github Issues</h1>
        </header>
        <div id="github-issues">
          <TableStatus />

          <div>
            <h2>Filters:</h2>
            <div id="table-filter">
              <Filter label="Author" />
              <Filter label="Labels" />
              <Filter label="Projects" />
              <Filter label="Milestones" />
              <Filter label="Assignee" />
              <Filter label="Sort" />
            </div>
          </div>

          <Table />
          <Pagination />
        </div>
      </div>
    </AppCtx.Provider>
  );
}

export default App;
