import React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import classNames from "classnames";
import styles from "./sheet.module.scss";
//TODO
export const Sheet: React.FC<React.ComponentProps<typeof SheetPrimitive.Root>> = ({ ...props }) => {
  return <SheetPrimitive.Root {...props} />;
};

export const SheetTrigger: React.FC<React.ComponentProps<typeof SheetPrimitive.Trigger>> = ({
  ...props
}) => {
  return <SheetPrimitive.Trigger {...props} />;
};

export const SheetClose: React.FC<React.ComponentProps<typeof SheetPrimitive.Close>> = ({
  ...props
}) => {
  return <SheetPrimitive.Close {...props} />;
};

export const SheetPortal: React.FC<React.ComponentProps<typeof SheetPrimitive.Portal>> = ({
  ...props
}) => {
  return <SheetPrimitive.Portal {...props} />;
};

export const SheetOverlay: React.FC<React.ComponentProps<typeof SheetPrimitive.Overlay>> = ({
  className,
  ...props
}) => {
  return <SheetPrimitive.Overlay className={classNames(styles.overlay, className)} {...props} />;
};

interface SheetContentProps extends React.ComponentProps<typeof SheetPrimitive.Content> {
  side?: "top" | "right" | "bottom" | "left";
  overlay?: boolean;
  shadow?: boolean;
}

export const SheetContent: React.FC<SheetContentProps> = ({
  className,
  children,
  side = "right",
  overlay = true,
  shadow = true,
  ...props
}) => {
  return (
    <SheetPortal>
      {overlay && <SheetOverlay />}
      <SheetPrimitive.Content
        className={classNames(
          styles.content,
          styles[`side-${side}`],
          shadow && styles.shadow,
          className
        )}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
};

export const SheetHeader: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => {
  return <div className={classNames(styles.header, className)} {...props} />;
};

export const SheetFooter: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => {
  return <div className={classNames(styles.footer, className)} {...props} />;
};

export const SheetTitle: React.FC<React.ComponentProps<typeof SheetPrimitive.Title>> = ({
  className,
  ...props
}) => {
  return <SheetPrimitive.Title className={classNames(styles.title, className)} {...props} />;
};

export const SheetDescription: React.FC<
  React.ComponentProps<typeof SheetPrimitive.Description>
> = ({ className, ...props }) => {
  return (
    <SheetPrimitive.Description className={classNames(styles.description, className)} {...props} />
  );
};
