import { post } from "@store/libs";
import type { AxiosResponse } from "axios";
import type { userRefreshToken } from "./types";

export const refreshToken = async (): Promise<AxiosResponse<userRefreshToken>> => {
  const data = {
    refresh_token: localStorage.getItem("refresh_token"),
  };
  return post("/refresh-token", data);
};
