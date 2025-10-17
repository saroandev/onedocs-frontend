import { useFormik } from "formik";
import { Link } from "react-router-dom";
import styles from "../styles/sign-up-form.module.scss";
import { useSignUp } from "../hooks";
import { getInitialSignupValues } from "../constants";
import { showNotification } from "@/shared/lib/notification";
import { Button, Input } from "@/shared/ui";
import { ROUTES } from "@/app/router/config/routes.config";

export const SignUpForm = () => {
  const { mutate: signUp, isPending: loading } = useSignUp();

  const { handleSubmit, handleChange, values, errors, touched, handleBlur } = useFormik({
    initialValues: getInitialSignupValues(),
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        showNotification("warning", "Şifreler eşleşmiyor");
        return;
      }

      if (values.password.length < 6) {
        showNotification("warning", "Şifre en az 6 karakter olmalıdır");
        return;
      }

      const { email, password, name, confirmPassword } = values;

      const request = {
        email,
        password,
        full_name: name,
        password_confirm: confirmPassword,
      };

      signUp(request);
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>Hesap Oluşturun</h1>
        <p>Onedocs'a katılın ve başlayın</p>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            value={values.name}
            label="Ad Soyad"
            placeholder="Adınız Soyadınız"
            onChange={handleChange}
            disabled={loading}
            onBlur={handleBlur}
            error={touched.name && errors.name !== "" ? errors.name : ""}
          />
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
          <Input
            isExistPassword
            value={values.confirmPassword}
            name="confirmPassword"
            label="Şifre Tekrar"
            placeholder="Şifrenizi tekrar girin"
            onChange={handleChange}
            disabled={loading}
            onBlur={handleBlur}
            error={
              touched.confirmPassword && errors.confirmPassword !== "" ? errors.confirmPassword : ""
            }
          />
          <Button
            label="Hesap Oluştur"
            buttonType="justText"
            htmlType="submit"
            isLoading={loading}
            disabled={!Object.values(values).every((x) => x !== "")}
          />
        </form>
      </div>
      <p className={styles.bottomText}>
        Zaten hesabınız var mı? <Link to={ROUTES.SIGN_IN}>Giriş yap</Link>
      </p>
    </div>
  );
};
