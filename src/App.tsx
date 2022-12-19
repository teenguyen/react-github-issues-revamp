import { createContext, useEffect, useState } from "react";
import Filter from "./components/Filter";
import Pagination from "./views/Pagination";
import Table from "./views/Table";
import TableStatus from "./views/TableStatus";
import { HEADERS } from "./utils/constants";
import { RowProps } from "./utils/types";
import "./App.scss";

export type AppProps = {
  data: RowProps[] | null;
  openFilter: string | null;
  setOpenFilter: React.Dispatch<React.SetStateAction<string>>;
};

export const AppCtx = createContext<AppProps | null>(null);

const ENDPOINT = "https://api.github.com/repos/Facebook/react/issues";

function App() {
  const [openFilter, setOpenFilter] = useState<string>("");
  const [data, setData] = useState<RowProps[]>([]);
  const [linkHeader, setLinkHeader] = useState<string | null>("");

  useEffect(() => {
    (async () => {
      fetch(ENDPOINT, {
        method: "GET",
        headers: HEADERS
      })
        .then(response => {
          setLinkHeader(response.headers.get("link"));
          return response.json();
        })
        .then(data => {
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
