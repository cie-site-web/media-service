import { CodesError } from "./codes.error";

export const ErrorRegistry = {
  [CodesError.DATA_INVALID]: { httpStatus: 400 },
  [CodesError.FILE_NOT_FOUND]: { httpStatus: 404 },
  [CodesError.TYPE_NOT_FOUND]: { httpStatus: 404 },
  [CodesError.DUPLICATE_FILE]: { httpStatus: 400 },
  [CodesError.DUPLICATE_TYPE]: { httpStatus: 400 },
} as const satisfies Record<
  (typeof CodesError)[keyof typeof CodesError],
  { httpStatus: number }
>;
