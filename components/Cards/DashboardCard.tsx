import React from "react";
import PriceFormater from "../FormatText/PriceFormater";

type Props = {
  //   children: React.ReactNode;
  title: string;
  subtitle: number;
  diff?: number;
  type?: "pricing";
};

const DashboardCard = (props: Props) => {
  return (
    <div
      className="flex flex-col rounded-lg bg-white dark:bg-slate-800 p-4
    shadow-lg"
    >
      <span className="text-slate-500">{props.title}</span>
      <div className="flex items-end">
        {props.type === "pricing" ? (
          <PriceFormater
            price={props.subtitle}
            className="text-xl font-bold"
            data-testid="pricing"
          />
        ) : (
          <span className="text-xl font-bold" data-testid="normal">
            {props.subtitle}
          </span>
        )}
        <div className="text-sm flex items-end ml-auto">
          {props.diff && (
            <>
              <span
                data-testid="diff"
                className={`${
                  props.diff > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {Math.round((props.diff + Number.EPSILON) * 100) / 100}%
              </span>
              <span
                className={`${
                  props.diff > 0 ? "text-green-500" : "text-red-500"
                } animate-bounce`}
              >
                {props.diff > 0 ? (
                  <i
                    className="flex items-start fi-rr-angle-small-up"
                    data-testid="up"
                  ></i>
                ) : (
                  <i
                    className="flex items-start fi-rr-angle-small-down"
                    data-testid="down"
                  ></i>
                )}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
