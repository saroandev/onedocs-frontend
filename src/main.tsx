import { createRoot } from "react-dom/client";
import { Providers } from "./app/providers";
import { AppRouter } from "./app/router";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <AppRouter />
  </Providers>
);
