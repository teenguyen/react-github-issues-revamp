import type { RepoLabel } from "@/queries/labels";
import Dropdown from "../atoms/dropdown";
import styles from "./issues-filter.module.css";

export const DEFAULT_LABEL = "";

export const ISSUE_SORT_BY = {
  CREATED: "created",
  UPDATED: "updated",
  COMMENTS: "comments",
} as const;
export type IssueSortBy = (typeof ISSUE_SORT_BY)[keyof typeof ISSUE_SORT_BY];

export const ISSUE_SORT_DIRECTION = {
  ASC: "asc",
  DESC: "desc",
} as const;
export type IssueSortDirection =
  (typeof ISSUE_SORT_DIRECTION)[keyof typeof ISSUE_SORT_DIRECTION];

const ISSUE_SORT_BY_OPTIONS: ReadonlyArray<{
  value: IssueSortBy;
  label: string;
}> = [
  { value: ISSUE_SORT_BY.CREATED, label: "Created on" },
  { value: ISSUE_SORT_BY.UPDATED, label: "Last updated" },
  { value: ISSUE_SORT_BY.COMMENTS, label: "Total comments" },
];

const ISSUE_ORDER_LABELS: Record<
  IssueSortBy,
  Record<IssueSortDirection, string>
> = {
  [ISSUE_SORT_BY.CREATED]: {
    [ISSUE_SORT_DIRECTION.DESC]: "Newest",
    [ISSUE_SORT_DIRECTION.ASC]: "Oldest",
  },
  [ISSUE_SORT_BY.UPDATED]: {
    [ISSUE_SORT_DIRECTION.DESC]: "Newest",
    [ISSUE_SORT_DIRECTION.ASC]: "Oldest",
  },
  [ISSUE_SORT_BY.COMMENTS]: {
    [ISSUE_SORT_DIRECTION.DESC]: "Most",
    [ISSUE_SORT_DIRECTION.ASC]: "Fewest",
  },
};

function isIssueSortBy(value: string): value is IssueSortBy {
  return Object.values(ISSUE_SORT_BY).includes(value as IssueSortBy);
}

function isIssueSortDirection(value: string): value is IssueSortDirection {
  return Object.values(ISSUE_SORT_DIRECTION).includes(
    value as IssueSortDirection,
  );
}

export default function IssuesFilter({
  labels,
  repoReady,
  labelFilter,
  onLabelFilterChange,
  issueSortBy,
  onIssueSortByChange,
  issueSortDirection,
  onIssueSortDirectionChange,
}: {
  labels: RepoLabel[];
  repoReady: boolean;
  labelFilter: string;
  onLabelFilterChange: (value: string) => void;
  issueSortBy: IssueSortBy;
  onIssueSortByChange: (value: IssueSortBy) => void;
  issueSortDirection: IssueSortDirection;
  onIssueSortDirectionChange: (value: IssueSortDirection) => void;
}) {
  const disabled = !repoReady;

  return (
    <div className={styles.controls}>
      <Dropdown
        id="issues-label-filter"
        label="Filter by label"
        value={labelFilter}
        onChange={(e) => onLabelFilterChange(e.target.value)}
        disabled={disabled}
      >
        <option value={DEFAULT_LABEL}>All labels</option>
        {labels.map((label) => (
          <option key={label.name} value={label.name}>
            {label.name}
          </option>
        ))}
      </Dropdown>
      <div className={styles.sortRow}>
        <Dropdown
          id="issues-sort-by"
          label="Sort by"
          className={styles.sortBy}
          value={issueSortBy}
          onChange={(e) => {
            const value = e.target.value;
            if (!isIssueSortBy(value)) return;
            onIssueSortByChange(value);
          }}
          disabled={disabled}
        >
          {ISSUE_SORT_BY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Dropdown>
        <Dropdown
          id="issues-sort-order"
          label="Order"
          className={styles.sortOrder}
          value={issueSortDirection}
          onChange={(e) => {
            const value = e.target.value;
            if (!isIssueSortDirection(value)) return;
            onIssueSortDirectionChange(value);
          }}
          disabled={disabled}
        >
          <option value={ISSUE_SORT_DIRECTION.DESC}>
            {ISSUE_ORDER_LABELS[issueSortBy][ISSUE_SORT_DIRECTION.DESC]}
          </option>
          <option value={ISSUE_SORT_DIRECTION.ASC}>
            {ISSUE_ORDER_LABELS[issueSortBy][ISSUE_SORT_DIRECTION.ASC]}
          </option>
        </Dropdown>
      </div>
    </div>
  );
}
