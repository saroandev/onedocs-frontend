import { useFormik } from "formik";
import styles from "./sign-in-form.module.scss";
import { Link } from "react-router-dom";
import { useSignIn } from "../../hooks";
import type { SignInDto } from "../../api/public.types";
import { ROUTES } from "@/app/router/routes.config";
import { Button, Checkbox, Input } from "@/shared/ui";
import { getInitialSignInValues } from "../../constants";
import { BUTTON_TYPE, HTML_TYPE } from "@/shared/ui/button/button-config";

export const SignInForm = () => {
  const { mutate: signIn, isPending: loading } = useSignIn();

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    handleBlur,
    errors,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: getInitialSignInValues(),
    onSubmit: async (values: SignInDto) => {
      signIn(values);
      resetForm();
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>Hoş Geldiniz</h1>
        <p>Hesabınıza giriş yapın</p>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            value={values.email}
            label="E-Posta"
            placeholder="info@email.com"
            onChange={handleChange}
            disabled={loading}
            onBlur={handleBlur}
            error={touched.email && errors.email !== "" ? errors.email : ""}
          />
          <Input
            isExistPassword
            value={values.password}
            name="password"
            label="Şifre"
            placeholder="En az 8 karakter"
            onChange={handleChange}
            disabled={loading}
            onBlur={handleBlur}
            error={touched.password && errors.password !== "" ? errors.password : ""}
          />
          <div className={styles.options}>
            <Checkbox
              checked={values.rememberMe}
              onChange={(e) => setFieldValue("rememberMe", e.target.checked)}
              label="Beni hatırla"
            />
            <Link to={ROUTES.FORGOT_PASSWORD}>Şifremi Unuttum</Link>
          </div>
          <Button
            label="Giriş Yap"
            buttonType={BUTTON_TYPE.JUST_TEXT}
            htmlType={HTML_TYPE.SUBMIT}
            isLoading={loading}
            disabled={!Object.values(values).every((x) => x !== "")}
          />
        </form>
      </div>
      <p className={styles.bottomText}>
        Hesabınız yok mu? <Link to={ROUTES.SIGN_UP}>Kayıt ol</Link>
      </p>
    </div>
  );
};
