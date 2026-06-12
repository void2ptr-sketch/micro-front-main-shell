export type ApiErrorBody = {
  message: string;
  code?: string;
};

export type ApiResponse<T> = {
  data: T;
  success: boolean;
};

export type RequestState = {
  loading: boolean;
  error: string | null;
};
