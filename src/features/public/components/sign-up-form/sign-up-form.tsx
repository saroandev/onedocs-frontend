/* eslint-disable @typescript-eslint/no-unused-vars */
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import styles from "./sign-up-form.module.scss";
import { useSignUp } from "../../hooks";
import type { SignUpDto } from "../../api/public.types";
import { getInitialSignupValues } from "../../constants";
import { showNotification } from "@/shared/lib/notification";
import { Button, Input } from "@/shared/ui";
import { BUTTON_TYPE, HTML_TYPE } from "@/shared/ui/button/button-config";

export const SignUpForm = () => {
  const { mutate: signUp, isPending: loading } = useSignUp();

  const { handleSubmit, handleChange, values, errors, touched, resetForm, handleBlur } = useFormik({
    initialValues: getInitialSignupValues(),
    onSubmit: async (values: SignUpDto) => {
      if (values.password !== values.confirmPassword)
        showNotification("warning", "Şifreler eşleşmiyor");

      if (values.password.length < 8)
        showNotification("warning", "Şifre en az 8 karakter olmalıdır");

      // signUp(values);
      // resetForm();
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
            placeholder="En az 8 karakter"
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
            buttonType={BUTTON_TYPE.JUST_TEXT}
            htmlType={HTML_TYPE.SUBMIT}
            isLoading={loading}
            disabled={!Object.values(values).every((x) => x !== "")}
          />
        </form>
      </div>
      <p className={styles.bottomText}>
        Zaten hesabınız var mı? <Link to="/login">Giriş yap</Link>
      </p>
    </div>
  );
};
