import * as React from "react";
import classnames from "classnames";
import styles from "./input.module.scss";

export const Input = ({ className, type, ...props }: React.ComponentProps<"input">) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={classnames(styles.input, styles.focusVisible, styles.ariaInvalid, className)}
      {...props}
    />
  );
};
