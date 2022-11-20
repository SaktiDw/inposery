import { bench, describe, expect, test, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import SidebarItem from "./SidebarItem";
import Home from "@/pages/index";
import { mockNextUseRouter } from "@/helper/test/utils";

describe("SidebarItem", async () => {
  test("Render SidebarItem", () => {
    mockNextUseRouter({
      route: "/",
      pathname: "/",
      query: "",
      asPath: "/",
    });

    const { container } = render(
      <SidebarItem
        href="/test"
        text="Test"
        active={true}
        icon="fi-rr-test-tube"
      />
    );

    expect(container).toMatchSnapshot();
  });
});
