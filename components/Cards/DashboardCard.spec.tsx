import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DashboardCard from "./DashboardCard";

describe("DashboardCard", () => {
  const tree = (
    title: string,
    subtitle: number,
    type?: "pricing" | undefined,
    diff?: number
  ) =>
    render(
      <DashboardCard
        title={title}
        subtitle={subtitle}
        type={type || undefined}
        diff={diff}
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

  it("should be rendered the different from sales and modal", () => {
    const { container, queryByTestId } = tree(
      "Today Profit",
      100000,
      "pricing",
      9
    );
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
    expect(queryByTestId("diff")).toBeDefined();
  });
  it("should be rendered the different with icon up", () => {
    const { container, queryByTestId } = tree(
      "Today Sales",
      100000,
      "pricing",
      9
    );
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
    expect(queryByTestId("diff")).toBeDefined();
    expect(queryByTestId("up")).toBeDefined();
  });
  it("should be rendered the different with icon up", () => {
    const { container, queryByTestId } = tree(
      "Today Sales",
      100000,
      "pricing",
      -9
    );
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
    expect(queryByTestId("diff")).toBeDefined();
    expect(queryByTestId("down")).toBeDefined();
  });
});
