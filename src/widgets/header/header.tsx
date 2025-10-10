import { Button, Sheet, SheetContent, SheetTrigger } from "@/shared/ui";
import { CirclePlus, Menu } from "lucide-react";
import { useState } from "react";
import classNames from "classnames";
import { Sidebar } from "../sidebar";
import styles from "./header.module.scss";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* Mobile hamburger menu */}
      {/* <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={classNames(styles.menuButton, styles.mobileOnly)}
            aria-label="Menu"
          >
            <Menu className={styles.menuIcon} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className={styles.sheetContent}>
          <div className={styles.sheetInner}>
            <Sidebar />
          </div>
        </SheetContent>
      </Sheet> */}

      <div className={styles.titleContainer}>
        <h2 className={styles.title}>headerTitle</h2>
      </div>

      {/* Right actions */}
      <div className={styles.actions}>
        <div
          // variant="ghost"
          // size="icon"
          className={styles.actionButton}
          aria-label="Yeni Sohbet"
          title="Yeni Sohbet"
          onClick={() => console.log("handleNewChat")}
        >
          <CirclePlus className={styles.actionIcon} />
        </div>
      </div>
    </header>
  );
};
