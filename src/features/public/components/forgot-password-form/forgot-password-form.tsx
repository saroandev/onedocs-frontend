/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "./forgot-password-form.module.scss";
import { useFormik } from "formik";
import { getInitialForgotPasswordValues } from "./helpers";
import type { ForgotPasswordDto } from "../../api/public.types";
import { useForgotPassword } from "../../hooks";
import { ROUTES } from "@/app/router/routes.config";
import { useAppNavigation } from "@/shared/lib/navigation";

export const ForgotPasswordForm = () => {
  const { mutate: forgotPassword, isPending: loading } = useForgotPassword();
  const { goTo } = useAppNavigation();

  const { handleSubmit, handleChange, values, touched, handleBlur, errors, resetForm } = useFormik({
    initialValues: getInitialForgotPasswordValues(),
    onSubmit: async (values: ForgotPasswordDto) => {
      forgotPassword(values);
      resetForm();
    },
  });

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} noValidate></form>
      <div className={styles.navigation}>
        <p>
          Wait, I remember my password...{" "}
          <span onClick={() => goTo(ROUTES.SIGN_IN)}>Click here</span>
        </p>
      </div>
    </div>
  );
};
