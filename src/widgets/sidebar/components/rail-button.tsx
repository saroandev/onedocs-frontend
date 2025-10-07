import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui";
import classnames from "classnames";
import styles from "./rail-button.module.scss";

export const RailButton: React.FC<RailButtonProps> = (props: RailButtonProps) => {
  const { icon, label, selected = false, onClick } = props;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
          onClick={onClick}
          className={classnames(styles.button, {
            [styles.selected]: selected,
            [styles.default]: !selected,
          })}
        >
          {icon}
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
};

interface RailButtonProps {
  icon: React.ReactNode;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}
