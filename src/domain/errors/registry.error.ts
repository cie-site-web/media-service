import { CodesError } from "./codes.error";

export const ErrorRegistry = {
  [CodesError.PUBLIC_ID_INVALID]: { httpStatus: 400 },
  [CodesError.PAGE_INVALID]: { httpStatus: 400 },
  [CodesError.LIMIT_INVALID]: { httpStatus: 400 },
  [CodesError.FILE_ID_INVALID]: { httpStatus: 400 },
  [CodesError.FILE_NAME_REQUIRED]: { httpStatus: 400 },
  [CodesError.FILE_PATH_REQUIRED]: { httpStatus: 400 },
  [CodesError.FILE_TYPE_ID_INVALID]: { httpStatus: 400 },
  [CodesError.FILE_SIZE_INVALID]: { httpStatus: 400 },
  [CodesError.FILE_UPLOADED_BY_REQUIRED]: { httpStatus: 400 },
  [CodesError.TYPE_ID_INVALID]: { httpStatus: 400 },
  [CodesError.TYPE_NAME_REQUIRED]: { httpStatus: 400 },
  [CodesError.TYPE_NAME_INVALID]: { httpStatus: 400 },
  [CodesError.TYPE_FORMAT_INVALID]: { httpStatus: 400 },
} as const satisfies Record<
  (typeof CodesError)[keyof typeof CodesError],
  { httpStatus: number }
>;
