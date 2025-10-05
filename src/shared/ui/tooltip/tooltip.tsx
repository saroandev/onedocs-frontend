import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import classNames from "classnames";
import styles from "./tooltip.module.scss";
//TODO
export const TooltipProvider: React.FC<React.ComponentProps<typeof TooltipPrimitive.Provider>> = ({
  delayDuration = 0,
  ...props
}) => {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />;
};

export const Tooltip: React.FC<React.ComponentProps<typeof TooltipPrimitive.Root>> = ({
  ...props
}) => {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root {...props} />
    </TooltipProvider>
  );
};

export const TooltipTrigger: React.FC<React.ComponentProps<typeof TooltipPrimitive.Trigger>> = ({
  ...props
}) => {
  return <TooltipPrimitive.Trigger {...props} />;
};

export const TooltipContent: React.FC<React.ComponentProps<typeof TooltipPrimitive.Content>> = ({
  className,
  sideOffset = 0,
  children,
  ...props
}) => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={classNames(styles.content, className)}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className={styles.arrow} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
};
