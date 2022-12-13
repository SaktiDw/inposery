import { render, waitForElementToBeRemoved } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ComparationChart from "./ComparationChart";

describe("ComparationChart", () => {
  const tree = (data: number[]) =>
    render(
      <ComparationChart
        labels={["Data1", "Data2"]}
        data={data}
        title={"Title"}
      />
    );

  it("should be rendered", () => {
    const { container } = tree([1000, 2000]);
    expect(container).toBeDefined();
  });

  it("should be render loading text if no data ", () => {
    const { queryByText } = tree([]);
    expect(queryByText("Loading...")).toBeDefined();
  });

  it("should be rendered no data text if data is [0,0] ", () => {
    const { queryByText, getByText } = tree([0, 0]);
    expect(queryByText("No data")).toBeDefined();
  });
});
