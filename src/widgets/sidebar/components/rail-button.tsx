import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui";
import classnames from "classnames";
import styles from "./rail-button.module.scss";

export const RailButton = (props: RailButtonProps) => {
  const { icon, label, selected = false, onClick } = props;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          onClick={onClick}
          className={classnames(styles.button, {
            [styles.selected]: selected,
            [styles.unselected]: !selected,
          })}
        >
          {icon}
        </div>
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
