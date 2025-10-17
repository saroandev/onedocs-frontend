import { toast, type ToastOptions } from "react-toastify";

export const showNotification = (
  type: "info" | "warning" | "success" | "error",
  message: string,
  options?: ToastOptions
) => {
  const defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    // theme: "dark",
    ...options,
  };

  toast[type](message, defaultOptions);
};
