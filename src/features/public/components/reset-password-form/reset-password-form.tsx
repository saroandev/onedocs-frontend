import { useEffect } from "react";
// import { PublicHeader } from "@/common/components/publicHeader/publicHeader"; //TODO
import styles from "./reset-password-form.module.scss";
import { useFormik } from "formik";
import { getInitialResetPasswordValues } from "./helpers";
import { useNavigate, useSearchParams } from "react-router-dom";
import { type ResetPasswordDto } from "../../api/public.types";
import { useResetPassword } from "../../hooks";
import { ROUTES } from "@/app/router/routes.config";

export const ResetPasswordForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const tokenFromParams = searchParams.get("token");
  const navigate = useNavigate();
  const { resetPassword, loading } = useResetPassword();

  useEffect(() => {
    if (!tokenFromParams) {
      navigate(ROUTES.SIGN_IN, { replace: true });
    }
  }, []);

  const { handleSubmit, handleChange, values, touched, handleBlur, errors, resetForm } = useFormik({
    initialValues: getInitialResetPasswordValues(),
    onSubmit: async (values: ResetPasswordDto) => {
      const payload = {
        ...values,
        token: tokenFromParams || "",
      };
      await resetPassword(payload);
      resetForm();
    },
  });

  //TODO useeffect yazilacak. token valid olup olmadigini kontrol edilecek

  if (!tokenFromParams) {
    return null;
  }

  return (
    <div className={styles.container}>
      {/* <PublicHeader title="Reset Your Password" description="Enter the reset your password." /> */}
      <form onSubmit={handleSubmit} noValidate></form>
    </div>
  );
};
