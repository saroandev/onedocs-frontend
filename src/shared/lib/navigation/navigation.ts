import { useNavigate } from "react-router-dom";
import type { NavigateOptions, To } from "react-router-dom";

export const useAppNavigation = () => {
  const navigate = useNavigate();

  return {
    goTo: (url: To, options?: NavigateOptions) => navigate(url, options),
    goBack: () => navigate(-1),
  };
};
