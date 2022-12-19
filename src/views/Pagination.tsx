import { useState } from "react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight
} from "react-feather";
import Pager from "../components/Pager";
import "./Table.scss";

type PaginationProps = {
  linkHeader: string | null;
};

const Pagination = ({ linkHeader }: PaginationProps) => {
  const [first, setFirst] = useState<string>("");
  const [previous, setPrevious] = useState<string>("");
  const [next, setNext] = useState<string>("");
  const [last, setLast] = useState<string>("");

  if (linkHeader) {
    let links = linkHeader.split(", ").map(link => link.split("; "));
    console.log(links);
  }

  return (
    <div>
      {/* <Pager icon={ChevronsLeft} link={first} />
      <Pager icon={ChevronLeft} link={previous} />
      {}
      <Pager icon={ChevronRight} link={next} />
      <Pager icon={ChevronsRight} link={last} /> */}
    </div>
  );
};

export default Pagination;
