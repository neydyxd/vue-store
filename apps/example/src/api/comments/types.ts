export interface IComments {
  name: string;
  email: string;
}

export interface IAddCommentsRequest {
  title: string;
  body: string;
  userId: number;
}

export interface IAddCommentsResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}




