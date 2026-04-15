"use client";

import { type CSSProperties } from "react";
import clsx from "clsx";
import { MessageSquare } from "react-feather";
import { Issue } from "@/queries/issues";
import tableStyles from "../organisms/issues-table.module.css";
import rowStyles from "./issues-row.module.css";

function labelStyle(color: string, isDark: boolean): CSSProperties {
  const colorCode = `#${color}`;
  return {
    borderColor: colorCode,
    backgroundColor: `${colorCode}40`, // 25% opacity
    color: isDark ? colorCode : "#0f172abf", // --text-color
  };
}

export default function IssuesRow({ issue }: { issue: Issue }) {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <tr
      key={issue.html_url}
      className={rowStyles.row}
      onClick={() =>
        window.open(issue.html_url, "_blank", "noopener noreferrer")
      }
    >
      <th className={tableStyles.num} scope="row">
        {issue.number}
      </th>
      <td className={tableStyles.titleCell}>
        {issue.title}
        <div className={clsx(rowStyles.meta, rowStyles.user)}>
          {issue.user?.login != null && <span>by {issue.user.login}</span>}
        </div>
        {issue.labels.length > 0 && (
          <ul className={tableStyles.labels}>
            {issue.labels.map((label) => (
              <li
                key={label.name}
                className={rowStyles.label}
                style={labelStyle(label.color, isDark)}
              >
                {label.name}
              </li>
            ))}
          </ul>
        )}
      </td>
      <td className={tableStyles.comments}>
        <div className={rowStyles.comments}>
          {issue.comments > 0 && (
            <button
              className={rowStyles.commentButton}
              onClick={() =>
                window.open(issue.html_url, "_blank", "noopener noreferrer")
              }
            >
              {issue.comments}
              {<MessageSquare size={14} />}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
