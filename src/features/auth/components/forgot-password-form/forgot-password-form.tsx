import { PublicHeader } from "@/common/components/publicHeader/publicHeader"; //TODO
import { useNavigate } from "react-router-dom";
import styles from "./forgot-password-form.module.scss";
import { useFormik } from "formik";
import { getInitialForgotPasswordValues } from "./helpers";
import type { ForgotPasswordDto } from "../../api/auth.types";
import { useForgotPassword } from "../../hooks";
import { ROUTES } from "@/app/router/routes.config";

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { forgotPassword, loading } = useForgotPassword();

  const { handleSubmit, handleChange, values, touched, handleBlur, errors, resetForm } = useFormik({
    initialValues: getInitialForgotPasswordValues(),
    onSubmit: async (values: ForgotPasswordDto) => {
      await forgotPassword(values);
      resetForm();
    },
  });

  return (
    <div className={styles.container}>
      <PublicHeader
        title="Forgot Your Password?"
        description="Enter the email address linked to your account, and we’ll send you a link to reset your password."
      />
      <form onSubmit={handleSubmit} noValidate></form>
      <div className={styles.navigation}>
        <p>
          Wait, I remember my password...{" "}
          <span onClick={() => navigate(ROUTES.SIGN_IN_PATH)}>Click here</span>
        </p>
      </div>
    </div>
  );
};
