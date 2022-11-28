import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import OrderCard from "./OrderCard";

describe("OrderCard", () => {
  const data = [
    { id: 11, name: "Goodday", sellPrice: 6000, qty: 60, orderQty: 1 },
    { id: 10, name: "Teh Kotak", sellPrice: 5000, qty: 70, orderQty: 1 },
  ];
  it("should be rendered normal ", () => {
    const wrapper = render(
      <OrderCard
        data={data[0]}
        index={0}
        onDelete={() => null}
        onUpdate={() => null}
      />
    );
    expect(wrapper).toBeDefined();
  });
});
