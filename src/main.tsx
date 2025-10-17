import { createRoot } from "react-dom/client";
import { Providers } from "./app/providers";
import "react-toastify/ReactToastify.css";
import "./global.scss";
import { AppRouter } from "./app";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <AppRouter />
  </Providers>
);
