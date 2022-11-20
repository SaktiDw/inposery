import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  it("should be rendered", () => {
    const wrapper = render(<Sidebar isOpen={false}></Sidebar>);
    expect(wrapper).toBeTruthy();
  });

  it("should match with the snapshot", () => {
    const { container } = render(<Sidebar isOpen={false}></Sidebar>);
    expect(container).toMatchSnapshot();
  });
});
