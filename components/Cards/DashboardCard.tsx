import React from "react";
import PriceFormater from "../FormatText/PriceFormater";

type Props = {
  //   children: React.ReactNode;
  title: string;
  subtitle: number;
  type?: "pricing";
};

const DashboardCard = (props: Props) => {
  return (
    <div
      className="flex flex-col rounded-lg bg-white dark:bg-slate-800 p-4
    shadow-lg"
    >
      <span className="text-slate-500">{props.title}</span>
      {props.type === "pricing" ? (
        <PriceFormater price={props.subtitle} className="text-xl font-bold" />
      ) : (
        <span className="text-xl font-bold">{props.subtitle}</span>
      )}
    </div>
  );
};

export default DashboardCard;
