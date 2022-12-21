import { getFetcher } from "@/helper/lib/api";
import { Category } from "@/helper/type/Category";
import React from "react";
import { MultiSelect, Option } from "react-multi-select-component";
import useSWR, { SWRResponse } from "swr";

type Props = {
  selected: Option[];
  onChange: React.Dispatch<React.SetStateAction<Option[]>>;
};

const CategoriesFilter = (props: Props) => {
  const { data: categories }: SWRResponse<any> = useSWR(
    `/api/categories`,
    getFetcher
  );
  const customValueRenderer = (selected: Option[], _options: any) => {
    return selected.length
      ? selected.map(({ label }) => "✔️ " + label)
      : "😶 No Categories Selected";
  };
  return (
    <MultiSelect
      shouldToggleOnHover
      options={
        categories
          ? categories.map((item: Category) => ({
              label: item.name,
              value: item.name,
            }))
          : []
      }
      value={props.selected}
      onChange={props.onChange}
      labelledBy={"Categories"}
      valueRenderer={customValueRenderer}
      className="max-w-[300px] shadow-lg rounded-lg dark:text-white"
    />
  );
};

export default CategoriesFilter;
