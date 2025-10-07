import classNames from "classnames";
import styles from "./button.module.scss";

export type ButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link"
  | "black";

export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "default",
  size = "default",
  ...props
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        className
      )}
      {...props}
    />
  );
};
