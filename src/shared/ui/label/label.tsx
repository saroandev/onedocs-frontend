import * as LabelPrimitive from "@radix-ui/react-label";
import classnames from "classnames";
import styles from "./label.module.scss";

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={classnames(styles.label, className)}
      {...props}
    />
  );
}

export { Label };
