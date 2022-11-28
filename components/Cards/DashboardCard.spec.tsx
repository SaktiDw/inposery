import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DashboardCard from "./DashboardCard";

describe("DashboardCard", () => {
  it("should be rendered normal ", () => {
    const wrapper = render(<DashboardCard title="Title" subtitle={100} />);
    expect(wrapper).toBeDefined();
  });

  it("should be rendered pricing ", () => {
    const wrapper = render(
      <DashboardCard title="Title" subtitle={100} type="pricing" />
    );
    expect(wrapper).toBeDefined();
  });
});
