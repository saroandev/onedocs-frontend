import { Slot } from "@radix-ui/react-slot";
import classnames from "classnames";
import styles from "./badge.module.scss";

interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: "default" | "secondary" | "destructive" | "outline";
  asChild?: boolean;
}

function Badge({ className, variant = "default", asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={classnames(styles.badge, className)}
      {...props}
    />
  );
}

export { Badge };
