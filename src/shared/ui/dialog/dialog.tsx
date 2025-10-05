/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import classNames from "classnames";
import styles from "./dialog.module.scss";

interface DialogProps extends React.ComponentProps<typeof DialogPrimitive.Root> {}

export function Dialog({ ...props }: DialogProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

interface DialogTriggerProps extends React.ComponentProps<typeof DialogPrimitive.Trigger> {
  className?: string;
}

export function DialogTrigger({ className, ...props }: DialogTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" className={className} {...props} />;
}

interface DialogPortalProps extends React.ComponentProps<typeof DialogPrimitive.Portal> {}

export function DialogPortal({ ...props }: DialogPortalProps) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

interface DialogCloseProps extends React.ComponentProps<typeof DialogPrimitive.Close> {
  className?: string;
}

export function DialogClose({ className, ...props }: DialogCloseProps) {
  return <DialogPrimitive.Close data-slot="dialog-close" className={className} {...props} />;
}

interface DialogOverlayProps extends React.ComponentProps<typeof DialogPrimitive.Overlay> {
  className?: string;
}

export function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={classNames(styles.overlay, className)}
      {...props}
    />
  );
}

interface DialogContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {
  className?: string;
  showCloseButton?: boolean;
  children?: React.ReactNode;
}

export function DialogContent({
  className,
  children,
  showCloseButton = false,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={classNames(styles.content, className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className={styles.closeButton}
            aria-label="Close"
          >
            <X size={16} />
            <span className={styles.srOnly}>Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

interface DialogHeaderProps extends React.ComponentProps<"div"> {
  className?: string;
}

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div data-slot="dialog-header" className={classNames(styles.header, className)} {...props} />
  );
}

interface DialogFooterProps extends React.ComponentProps<"div"> {
  className?: string;
}

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div data-slot="dialog-footer" className={classNames(styles.footer, className)} {...props} />
  );
}

interface DialogTitleProps extends React.ComponentProps<typeof DialogPrimitive.Title> {
  className?: string;
}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={classNames(styles.title, className)}
      {...props}
    />
  );
}

interface DialogDescriptionProps extends React.ComponentProps<typeof DialogPrimitive.Description> {
  className?: string;
}

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={classNames(styles.description, className)}
      {...props}
    />
  );
}
