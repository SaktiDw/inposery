import { DashboardResponse } from "@/helper/type/Dashboard";
import { TransactionType } from "@/helper/type/enum";
import { DashboardMock } from "@/mocks/response";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ReportChart from "./ReportChart";

describe("ReportChart", () => {
  const tree = (data: DashboardResponse[], type: TransactionType) =>
    render(<ReportChart data={data} title={"Title"} type={type} />);

  it("should be rendered", () => {
    const { container, queryByText } = tree(DashboardMock, TransactionType.IN);
    expect(queryByText("Title"));
    expect(container).toBeDefined();
  });

  it("should be render loading text if no data ", () => {
    const { container, queryByText } = tree(DashboardMock, TransactionType.OUT);
    expect(queryByText("Title"));
    expect(container).toBeDefined();
  });

  it("should be rendered no data text if data is [0,0] ", () => {
    const { queryByText } = tree([], TransactionType.IN);
    expect(queryByText("No data")).toBeDefined();
  });
});
