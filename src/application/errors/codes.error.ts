export const CodesError = {
  DATA_INVALID: "DATA_INVALID",
  FILE_NOT_FOUND: "FILE_NOT_FOUND",
  TYPE_NOT_FOUND: "TYPE_NOT_FOUND",
  DUPLICATE_FILE: "DUPLICATE_FILE",
  DUPLICATE_TYPE: "DUPLICATE_TYPE",
} as const;

export type CodesError = (typeof CodesError)[keyof typeof CodesError];
