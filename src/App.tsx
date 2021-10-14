import React, { useState } from "react";
import Table, { Columns } from "./core/Table/Table";
import Template from "./core/Template/Template";

const columns: Columns[] = [
  { field: "id", hide: true },
  { field: "username", headerName: "Username" },
];

function App() {
  const [data, setData] = useState([
    { id: 1, username: "samir" },
    { id: 2, username: "samir" },
    { id: 3, username: "samir" },
    { id: 4, username: "samir" },
  ]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const [sort, setSort] = useState<any>({ direction: "", field: "" });
  return (
    <>
      <Template>
        <Table
          data={data}
          columns={columns}
          limit={limit}
          loading={false}
          // loading={true}
          page={page}
          result={data.length}
          selected={selected}
          setLimit={setLimit}
          setPage={setPage}
          setSearch={setSearch}
          setSelected={setSelected}
          setSort={setSort}
          sort={sort}
          label="pencarian berdasarkan nomor rm"
        />
      </Template>
    </>
  );
}

export default App;
