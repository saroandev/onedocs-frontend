import { useFormik } from "formik";
import styles from "../styles/sign-in-form.module.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "@/app/router/config/routes.config";
import { Button, Checkbox, Input } from "@/shared/ui";
import { getInitialSignInValues } from "../constants";
import { useSignIn } from "../hooks";
import { OnedocsLogo } from "@/shared/ui/icons";

export const SignInForm = () => {
  const { mutate: signIn, isPending: loading } = useSignIn();

  const { handleSubmit, handleChange, values, touched, handleBlur, errors, setFieldValue } =
    useFormik({
      initialValues: getInitialSignInValues(),
      onSubmit: async (values) => {
        const { email, password } = values;

        const request = {
          email,
          password,
        };

        signIn(request);
      },
    });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <OnedocsLogo />
      </div>
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
            placeholder="En az 6 karakter"
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
            buttonType="justText"
            htmlType="submit"
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
