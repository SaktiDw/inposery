import Login from "@/pages/login";
import { describe, expect, it, test, vitest } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StoreForm } from "@/components";
import Stores from "@/pages/store";

describe("Login Page Testing", () => {
  it("Should be render Login Page", async () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });
});
