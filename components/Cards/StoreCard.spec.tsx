import { Store } from "@/helper/type/Store";
import { Stores } from "@/mocks/StoresResponse";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StoreCard from "./StoreCard";

describe("StoreCard", () => {
  const tree = (data: Store) =>
    render(<StoreCard data={data} onDelete={() => null} onEdit={() => null} />);

  it("should be rendered", () => {
    const { container } = tree(Stores.data[0]);
    expect(container).toBeDefined();
  });

  it("should be rendered img if exist ", () => {
    const { queryByTestId } = tree(Stores.data[0]);
    expect(queryByTestId("img")).toBeDefined();
  });

  it("shouldn't be rendered img if not exist ", () => {
    const { queryByTestId } = tree(Stores.data[1]);
    expect(queryByTestId("img")).toBeNull();
  });
});
