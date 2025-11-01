export const BUTTON_TYPE = {
  JUST_TEXT: "justText",
  JUST_ICON: "justIcon",
  ICON_WITH_TEXT: "iconWithText",
} as const;

export type ButtonType = (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE];

export const ICON_TYPE = {
  ADD: "add",
  ARROW: "arrow",
  DELETE: "delete",
  EXPORT: "export",
  DOCUMENT: "document",
  UPDATE: "update",
  SEARCH: "search",
  CLOSE: "close",
  NOTIFY: "notify",
  ARROW_DOWN: "arrow-down",
  ARROW_UP: "arrow-up",
  MINUS: "minus",
  PLUS: "plus",
  FILTER: "filter",
  DOTS: "dots",
  CHEV_RIGHT: "chevron-right",
  CHEV_LEFT: "chevron-left",
  TICK: "tick",
  COPY: "copy",
  UPLOAD: "upload",
  MESSAGE: "message",
  TABLE: "table",
  USER: "user",
  MAIL: "mail",
  OUT: "out",
  PAPERCLIP: "paperclip",
  LIBRARY: "library",
  LIKE: "like",
  DISLIKE: "dislike",
  DOWNLOAD: "download",
  PRINTER: "printer",
  NONE: "none",
} as const;

export type IconType = (typeof ICON_TYPE)[keyof typeof ICON_TYPE];

export const HTML_TYPE = {
  BUTTON: "button",
  SUBMIT: "submit",
} as const;

export type HtmlType = (typeof HTML_TYPE)[keyof typeof HTML_TYPE];

export const BUTTON_VARIANT = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TERTIARY: "tertiary",
  DESTRUCTIVE: "destructive",
} as const;

export type ButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];
