
import { get, post } from "@store/libs";
import type { IComments, IAddCommentsRequest, IAddCommentsResponse } from "./types";
import type { AxiosPromise } from "axios";

export const getAllComments =
  (): AxiosPromise<IComments[]> =>
    get('/comments')

export const getCommentsWithPagination =
  (currentPage: number,
    rowsInPage: number
  ): AxiosPromise<IComments[]> =>
    get(`/comments?_page=${currentPage + 1
      }&_limit=${rowsInPage}`)

export const addComment = (
  params: IAddCommentsRequest
): AxiosPromise<IAddCommentsResponse> => {
  return post<IAddCommentsRequest>(
    '/posts',
    params
  );
}
