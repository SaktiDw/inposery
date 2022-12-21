import React, { useEffect, useState } from "react";
import { MultiSelect, Option } from "react-multi-select-component";

type Props = {
  label: string;
  placeholder: string;
  options: Option[];
  selected: Option[];
  setSelected: React.Dispatch<React.SetStateAction<Option[]>>;
  isCreateable?: boolean;
};
// const options = [
//   { label: "Grapes 🍇", value: "grapes" },
//   { label: "Mango 🥭", value: "mango" },
//   { label: "Strawberry 🍓", value: "strawberry", disabled: true },
// ];

const Select = (props: Props) => {
  const [option, setOption] = useState<Option[]>([]);
  useEffect(() => {
    setOption(props.options);
  }, [props.options]);

  return (
    <>
      <h1 className="font-semibold leading-tight text-slate-800 dark:text-white">
        {props.label}
      </h1>
      <MultiSelect
        shouldToggleOnHover
        options={option}
        value={props.selected}
        onChange={props.setSelected}
        labelledBy={props.placeholder}
        isCreatable={props.isCreateable}
        className="ring-2 ring-lime-500 rounded-lg dark:text-white"
      />
    </>
  );
};

export default Select;
