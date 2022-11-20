import React from "react";

type Props = {
  price: number;
  country?: string;
  currency?: string;
  className?: string;
};

const PriceFormater = ({
  price,
  className,
  country = "id-ID",
  currency = "IDR",
}: Props) => {
  return (
    <span className={className}>
      {price.toLocaleString(country, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}
    </span>
  );
};

export default PriceFormater;
