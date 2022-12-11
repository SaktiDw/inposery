import React from "react";

type Props = {
  text: string;
  disabled: boolean;
};

const SubmitButton = (props: Props) => {
  return (
    <button
      type="submit"
      disabled={props.disabled}
      // className="w-full  text-white  bg-green-500 ring-2 ring-green-500 hover:bg-green-400 disabled:ring-green-800 disabled:bg-green-800 disabled:cursor-not-allowed disabled:shadow font-semibold shadow-xl py-2 px-4 rounded-lg "
      className="text-white bg-gradient-to-tl from-green-700 to-lime-500 disabled:from-green-800 disabled:to-green-800 disabled:cursor-not-allowed font-semibold shadow-lg py-2 px-4 rounded-lg "
    >
      {props.text}
    </button>
  );
};

export default SubmitButton;
