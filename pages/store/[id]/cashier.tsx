import {
  CashierForm,
  Pagination,
  PerPageSelect,
  ProductCard,
  SearchInput,
  StoreDashboard,
} from "@/components/index";
import axios from "@/helper/lib/api";
import React, { useState } from "react";
import useSWR from "swr";
import qs from "qs";
import { useRouter } from "next/router";
import useAuth from "@/helper/hooks/useAuth";

type Props = {};

const Cashier = (props: Props) => {
  const router = useRouter();
  const storeId = router.query.id;
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);

  const query = qs.stringify(
    {
      filter: { name: `${search}`, store_id: storeId },
      limit: perPage,
      page: pageIndex,
    },
    { encodeValuesOnly: true }
  );
  const {
    data: products,
    error,
    mutate,
  } = useSWR(`/api/products?${query}`, (url) =>
    axios.get(url).then((res) => res.data)
  );

  const [cart, setCart] = useState<any>([]);

  const handleAddCart = (item: any) => {
    const product = {
      id: item.id,
      name: item.name,
      sell_price: item.sell_price,
      qty: item.qty,
      orderQty: 1,
    };

    if (cart.filter((el: any) => el.id === item.id).length > 0) return;

    const newCart = [...cart, product];
    setCart(newCart);
  };

  return (
    <StoreDashboard>
      <div className="flex flex-col gap-4 relative sm:mr-[300px]">
        <div className="flex gap-4">
          <PerPageSelect onChange={(e) => setPerPage(e.target.value)} />
          <SearchInput onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4">
          {products &&
            products.data
              .filter((item: any) => item.qty > 0)
              .map((item: any) => {
                return (
                  <ProductCard
                    key={item.id}
                    data={item}
                    onClick={() => handleAddCart(item)}
                  />
                );
              })}
        </div>
      </div>
      {products && <Pagination data={products} setPage={setPageIndex} />}

      <CashierForm
        cart={cart}
        setCart={setCart}
        mutation={mutate}
        storeId={storeId}
      />
    </StoreDashboard>
  );
};

export default Cashier;
