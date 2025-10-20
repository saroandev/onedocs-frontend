/* eslint-disable @typescript-eslint/no-explicit-any */
import classnames from "classnames";
import styles from "./textarea.module.scss";
import { IconErrorTriangle } from "../icons";
import type { JSX } from "react";

export const Textarea = (props: Props) => {
  const { error, label, disabled, className, isRequired, ...rest } = props;

  return (
    <div className={classnames(styles.container, className, disabled && styles.disabled)}>
      {label && (
        <div className={styles.label}>
          {label} {isRequired && <span>*</span>}
        </div>
      )}
      <div className={styles.textareaWrapper}>
        <textarea disabled={disabled} className={classnames(error && styles.error)} {...rest} />
        {error && (
          <div className={styles.viewError}>
            <IconErrorTriangle />
            <span>{label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

type TextareaProps = JSX.IntrinsicElements["textarea"];

export interface Props extends TextareaProps {
  label?: string;
  error?: any;
  rows?: number;
  value: string;
  name?: string;
  maxLength?: number;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  isRequired?: boolean;
  onChange: (_val: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (_val: React.FocusEvent<HTMLTextAreaElement>) => void;
}
