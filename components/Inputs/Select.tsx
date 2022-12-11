import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

type Props = {};
const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

const Select = (props: Props) => {
  const [selected, setSelected] = useState([]);
  return (
    <>
      <h1>Select Fruits</h1>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
        className="ring-2 ring-lime-500 rounded-lg"
      />
    </>
  );
};

export default Select;
