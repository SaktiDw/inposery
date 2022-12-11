import React from "react";

type Props = {
  text: string;
};

const ResetButton = (props: Props) => {
  return (
    <button
      type="reset"
      className="text-white bg-gradient-to-tl from-red-700 to-pink-500 disabled:from-red-800 disabled:to-red-800 disabled:cursor-not-allowed font-semibold shadow-lg py-2 px-4 rounded-lg "
    >
      {props.text}
    </button>
  );
};

export default ResetButton;
