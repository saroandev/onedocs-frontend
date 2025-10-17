/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import styles from "../styles/reset-password-form.module.scss";
import { useFormik } from "formik";
import { useSearchParams } from "react-router-dom";
import { ROUTES } from "@/app/router/config/routes.config";
import { useAppNavigation } from "@/shared/lib/navigation";
import { useResetPassword } from "../hooks";
import { getInitialResetPasswordValues } from "../constants/reset-password-helpers";
import type { ResetPasswordDto } from "../api/auth.types";

export const ResetPasswordForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tokenFromParams = searchParams.get("token");
  const { goTo } = useAppNavigation();
  const { mutate: resetPassword, isPending: loading } = useResetPassword();

  useEffect(() => {
    if (!tokenFromParams) {
      goTo(ROUTES.SIGN_IN, { replace: true });
    }
  }, []);

  const { handleSubmit, handleChange, values, touched, handleBlur, errors, resetForm } = useFormik({
    initialValues: getInitialResetPasswordValues(),
    onSubmit: async (values: ResetPasswordDto) => {
      const payload = {
        ...values,
        token: tokenFromParams || "",
      };
      resetPassword(payload);
    },
  });

  //TODO useeffect yazilacak. token valid olup olmadigini kontrol edilecek

  if (!tokenFromParams) {
    return null;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} noValidate>
        reset password
      </form>
    </div>
  );
};
