import { ProductForm, StoreDashboard } from "@/components";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

type Props = {};

const ProductId = (props: Props) => {
  const router = useRouter();
  const { id: storeId, pid: productId } = router.query;
  // const handleUpdate = () => { third }
  return (
    <StoreDashboard>
      ProductId
      <div>{JSON.stringify(storeId)}</div>
      {/* <ProductForm mutation={handleUpdate} /> */}
    </StoreDashboard>
  );
};

export default ProductId;
