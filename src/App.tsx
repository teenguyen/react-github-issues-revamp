import { createContext, useEffect, useState } from "react";
import Filter from "./components/Filter";
import Pagination from "./views/Pagination";
import Table from "./views/Table";
import TableStatus from "./views/TableStatus";
import {
  ISSUES_ENDPOINT,
  SEARCH_ENDPOINT,
  IS_OPEN,
  IS_CLOSED,
  FETCH_GET
} from "./utils/constants";
import { RowProps } from "./utils/types";
import "./App.scss";

export type AppProps = {
  data: RowProps[] | null;
  openFilter: string | null;
  setOpenFilter: React.Dispatch<React.SetStateAction<string>>;
};

export const AppCtx = createContext<AppProps | null>(null);

function App() {
  const [openFilter, setOpenFilter] = useState<string>("");
  const [data, setData] = useState<RowProps[] | null>(null);
  const [linkHeader, setLinkHeader] = useState<string | null>("");
  const [openCount, setOpenCount] = useState<number | string>("?");
  const [closedCount, setClosedCount] = useState<number | string>("?");

  useEffect(() => {
    (async () => {
      Promise.all([
        fetch(`${SEARCH_ENDPOINT}${IS_OPEN}`, FETCH_GET).then(resp =>
          resp.json()
        ),
        fetch(`${SEARCH_ENDPOINT}${IS_CLOSED}`, FETCH_GET).then(resp =>
          resp.json()
        ),
        fetch(ISSUES_ENDPOINT, FETCH_GET).then(resp => {
          setLinkHeader(resp.headers.get("link"));
          return resp.json();
        })
      ]).then(([open, closed, data]) => {
        setOpenCount(open.total_count);
        setClosedCount(closed.total_count);
        setData(data);
      });
    })();
  }, []);

  const appContext: AppProps = {
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
          <TableStatus openCount={openCount} closedCount={closedCount} />

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
          <Pagination linkHeader={linkHeader} />
        </div>
      </div>
    </AppCtx.Provider>
  );
}

export default App;
