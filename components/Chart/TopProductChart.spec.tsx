import { TransactionType } from "@/helper/type/enum";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ComparationChart from "./ComparationChart";
import TopProductChart from "./TopProductChart";

describe("ComparationChart", () => {
  const tree = () =>
    render(
      <TopProductChart
        limit={5}
        storeId={12}
        type={TransactionType.IN}
        title={"Title"}
      />
    );

  it("should be rendered", () => {
    const { container, getByText, getByTestId } = tree();
    waitForElementToBeRemoved(getByText("Loading..."));
    expect(container).toBeDefined();
  });

  // it("should be render loading text if no data ", () => {
  //   const { queryByText } = tree([]);
  //   expect(queryByText("Loading...")).toBeDefined();
  // });

  // it("should be rendered no data text if data is [0,0] ", () => {
  //   const { queryByText } = tree([0, 0]);
  //   expect(queryByText("No data")).toBeDefined();
  // });
});
