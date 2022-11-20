import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Dashboard from "./Dashboard";

describe("Dashboard Layout", () => {
  it("should be rendered", () => {
    const wrapper = render(<Dashboard>Dashboard</Dashboard>);
    expect(wrapper).toBeTruthy();
  });

  it("should match with the snapshot", () => {
    const { container } = render(<Dashboard>Dashboard</Dashboard>);
    expect(container).toMatchSnapshot();
  });
});
