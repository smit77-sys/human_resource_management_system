export class ApiResponse<T> {
  constructor(
    public statusCode: number,
    public data: T,
    public message: string,
    public success: boolean = statusCode < 400
  ) {}
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const sendResponse = <T>(
  statusCode: number,
  data: T,
  message: string
): ApiResponse<T> => {
  return new ApiResponse(statusCode, data, message, statusCode < 400);
};

export const throwError = (statusCode: number, message: string): void => {
  throw new ApiError(statusCode, message);
};
