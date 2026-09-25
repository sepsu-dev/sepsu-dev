import { NextResponse } from "next/server";

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiSuccessResponse<T> {
  status: "success";
  message?: string;
  data: T;
  pagination?: PaginationMeta;
}

export interface ApiErrorResponse {
  status: "error";
  message: string;
  errors?: unknown;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

interface SuccessOptions {
  message?: string;
  status?: number;
  pagination?: PaginationMeta;
  headers?: HeadersInit;
}

interface ErrorOptions {
  status?: number;
  errors?: unknown;
  headers?: HeadersInit;
}

/**
 * Standard Success API Response
 */
export function successResponse<T>(
  data: T,
  options: SuccessOptions = {}
): NextResponse<ApiSuccessResponse<T>> {
  const { message, status = 200, pagination, headers } = options;

  const payload: ApiSuccessResponse<T> = {
    status: "success",
    data,
    ...(message ? { message } : {}),
    ...(pagination ? { pagination } : {}),
  };

  return NextResponse.json(payload, {
    status,
    headers,
  });
}

/**
 * Standard Error API Response
 */
export function errorResponse(
  message: string,
  options: ErrorOptions = {}
): NextResponse<ApiErrorResponse> {
  const { status = 400, errors, headers } = options;

  const payload: ApiErrorResponse = {
    status: "error",
    message,
    ...(errors !== undefined ? { errors } : {}),
  };

  return NextResponse.json(payload, {
    status,
    headers,
  });
}

export const apiResponse = {
  success: successResponse,
  error: errorResponse,
};

export default apiResponse;
