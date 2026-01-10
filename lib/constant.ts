const LIMIT_FILE_SIZE = 1000;

export const LIMIT_FILE = 21;
export const MAX_FILE_SIZE = (LIMIT_FILE_SIZE * 1024 * 1024);

export const ACCEPTED_MEDIA_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "video/webm", "video/mp4", "video/quicktime"];

export const ACCEPTED_ICON_TYPES = ["image/svg+xml", "application/xml"] as const;

export type MEDIA_TYPES = "image/jpeg" | "image/jpg" | "image/png" | "image/webp" | "video/webm" | "video/mp4" | "video/quicktime";

export type ICON_TYPES = "image/svg+xml" | "application/xml";

export const TOTAL_PAGINATION_PAGE = 8 as const;

export const CLIENT_TOTAL_PAGINATION_PAGE = 8 as const;

export const SEARCH_DEBOUND = 800 as const;

export const ROOM_DATA = ["Bureau", "Espace commercial", "Entrepôt"];

export const VIDEO_TYPES = ["webm", "mp4", "mov"];

export const IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];
