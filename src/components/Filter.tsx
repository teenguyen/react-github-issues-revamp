import { useContext, useEffect, useRef, useState } from "react";
import { ChevronDown } from "react-feather";
import { AppCtx } from "../App";
import "./Filter.scss";

const DEFAULT_MIN_WIDTH = 100;

type FilterProps = {
  label: string;
};

const Filter = ({ label }: FilterProps) => {
  const [minWidth, setMinWidth] = useState<number>(DEFAULT_MIN_WIDTH);
  const filterRef = useRef<HTMLSpanElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const appCtx = useContext(AppCtx);

  useEffect(() => {
    if (filterRef.current) {
      let newMinWidth = filterRef.current.clientWidth;
      if (newMinWidth > DEFAULT_MIN_WIDTH) setMinWidth(newMinWidth);
    }
  }, [filterRef]);

  useEffect(() => {
    const handleClickAway = (event: MouseEvent): void => {
      if (
        popperRef.current &&
        !popperRef.current?.contains(event.target as Node)
      ) {
        appCtx!.setOpenFilter("");
      }
    };

    document.addEventListener("mousedown", handleClickAway);
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, [popperRef, appCtx]);

  const open = appCtx!.openFilter === label;

  return (
    <span ref={filterRef} className="filter">
      <button
        className={open ? "open" : ""}
        onClick={() => appCtx!.setOpenFilter(!open ? label : "")}
      >
        {label}
        <ChevronDown />
      </button>
      <div
        ref={popperRef}
        className="filter-list"
        style={{
          minWidth,
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden"
        }}
      >
        <ul>
          <li>A</li>
          <li>B</li>
          <li>C</li>
        </ul>
      </div>
    </span>
  );
};

export default Filter;
