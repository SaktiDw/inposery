import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DashboardCard from "./DashboardCard";

describe("DashboardCard", () => {
  const tree = (
    title: string,
    subtitle: number,
    type?: "pricing" | undefined
  ) =>
    render(
      <DashboardCard
        title={title}
        subtitle={subtitle}
        type={type || undefined}
      />
    );

  it("should be rendered normal ", () => {
    const { container, queryByTestId } = tree("Today Profit", 100000);
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
    expect(queryByTestId("normal")).toBeDefined();
    expect(queryByTestId("pricing")).toBeNull();
  });

  it("should be rendered pricing ", () => {
    const { container, queryByTestId } = tree(
      "Today Profit",
      100000,
      "pricing"
    );
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
    expect(queryByTestId("normal")).toBeNull();
    expect(queryByTestId("pricing")).toBeDefined();
  });
});
