import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/router/routes.config";

export const useAppNavigation = () => {
  const navigate = useNavigate();

  return {
    goToSignIn: () => navigate(ROUTES.SIGN_IN),
    goToDashboard: () => navigate(ROUTES.DASHBOARD),
    goToProfile: () => navigate(ROUTES.PROFILE),
    goBack: () => navigate(-1),
  };
};
