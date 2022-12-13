import { FilterBy } from "@/helper/type/enum";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FilterChart from "./FilterChart";

describe("FilterChart", () => {
  const tree = () =>
    render(
      <FilterChart
        filterBy={FilterBy.threeMonth}
        setFilterBy={() => null}
        from={() => null}
        to={() => null}
      />
    );

  it("should be rendered", () => {
    const { container } = tree();
    expect(container).toBeDefined();
  });
});
