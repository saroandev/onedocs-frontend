import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { PublicHeader } from "@/common/components/publicHeader/publicHeader"; //TODO
import styles from "./sign-up-form.module.scss";
import { getInitialSignupValues } from "./helpers";
import { useSignUp } from "../../hooks";
import type { SignUpDto } from "../../api/auth.types";
import { ROUTES } from "@/app/router/routes.config";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const { signUp, loading } = useSignUp();

  const { handleSubmit, handleChange, values, errors, touched, resetForm, handleBlur } = useFormik({
    initialValues: getInitialSignupValues(),
    onSubmit: async (values: SignUpDto) => {
      await signUp(values);
      resetForm();
    },
  });

  return (
    <div className={styles.container}>
      <PublicHeader title="Sign Up" description="Enter your email and password to sign up!" />
      <form onSubmit={handleSubmit} noValidate></form>
      <div className={styles.navigation}>
        <p>
          Already have an account? <span onClick={() => navigate(ROUTES.SIGN_IN)}>Sign In</span>
        </p>
      </div>
    </div>
  );
};
