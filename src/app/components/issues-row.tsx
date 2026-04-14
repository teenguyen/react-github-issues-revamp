"use client";

import { type CSSProperties } from "react";
import clsx from "clsx";
import { getContrast, transparentize } from "color2k";
import { MessageSquare } from "react-feather";
import { Issue } from "@/queries/issues";
import tableStyles from "./issues-table.module.css";
import rowStyles from "./issues-row.module.css";

function labelStyle(color: string, isDark: boolean): CSSProperties {
  const colorCode = `#${color}`;
  if (isDark) {
    return {
      backgroundColor: `${colorCode}33`,
      color: colorCode,
    };
  } else {
    return {
      backgroundColor: colorCode,
      color:
        getContrast(colorCode, "#ffffff") >= getContrast(colorCode, "#000000")
          ? "#ffffff"
          : "#000000",
    };
  }
}

export default function IssuesRow({ issue }: { issue: Issue }) {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <tr key={issue.html_url}>
      <th className={tableStyles.num} scope="row">
        {issue.number}
      </th>
      <td className={tableStyles.titleCell}>
        <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
          {issue.title}
        </a>
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
              className={rowStyles.comments}
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
