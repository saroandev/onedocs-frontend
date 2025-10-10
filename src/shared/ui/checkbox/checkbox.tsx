/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSX } from "react";
import classnames from "classnames";
import styles from "./checkbox.module.scss";
import { IconCheck, IconCheckDisabled, IconErrorTriangle } from "../icons";

export const Checkbox = (props: Props) => {
  const { checked, className, disabled, label, error, isRequired, popover, ...rest } = props;

  return (
    <label className={classnames(styles.container, className, disabled && styles.disabled)}>
      <div className={styles.checkboxWrapper}>
        <input type="checkbox" checked={checked} disabled={disabled} {...rest} />
        {checked && <IconCheck className={styles.iconChecked} />}
        {disabled && <IconCheckDisabled className={styles.iconDisabled} />}
        {error && (
          <div className={styles.viewError}>
            <IconErrorTriangle />
            <span>{label}</span>
          </div>
        )}
        {popover && <div className={styles.popover}>{popover}</div>}
      </div>
      {label && (
        <div className={styles.label}>
          {label} {isRequired && <span>*</span>}
        </div>
      )}
    </label>
  );
};

type InputProps = Omit<JSX.IntrinsicElements["input"], "popover">;

export interface Props extends InputProps {
  error?: any;
  name?: string;
  label?: string;
  popover?: string;
  checked: boolean;
  disabled?: boolean;
  className?: string;
  isRequired?: boolean;
  onChange: (_val: React.ChangeEvent<HTMLInputElement>) => void;
}
