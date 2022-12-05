import { filter } from "@/helper/lib/timeFilter";
import { FilterBy } from "@/helper/type/enum";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  filterBy: string;
  setFilterBy: Dispatch<SetStateAction<FilterBy>>;
  from: Dispatch<SetStateAction<string>>;
  to: Dispatch<SetStateAction<string>>;
};

const FilterChart = (props: Props) => {
  const filterByMonth = () => {
    props.setFilterBy(FilterBy.month);
    props.from(filter.startOfMonth);
    props.to(filter.endOfMonth);
  };
  const filterByThreeMonth = () => {
    props.setFilterBy(FilterBy.threeMonth);
    props.from(filter.threeMonth);
    props.to(filter.endOfMonth);
  };
  const filterByYear = () => {
    props.setFilterBy(FilterBy.year);
    props.from(filter.currentYear);
  };
  return (
    <div className="flex justify-center gap-4 text-xs uppercase w-full">
      <button
        className={`${
          props.filterBy == FilterBy.month && "font-bold text-lime-500"
        }`}
        onClick={() => filterByMonth()}
      >
        1 Month
      </button>
      <button
        className={`${
          props.filterBy == FilterBy.threeMonth && "font-bold text-lime-500"
        }`}
        onClick={() => filterByThreeMonth()}
      >
        3 Month
      </button>
      <button
        className={`${
          props.filterBy == FilterBy.year && "font-bold text-lime-500"
        }`}
        onClick={() => filterByYear()}
      >
        1 Year
      </button>
    </div>
  );
};

export default FilterChart;
