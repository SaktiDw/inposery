import { render } from "@testing-library/react";
import { WrappedBuildError } from "next/dist/server/base-server";
import { afterEach, describe, expect, it, vi } from "vitest";
import OrderCard from "./OrderCard";

describe("OrderCard", () => {
  const data = [
    { id: 11, name: "Goodday", sell_price: 6000, qty: 60, orderQty: 1 },
    { id: 10, name: "Teh Kotak", sell_price: 5000, qty: 70, orderQty: 1 },
  ];
  const onUpdate = vi
    .fn()
    .mockImplementation((index) => data[index].orderQty + 1);
  const onDelete = vi
    .fn()
    .mockImplementation((idx) => data.filter((item, index) => index !== idx));

  const wrapper = render(
    <OrderCard
      data={data[0]}
      index={0}
      onDelete={() => null}
      onUpdate={() => onUpdate()}
    />
  );

  it("should be rendered normal ", () => {
    expect(wrapper).toBeDefined();
  });

  it("should add orderQty for order", () => {
    onUpdate(0);
    expect(onUpdate.mock.results.map((item) => item.value)).contain(2);
  });

  it("should add remove order", () => {
    onDelete(0);
    expect(onDelete.mock.results).length(1);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
