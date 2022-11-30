// import React, { useState, useEffect } from "react";
// import {
//   Pagination,
//   PerPageSelect,
//   SearchInput,
//   StoreDashboard,
// } from "@/components";
// import axios from "@/helper/lib/axios";
// import { useRouter } from "next/router";
// import useSWR, { SWRConfig } from "swr";
// import Table, { TableColumn } from "@/components/Tables/Table";
// import qs from "qs";

// const fetcher = (url: string) => axios.get(url).then((res) => res.data);
// const API = `${process.env.API_URL}/api/test?page=1&limit=1000`;

// export async function getServerSideProps() {
//   const repoInfo = await fetcher(API);
//   return {
//     props: {
//       fallback: {
//         [API]: repoInfo,
//       },
//     },
//   };
// }

// const Repo = () => {
//   const { data, error } = useSWR(API);
//   const router = useRouter();
//   const storeId = router.query.id;

//   const [perPage, setPerPage] = useState("1000");
//   const [search, setSearch] = useState("");
//   const [pageIndex, setPageIndex] = useState(1);

//   const query = qs.stringify(
//     {
//       filter: { "product.name": `${search}`, store_id: storeId },
//       limit: perPage,
//       page: pageIndex,
//     },
//     { encodeValuesOnly: true }
//   );
//   // there should be no `undefined` state

//   if (error) return <StoreDashboard>An error has occurred.</StoreDashboard>;
//   if (!data) return <StoreDashboard>Loading...</StoreDashboard>;

//   const columns: TableColumn<any>[] = [
//     { title: "#", key: "id", dataType: "numbering" },
//     {
//       title: "Name",
//       key: "product",
//       render(val, index) {
//         return val.product?.name;
//       },
//     },
//     {
//       title: "Price",
//       key: "price",
//       render: (val) => (
//         <div className="flex gap-4">
//           {val.price.toLocaleString("id-ID", {
//             style: "currency",
//             currency: "IDR",
//           })}
//         </div>
//       ),
//     },
//     { title: "Quantity", key: "qty" },
//     { title: "Type", key: "type" },
//     {
//       title: "Date",
//       key: "created_at",
//       render: (val) => new Date(val.created_at).toLocaleString(),
//     },
//   ];

//   return (
//     <StoreDashboard>
//       <div className="flex flex-col gap-4">
//         <div className="flex gap-4">
//           <PerPageSelect onChange={(e) => setPerPage(e.target.value)} />
//           <SearchInput onChange={(e) => setSearch(e.target.value)} />
//         </div>
//         {data && <Table data={data} columns={columns} />}
//       </div>
//       {data && <Pagination data={data} setPage={setPageIndex} />}
//     </StoreDashboard>
//   );
// };

// export default async function App({ fallback }: any) {
//   return (
//     <SWRConfig value={{ fallback }}>
//       <Repo />
//     </SWRConfig>
//   );
// }

import {
  Pagination,
  PerPageSelect,
  SearchInput,
  StoreDashboard,
} from "@/components";
import Table, { TableColumn } from "@/components/Tables/Table";
import axios from "@/helper/lib/axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {
  data: any;
};

const SSRTest = (props: Props) => {
  const router = useRouter();
  const storeId = router.query.id;

  const [perPage, setPerPage] = useState("1000");
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(1);

  if (!props.data) return <>Loading...</>;

  const columns: TableColumn<any>[] = [
    { title: "#", key: "id", dataType: "numbering" },
    {
      title: "Name",
      key: "product",
      render(val, index) {
        return val.product?.name;
      },
    },
    {
      title: "Price",
      key: "price",
      render: (val) => (
        <div className="flex gap-4">
          {val.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </div>
      ),
    },
    { title: "Quantity", key: "qty" },
    { title: "Type", key: "type" },
    {
      title: "Date",
      key: "created_at",
      render: (val) => new Date(val.created_at).toLocaleString(),
    },
  ];

  return (
    <StoreDashboard>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <PerPageSelect onChange={(e) => setPerPage(e.target.value)} />
          <SearchInput onChange={(e) => setSearch(e.target.value)} />
        </div>
        {props.data && <Table data={props.data} columns={columns} />}
      </div>
      {props.data && <Pagination data={props.data} setPage={setPageIndex} />}
    </StoreDashboard>
  );
};

export default SSRTest;

export async function getServerSideProps(context: any) {
  const res = await axios.get(
    `${process.env.API_URL}/api/test?page=1&limit=1000`
  );
  const data = res.data;
  return {
    props: {
      data,
    },
  };
}
