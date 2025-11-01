import React from "react";
import classnames from "classnames";
import { useUIStore } from "@/shared/store/ui.store";
import styles from "./auth-layout.module.scss";
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { PdfViewer } from "@/widgets/pdf-viewer";
import { useChatStore } from "@/features/chat";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const setChoosenTab = useUIStore((state) => state.setChoosenTab);
  const showPdfViewer = useChatStore((state) => state.showPdfViewer);
  const sourceUrl = useChatStore((state) => state.sourceUrl);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainWrapper} onClick={() => setChoosenTab("")}>
        <Header />
        <main className={styles.main}>
          <div
            className={classnames(styles.contentWrapper, {
              [styles.withPdfViewer]: showPdfViewer,
            })}
          >
            {children}
          </div>
          {showPdfViewer && <PdfViewer fileUrl={sourceUrl} />}
        </main>
      </div>
    </div>
  );
};
