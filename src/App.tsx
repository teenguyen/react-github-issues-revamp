import { useEffect, useState } from "react";
import { AlertTriangle, Check } from "react-feather";
import "./App.scss";

function App() {
  const [token, setToken] = useState("");
  const [openCount, setOpenCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);

  return (
    <div id="app">
      <header>
        <h1>Github Issues</h1>
      </header>
      <div id="github-issues">
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

        <div className="table-filter">
          <span className="icon-span">
            <a>
              Author
              <i data-feather="chevron-down"></i>
            </a>
          </span>
          <span className="icon-span">
            <a>
              Labels
              <i data-feather="chevron-down"></i>
            </a>
          </span>
          <span className="icon-span">
            <a>
              Projects
              <i data-feather="chevron-down"></i>
            </a>
          </span>
          <span className="icon-span">
            <a>
              Milestones
              <i data-feather="chevron-down"></i>
            </a>
          </span>
          <span className="icon-span">
            <a>
              Assignee
              <i data-feather="chevron-down"></i>
            </a>
          </span>
          <span className="icon-span">
            <a>
              Sort
              <i data-feather="chevron-down"></i>
            </a>
          </span>
        </div>

        <table className="table-contents">
          <tbody>
            <tr>
              <td>
                <span className="icon-span">
                  <i data-feather="alert-triangle"></i>
                </span>
              </td>
              <td className="details">
                <div>My fancy github issues table</div>
                <div className="subtext">
                  #12345 opened 1 hour ago by ryuuseiistar
                </div>
                <div className="subtext">
                  <span className="label">Label1</span>
                  <span className="label">Label2</span>
                </div>
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
            <tr>
              <td>
                <span className="icon-span">
                  <i data-feather="alert-triangle"></i>
                </span>
              </td>
              <td className="details">
                <div>My fancy github issues table</div>
                <div className="subtext">
                  #12345 opened 1 hour ago by ryuuseiistar
                </div>
                <div className="subtext">
                  <span className="label">Label1</span>
                  <span className="label">Label2</span>
                </div>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
