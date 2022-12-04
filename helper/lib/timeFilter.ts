import moment from "moment";

export const filter = {
  today: moment().format("YYYY-MM-DD"),
  lastDays: moment().subtract(1, "days").format("YYYY-MM-DD"),
  lastSevenDays: moment().subtract(6, "days").format("YYYY-MM-DD"),
  lastThirtyDays: moment().subtract(30, "days").format("YYYY-MM-DD"),
  startOfMonth: moment().startOf("month").format("YYYY-MM-DD"),
  endOfMonth: moment().endOf("month").format("YYYY-MM-DD"),
  threeMonth: moment("2022-12-01").subtract(2, "month").format("YYYY-MM-DD"),
  currentYear: moment().startOf("year").format("YYYY-MM-DD"),
};
