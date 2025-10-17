import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./router/routes";

const router = createBrowserRouter(routes);

export const AppRouter = () => <RouterProvider router={router} />;
