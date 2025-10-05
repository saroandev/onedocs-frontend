import { useFormik } from "formik";
import { useState } from "react";
// import { PublicHeader } from "@/common/components/publicHeader/publicHeader";
import styles from "./sign-in-form.module.scss";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "../../hooks";
import { getInitialSignInValues } from "./helpers";
import type { SignInDto } from "../../api/public.types";
import { ROUTES } from "@/app/router/routes.config";

export const SignInForm = () => {
  const navigate = useNavigate();
  const { signIn, loading } = useSignIn();
  const [isChecked, setIsChecked] = useState(false);

  const { handleSubmit, handleChange, values, touched, handleBlur, errors, resetForm } = useFormik({
    initialValues: getInitialSignInValues(),
    onSubmit: async (values: SignInDto) => {
      await signIn(values);
      resetForm();
    },
  });

  return (
    <div className={styles.container}>
      {/* <PublicHeader title="Sign In" description="Enter your email and password to sign in!" /> */}
      <form onSubmit={handleSubmit} noValidate></form>
      <div className={styles.navigation}>
        <p>
          Don&apos;t have an account? <span onClick={() => navigate(ROUTES.SIGN_UP)}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};
