/* eslint-disable @typescript-eslint/no-explicit-any */
import classnames from "classnames";
import type { JSX } from "react";
import styles from "./radio.module.scss";
import { IconErrorTriangle } from "../icons";

export const Radio = (props: RadioProps) => {
  const {
    checked,
    onChange,
    className,
    disabled,
    label,
    name,
    error,
    value,
    isRequired,
    popover,
    ...rest
  } = props;

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e);

  return (
    <label
      htmlFor={`${name}-${value}`}
      className={classnames(styles.container, className, disabled && styles.disabled)}
    >
      <div className={styles.radioWrapper}>
        <input
          id={`${name}-${value}`}
          name={`${name}-${value}`}
          type="radio"
          value={value}
          onChange={handleRadioChange}
          disabled={disabled}
          checked={checked}
          {...rest}
        />
        <span
          className={classnames(
            styles.checkedWrapper,
            checked ? styles.checked : styles.unchecked,
            disabled && styles.checkedDisabled
          )}
        >
          <span className={classnames(styles.innerDot, checked ? styles.visible : styles.hidden)} />
        </span>
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

const RadioGroup = (props: RadioGroupProps) => {
  const { options, disabled, name, className, value, onChange, isVertical = false } = props;

  return (
    <div className={classnames(styles.radioGroup, isVertical && styles.vertical, className)}>
      {options.map((option) => (
        <Radio
          name={name}
          key={option.value}
          label={option.label}
          value={option.value}
          checked={value === option.value}
          disabled={option.disabled || disabled}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

Radio.Group = RadioGroup;

type InputProps = Omit<JSX.IntrinsicElements["input"], "onChange" | "checked" | "popover">;

export interface RadioProps extends InputProps {
  error?: any;
  name?: string;
  label?: string;
  popover?: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  isRequired?: boolean;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioGroupProps {
  options: Array<{
    label: string;
    value: number | string;
    disabled?: boolean;
  }>;
  disabled?: boolean;
  name?: string;
  className?: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isVertical?: boolean;
}
