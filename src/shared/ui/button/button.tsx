import classnames from "classnames";
import {
  BUTTON_TYPE,
  HTML_TYPE,
  ICON_TYPE,
  type ButtonType,
  type ButtonVariant,
  type HtmlType,
  type IconType,
} from "./button-config";
import {
  Plus,
  MoveRight,
  ChevronDown,
  ChevronRight,
  X,
  Trash2,
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
  MessageSquare,
  ChevronLeft,
  Table,
  UserPlus,
  Mail,
  LogOut,
  Paperclip,
  ArrowUp,
  Library,
  ThumbsUp,
  ThumbsDown,
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
    variant = "primary",
    iconTextReverse,
  } = props;

  const iconTypes = {
    [ICON_TYPE.ADD]: <Plus />,
    [ICON_TYPE.ARROW]: <MoveRight />,
    [ICON_TYPE.DELETE]: <Trash2 />,
    [ICON_TYPE.EXPORT]: <Download />,
    [ICON_TYPE.DOCUMENT]: <FolderPlus />,
    [ICON_TYPE.UPDATE]: <Pencil />,
    [ICON_TYPE.SEARCH]: <Search />,
    [ICON_TYPE.CLOSE]: <X />,
    [ICON_TYPE.NOTIFY]: <Bell />,
    [ICON_TYPE.ARROW_DOWN]: <ChevronDown />,
    [ICON_TYPE.ARROW_UP]: <ArrowUp />,
    [ICON_TYPE.MINUS]: <Minus />,
    [ICON_TYPE.PLUS]: <Plus />,
    [ICON_TYPE.FILTER]: <SlidersHorizontal />,
    [ICON_TYPE.DOTS]: <EllipsisVertical />,
    [ICON_TYPE.CHEV_RIGHT]: <ChevronRight />,
    [ICON_TYPE.CHEV_LEFT]: <ChevronLeft />,
    [ICON_TYPE.TICK]: <Check />,
    [ICON_TYPE.COPY]: <Copy />,
    [ICON_TYPE.UPLOAD]: <Upload />,
    [ICON_TYPE.MESSAGE]: <MessageSquare />,
    [ICON_TYPE.TABLE]: <Table />,
    [ICON_TYPE.USER]: <UserPlus />,
    [ICON_TYPE.MAIL]: <Mail />,
    [ICON_TYPE.OUT]: <LogOut />,
    [ICON_TYPE.PAPERCLIP]: <Paperclip />,
    [ICON_TYPE.LIBRARY]: <Library />,
    [ICON_TYPE.LIKE]: <ThumbsUp />,
    [ICON_TYPE.DISLIKE]: <ThumbsDown />,
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
    default: IconType;
    custom?: null | React.ReactElement;
  };
  buttonType: ButtonType;
  disabled?: boolean;
  htmlType?: HtmlType;
  onClick?: (_val: React.MouseEvent<HTMLButtonElement>) => void;
  iconTextReverse?: boolean;
  variant?: ButtonVariant;
}
