import { mockNextUseRouter } from "@/helper/test/utils";
import MainDashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Stores from "@/pages/store";
import Store from "@/pages/store/[id]";
import Cashier from "@/pages/store/[id]/cashier";
import Products from "@/pages/store/[id]/product";
import Receipts from "@/pages/store/[id]/receipts";
import Transaction from "@/pages/store/[id]/transaction";
import { render } from "@testing-library/react";
import { describe, expect, it, vi, vitest } from "vitest";
import Home from "../pages";

describe("Page Render Testing", () => {
  vitest.mock("next/router", () => ({
    useRouter: () => ({
      query: { id: "1" },
    }),
  }));

  it("Should be render Home Page", () => {
    const { container } = render(<Home />);
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });
  it("Should be render Login Page", () => {
    const { container } = render(<Login />);
    expect(container).toBeDefined();
  });
  it("Should be render Dashboard Page", () => {
    const { container } = render(<MainDashboard />);
    expect(container).toBeDefined();
  });
  it("Should be render Stores Page", () => {
    const { container } = render(<Stores />);
    expect(container).toBeDefined();
  });
  it("Should be render Store Page", () => {
    const { container } = render(<Store />);
    expect(container).toBeDefined();
  });
  it("Should be render Products Page", () => {
    const { container } = render(<Products />);
    expect(container).toBeDefined();
  });
  it("Should be render Cashier Page", () => {
    const { container } = render(<Cashier />);
    expect(container).toBeDefined();
  });
  it("Should be render Transaction Page", () => {
    const { container } = render(<Transaction />);
    expect(container).toBeDefined();
  });
  it("Should be render Receipts Page", () => {
    const { container } = render(<Receipts />);
    expect(container).toBeDefined();
  });
});
