import {
  CartButton,
  CashierForm,
  CategoriesFilter,
  CustomerForm,
  Input,
  Modal,
  Pagination,
  PerPageSelect,
  ProductCard,
  SearchInput,
  StoreLayout,
  SubmitButton,
} from "@/components/index";
import axios from "@/helper/lib/axios";
import React, { useState } from "react";
import useSWR from "swr";
import qs from "qs";
import { useRouter } from "next/router";
import useAuth from "@/helper/hooks/useAuth";
import { Product } from "@/helper/type/Response";
import { Cart, Customer } from "@/helper/type/Cashier";
import { AxiosResponse } from "axios";
import { ProductResponse } from "@/helper/type/Product";
import useToggle from "@/helper/hooks/useToggle";
import { Form, Formik } from "formik";
import { Option } from "react-multi-select-component";

type Props = {};

const Cashier = (props: Props) => {
  const router = useRouter();
  const storeId = router.query.id;
  const { isLoading } = useAuth({ middleware: "auth" });
  const { toggle, toggler, setToggle } = useToggle();
  const {
    toggle: customerToggle,
    toggler: customerToggler,
    setToggle: customerSetToggle,
  } = useToggle();

  const [perPage, setPerPage] = useState<string>("10");
  const [search, setSearch] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [categoriesFilter, setCategoriesFilter] = useState<Option[]>([]);

  const query = qs.stringify(
    {
      filter: {
        name: `${search}`,
        store_id: storeId,
        "category.name": `${categoriesFilter.map((item) => item.label)}`,
      },
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
    axios.get(url).then((res: AxiosResponse<ProductResponse>) => res.data)
  );

  const [customer, setCustomer] = useState<Customer[]>([]);
  const [cart, setCart] = useState<Cart[]>([]);

  const handleAddCustomer = async (values: Customer) => {
    if (customer.filter((item) => item.name === values.name).length > 0)
      throw error;
    customer.map((item) => (item.active = false));
    return setCustomer([...customer, values]);
  };

  if (customer.filter((item) => item.active === true).length > 0) {
    customer.filter((item) => item.active === true);
  } else {
    handleAddCustomer({ name: "random", active: true });
  }

  const activeCustomer = customer.filter((item) => item.active === true);

  const handleAddCart = (item: Product) => {
    const product = {
      id: item.id,
      name: item.name,
      sell_price: item.sell_price,
      qty: item.qty,
      orderQty: 1,
      customer: activeCustomer[0],
    };

    if (
      cart.filter(
        (el: Cart) =>
          el.id === product.id && activeCustomer[0].name === el.customer.name
      ).length > 0
    ) {
      const cartIndex = cart.findIndex(
        (el: Cart) =>
          el.id === product.id && activeCustomer[0].name === el.customer.name
      );
      const newCart = [...cart];
      newCart[cartIndex].orderQty = newCart[cartIndex].orderQty + 1;
      return setCart(newCart);
    } else {
      return setCart([...cart, product]);
    }
  };

  return (
    <StoreLayout>
      <div className="flex flex-col gap-4 relative lg:mr-[300px]">
        <div className="flex flex-wrap justify-between sm:justify-start gap-4">
          <PerPageSelect onChange={(e) => setPerPage(e.target.value)} />
          <SearchInput onChange={(e) => setSearch(e.target.value)} />
          <CategoriesFilter
            selected={categoriesFilter}
            onChange={setCategoriesFilter}
          />
          <button
            className=" py-2 px-4 shadow-lg rounded-lg bg-gradient-to-tl from-green-700 to-lime-500 text-white "
            onClick={customerToggler}
          >
            Add Customer
          </button>
          <CartButton
            onClick={toggler}
            cart={cart}
            currentCustomer={activeCustomer[0]}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4">
          {products
            ? products.data
                .filter((item: Product) => item.qty > 0)
                .map((item: Product) => {
                  return (
                    <ProductCard
                      key={item.id}
                      data={item}
                      onClick={() => handleAddCart(item)}
                    />
                  );
                })
            : "Loading..."}
        </div>
      </div>
      {products && <Pagination data={products} setPage={setPageIndex} />}
      <CashierForm
        isOpen={toggle}
        close={setToggle}
        customer={customer}
        setCustomer={setCustomer}
        cart={cart}
        setCart={setCart}
        mutation={mutate}
        storeId={storeId}
      />
      <Modal isOpen={customerToggle} close={() => customerSetToggle(false)}>
        <CustomerForm handleAddCustomer={handleAddCustomer} />
      </Modal>
    </StoreLayout>
  );
};

export default Cashier;
