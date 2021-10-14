import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
  MdArrowDownward,
  MdArrowUpward,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import "./table.scss";

export interface Columns {
  field: string;
  headerName?: string;
  hide?: boolean;
  width?: number;
  type: "string" | "number" | "date";
  formatter?: any;
  fixed?: boolean;
}
interface Props {
  data: any;
  columns: Columns[];
  loading: boolean;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  label?: string;
}
const TableClient: React.FC<Props> = ({
  data,
  columns,
  loading,
  selected,
  setSelected,
  label,
}) => {
  const [inputSearch, setInputSearch] = useState("");
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [sort, setSort] = useState({ field: "", direction: "" });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [result, setResult] = useState(0);
  const handleSort = (field) => {
    if (sort.field !== field) {
      setSort({ field, direction: "desc" });
    } else if (sort.field === field) {
      if (sort.direction === "desc") {
        setSort({ field, direction: "asc" });
      } else if (sort.direction === "asc") {
        setSort({ field: "", direction: "" });
      }
    }
  };
  const handleLimit = (e: any) => {
    setLimit(Number(e.target.value));
    const dataPointer = (page - 1) * e.target.value + 1;
    if (dataPointer > result) {
      const pagePointer = Math.ceil(result / e.target.value);
      setPage(pagePointer);
    }
  };
  const handlePage = (e: "next" | "before") => {
    if (e === "next") {
      const maxPage = Math.ceil(result / limit);
      if (page < maxPage) {
        setPage(page + 1);
      }
    } else if (e === "before") {
      if (page > 1) {
        setPage(page - 1);
      }
    }
  };
  const handleSelection = (e: any, id: string) => {
    if (e.target.id === "span") return;

    if (selected == id) {
      setSelected(``);
    } else {
      setSelected(`${id}`);
    }
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      setSearch(inputSearch);
    }
  };

  useEffect(() => {
    let newData = [...data];
    if (search) {
      newData = newData.filter((item) => {
        return columns.reduce((acc: boolean, curr) => {
          if (
            `${item[curr.field]}`
              .toLowerCase()
              .includes(`${search}`.toLowerCase())
          )
            acc = true;
          return acc;
        }, false);
      });
    }
    setResult(newData.length);
    if (sort.field) {
      const type = columns.find((col) => col.field === sort.field)?.type;
      if (type === "string") {
        if (sort.direction === "desc")
          newData = newData.sort((a, b) => {
            return a[sort.field] > b[sort.field] ? -1 : 1;
          });
        if (sort.direction === "asc")
          newData = newData.sort((a, b) => {
            return a[sort.field] > b[sort.field] ? 1 : -1;
          });
      } else if (type === "date") {
        if (sort.direction === "desc")
          newData = newData.sort((a, b) => {
            return (
              new Date(b[sort.field]).getTime() -
              new Date(a[sort.field]).getTime()
            );
          });
        if (sort.direction === "asc")
          newData = newData.sort((a, b) => {
            return (
              new Date(a[sort.field]).getTime() -
              new Date(b[sort.field]).getTime()
            );
          });
      } else if (type === "number") {
        if (sort.direction === "desc")
          newData = newData.sort((a, b) => {
            return Number(b[sort.field]) - Number(a[sort.field]);
          });
        if (sort.direction === "asc")
          newData = newData.sort((a, b) => {
            return Number(a[sort.field]) - Number(b[sort.field]);
          });
      }
    }
    const start = (page - 1) * limit;
    const end = page * limit;

    newData = newData.slice(start, end);
    setRows(newData);
  }, [sort, data, page, limit, search, columns]);
  return (
    <div className="table--main-container">
      <div className="table--search-container">
        <label>Search</label>
        <input
          type="text"
          className={`table--search-input`}
          onChange={(e) => setInputSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Masukan No RM"
        />
        <small>{label}</small>
      </div>

      <div className="table--container" style={{ maxHeight: "80vh" }}>
        <table className="table--table" style={{ borderSpacing: 0 }}>
          <thead>
            <tr>
              <th className={`table--th-first`}></th>
              {columns.map((col) => {
                if (!col.hide)
                  return (
                    <th
                      className={`table--th`}
                      key={col.field}
                      onClick={() => handleSort(col.field)}
                    >
                      <div className="table--th-content">
                        {col.headerName}
                        <span>
                          {sort.field === col.field &&
                            (sort.direction === "desc" ? (
                              <MdArrowDownward />
                            ) : (
                              <MdArrowUpward />
                            ))}
                        </span>
                      </div>
                    </th>
                  );
              })}
            </tr>
          </thead>
          <tbody>
            {loading &&
              [...Array(limit)].map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr
                      className={`table--row-loading ${
                        index % 2 === 0 ? "" : `table--row-loading-stripe`
                      }`}
                    >
                      <td className="table--td-loading-first">
                        <FaCheckSquare
                          className={`table--icon table--icon-hidden`}
                        />
                      </td>
                      {columns.map((col) => {
                        if (!col.hide)
                          return (
                            <td
                              key={col.field}
                              style={{ minWidth: col.width || 150 }}
                              className="table--td-loading"
                            >
                              <div className={`table--skeleton-box`}></div>
                            </td>
                          );
                      })}
                    </tr>
                  </React.Fragment>
                );
              })}
            {!loading &&
              data.map((row: any, index: number) => {
                return (
                  <tr
                    className={`table--row ${
                      selected == row.id && `table--row-selected`
                    }`}
                    onClick={(e) => handleSelection(e, row.id)}
                    key={row.id}
                  >
                    <td
                      className={` ${
                        index % 2 === 0 ? "" : "table--row-stripe"
                      } table--row-first`}
                    >
                      <FaCheckSquare
                        className={`table--icon ${
                          selected == row.id
                            ? "table--icon-visible"
                            : "table--icon-hidden"
                        }`}
                      />
                    </td>
                    {columns.map((col, ind) => {
                      if (!col.hide) {
                        const left = columns
                          .slice(0, ind + 1)
                          .reduce((acc, curr, i) => {
                            if (i < ind && curr.width) {
                              acc += curr.width;
                            }
                            return acc;
                          }, 0);
                        return (
                          <td
                            key={col.field}
                            style={{ minWidth: col.width || 150, left }}
                            className={`table--row ${
                              col.fixed && "table--row-sticky"
                            } ${index % 2 === 0 ? "" : "table--row-stripe"}`}
                          >
                            <span className="table--row-text">
                              {col.formatter
                                ? col.formatter(row[col.field])
                                : row[col.field]}
                            </span>
                          </td>
                        );
                      }
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="table--tools-container">
        <div className="table--tools">
          <div className="table--limit">
            <select
              value={limit}
              onChange={handleLimit}
              className="table--select-limit"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="table--info-container">
            {loading ? (
              <div className={`table--skeleton-box-32`}></div>
            ) : (
              <>
                {(page - 1) * limit + 1} -
                {page * limit < result ? page * limit : result} / {result} Data
              </>
            )}
          </div>
          <div className="table--button-container">
            <button
              onClick={() => handlePage("before")}
              className="table--button"
            >
              <MdKeyboardArrowLeft />
            </button>
            <span className="table--page">{page}</span>
            <button
              onClick={() => handlePage("next")}
              className="table--button"
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableClient;
