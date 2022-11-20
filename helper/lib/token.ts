import Cookies from "js-cookie";

export const setAccessToken = (token: string) =>
  Cookies.set("access_token", token, {
    sameSite: "None",
    secure: false,
    // expires: new Date(new Date().getTime() + 5 * 1000),
  });
export const getAccessToken = () => Cookies.get("access_token");
export const setRefreshToken = (token: string) =>
  Cookies.set("refresh_token", token, {
    sameSite: "None",
    secure: false,
    // expires: new Date(new Date().getTime() + 14 * 60 * 60 * 24 * 1000),
  });
export const getRefreshToken = () => Cookies.get("refresh_token");
export const destroyToken = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
};
