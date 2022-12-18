import { useState } from "react";
import "./Filter.scss";

export default function Filter({ label, ...props }: { label: string }) {
  return (
    <div>
      <button>{label}</button>
      <div className="filter-list">
        <ul></ul>
      </div>
    </div>
  );
}
