import classnames from "classnames";
import { BUTTON_TYPE, BUTTON_VARIANT, HTML_TYPE, ICON_TYPE } from "./button-config";
import {
  Plus,
  MoveRight,
  ChevronDown,
  ChevronRight,
  X,
  Trash,
  FolderPlus,
  EllipsisVertical,
  SlidersHorizontal,
  Minus,
  Bell,
  Search,
  Pencil,
  Download,
  Check,
  Copy,
  Upload,
} from "lucide-react";
import styles from "./button.module.scss";
import { IconLoadingSpin } from "../icons";

export const Button = (props: Props) => {
  const {
    label,
    isLoading,
    className,
    iconType = { default: ICON_TYPE.NONE, custom: null },
    htmlType = HTML_TYPE.BUTTON,
    disabled,
    onClick,
    buttonType,
    variant,
    iconTextReverse,
  } = props;

  const iconTypes = {
    [ICON_TYPE.ADD]: <Plus />,
    [ICON_TYPE.ARROW]: <MoveRight />,
    [ICON_TYPE.DELETE]: <Trash />,
    [ICON_TYPE.EXPORT]: <Download />,
    [ICON_TYPE.DOCUMENT]: <FolderPlus />,
    [ICON_TYPE.UPDATE]: <Pencil />,
    [ICON_TYPE.SEARCH]: <Search />,
    [ICON_TYPE.CLOSE]: <X />,
    [ICON_TYPE.NOTIFY]: <Bell />,
    [ICON_TYPE.ARROW_DOWN]: <ChevronDown />,
    [ICON_TYPE.MINUS]: <Minus />,
    [ICON_TYPE.PLUS]: <Plus />,
    [ICON_TYPE.FILTER]: <SlidersHorizontal />,
    [ICON_TYPE.DOTS]: <EllipsisVertical />,
    [ICON_TYPE.ARROW_RIGHT]: <ChevronRight />,
    [ICON_TYPE.TICK]: <Check />,
    [ICON_TYPE.COPY]: <Copy />,
    [ICON_TYPE.UPLOAD]: <Upload />,
    [ICON_TYPE.NONE]: <></>,
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.progress}>
          <IconLoadingSpin />
        </div>
      );
    }

    if (buttonType == BUTTON_TYPE.JUST_TEXT) {
      return <span>{label}</span>;
    }

    if (buttonType == BUTTON_TYPE.JUST_ICON) {
      return (
        <>
          {iconType.custom || iconTypes[iconType.default]}
          {label && <div className={styles.popover}>{label}</div>}
        </>
      );
    }

    return (
      <>
        <span>{label}</span>
        {iconType.custom || iconTypes[iconType.default]}
      </>
    );
  };

  return (
    <button
      disabled={isLoading || disabled}
      type={htmlType}
      onClick={onClick}
      className={classnames(
        styles.container,
        className,
        buttonType == BUTTON_TYPE.JUST_ICON && styles.justIcon,
        iconType.custom && styles.customIcon,
        isLoading && styles.loadingButton,
        disabled && styles.disabledButton,
        variant && styles[variant],
        iconTextReverse && styles.iconTextReverse
      )}
    >
      {renderContent()}
    </button>
  );
};

export interface Props {
  label: string | number;
  isLoading?: boolean;
  className?: string;
  iconType?: {
    default:
      | ICON_TYPE.NONE
      | ICON_TYPE.DELETE
      | ICON_TYPE.ARROW
      | ICON_TYPE.EXPORT
      | ICON_TYPE.ADD
      | ICON_TYPE.DOCUMENT
      | ICON_TYPE.UPDATE
      | ICON_TYPE.SEARCH
      | ICON_TYPE.CLOSE
      | ICON_TYPE.NOTIFY
      | ICON_TYPE.ARROW_DOWN
      | ICON_TYPE.MINUS
      | ICON_TYPE.PLUS
      | ICON_TYPE.FILTER
      | ICON_TYPE.DOTS
      | ICON_TYPE.ARROW_RIGHT
      | ICON_TYPE.TICK
      | ICON_TYPE.COPY;
    custom?: null | React.ReactElement;
  };
  buttonType: BUTTON_TYPE.ICON_WITH_TEXT | BUTTON_TYPE.JUST_ICON | BUTTON_TYPE.JUST_TEXT;
  disabled?: boolean;
  htmlType?: HTML_TYPE.BUTTON | HTML_TYPE.SUBMIT;
  onClick?: (_val: React.MouseEvent<HTMLButtonElement>) => void;
  iconTextReverse?: boolean;
  variant?:
    | BUTTON_VARIANT.PRIMARY
    | BUTTON_VARIANT.SECONDARY
    | BUTTON_VARIANT.TERTIARY
    | BUTTON_VARIANT.OUTLINE
    | BUTTON_VARIANT.GHOST;
}
