import { axiosInstance } from "./instance";

export const get = (
  url: string
) =>
  axiosInstance.get(
    url
  )

export const post = <T>(
  url: string,
  data: T,
) =>
  axiosInstance.post(
    url,
    data
  )
