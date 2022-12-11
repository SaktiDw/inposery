import { Product } from "@/helper/type/Response";
import { Products } from "@/mocks/ProductsResponse";
import { screen, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductCard from "./ProductCard";

describe("ProductCard", () => {
  const tree = (data: Product) =>
    render(<ProductCard data={data} onClick={() => null} />);

  it("should be rendered normal ", () => {
    const { container } = tree(Products.data[0]);
    expect(container).toBeDefined();
  });

  it("should be rendered img if exist ", () => {
    const { queryByTestId } = tree(Products.data[2]);
    expect(queryByTestId("img")).toBeDefined();
  });

  it("shouldn't be rendered img if not exist ", () => {
    const { queryByTestId } = tree(Products.data[0]);
    expect(queryByTestId("img")).toBeNull();
  });
});
