import type { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";

type CustomRouteObject = {
  authority?: string | Array<string>;
  translateKey?: string;
};

type CustomIndexRouteObject = IndexRouteObject & CustomRouteObject;

type CustomNonIndexRouteObject = Omit<NonIndexRouteObject, "children"> &
  CustomRouteObject & {
    children?: (CustomIndexRouteObject | CustomNonIndexRouteObject)[];
  };

export type AppRoute = CustomIndexRouteObject | CustomNonIndexRouteObject;
