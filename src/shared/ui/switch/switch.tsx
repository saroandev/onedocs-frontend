import * as SwitchPrimitive from "@radix-ui/react-switch";
import classnames from "classnames";
import styles from "./switch.module.scss";

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={classnames(styles.switch, className)}
      {...props}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={styles.thumb} />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
