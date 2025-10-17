export const BANNER_TYPE = {
  NOT_FOUND: "404",
  INTERNAL_SERVER: "500",
  MAINTENANCE: "maintenance",
  SUCCESS: "success",
} as const;

export type BannerType = (typeof BANNER_TYPE)[keyof typeof BANNER_TYPE];
