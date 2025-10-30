import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";
import classnames from "classnames";
import { X } from "lucide-react";
import styles from "@/widgets/chat/styles/chat-prompt.module.scss";

export const ChatPromptOptions = (props: PromptOptionsProps) => {
  const { selectedPromptOptions, onRemove, isSubmit } = props;

  const getColorClass = (name: string) => {
    const colors = [
      styles.color0,
      styles.color1,
      styles.color2,
      styles.color3,
      styles.color4,
      styles.color5,
      styles.color6,
      styles.color7,
    ];

    const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const handleRemove = (item: string) => {
    if (isSubmit) return;
    onRemove(item);
  };

  return (
    <div className={styles.selectedItems}>
      {selectedPromptOptions.slice(0, 3).map((item) => (
        <div key={item} className={classnames(styles.badge, getColorClass(item))}>
          <span>{item}</span>
          <button onClick={() => handleRemove(item)} className={styles.badgeRemove}>
            <X className={styles.xIcon} />
          </button>
        </div>
      ))}
      {selectedPromptOptions.slice(3).length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <button className={styles.moreButton}>
              +{selectedPromptOptions.slice(3).length} daha
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className={styles.popoverContent}>
            <div className={styles.popoverGrid}>
              {selectedPromptOptions.slice(3).map((item) => (
                <div key={item} className={classnames(styles.popoverItem, getColorClass(item))}>
                  <span className={styles.popoverLabel}>{item}</span>
                  <button onClick={() => handleRemove(item)} className={styles.badgeRemove}>
                    <X className={styles.xIcon} />
                  </button>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

interface PromptOptionsProps {
  selectedPromptOptions: string[];
  onRemove: (selectedItemId: string) => void;
  isSubmit: boolean;
}
