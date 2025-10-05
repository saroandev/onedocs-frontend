import * as SeparatorPrimitive from "@radix-ui/react-separator";
import classNames from "classnames";
import styles from "./separator.module.scss";
import { forwardRef } from "react";

interface SeparatorProps extends React.ComponentProps<typeof SeparatorPrimitive.Root> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export const Separator = forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={classNames(
        styles.separator,
        {
          [styles.horizontal]: orientation === "horizontal",
          [styles.vertical]: orientation === "vertical",
        },
        className
      )}
      {...props}
    />
  );
});

Separator.displayName = "Separator";
