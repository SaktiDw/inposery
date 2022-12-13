import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DashboardLayout from "./DashboardLayout";

describe("Dashboard Layout", () => {
  it("should be rendered", () => {
    const wrapper = render(<DashboardLayout>Dashboard</DashboardLayout>);
    expect(wrapper).toBeTruthy();
  });

  it("should match with the snapshot", () => {
    const { container } = render(<DashboardLayout>Dashboard</DashboardLayout>);
    expect(container).toMatchSnapshot();
  });
});
