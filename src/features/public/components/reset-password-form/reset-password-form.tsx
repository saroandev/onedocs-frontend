/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import styles from "./reset-password-form.module.scss";
import { useFormik } from "formik";
import { getInitialResetPasswordValues } from "./helpers";
import { useSearchParams } from "react-router-dom";
import { type ResetPasswordDto } from "../../api/public.types";
import { useResetPassword } from "../../hooks";
import { ROUTES } from "@/app/router/routes.config";
import { useAppNavigation } from "@/shared/lib/navigation";

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
      resetForm();
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
