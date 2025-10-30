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
  const pdfHighlightText = useChatStore((state) => state.pdfHighlightText);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainWrapper} onClick={() => setChoosenTab("")}>
        <Header />
        <main className={styles.main}>
          <div className={styles.contentWrapper}>{children}</div>
          {showPdfViewer && (
            <PdfViewer
              highlightText={pdfHighlightText}
              fileUrl={"https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"}
            />
          )}
        </main>
      </div>
    </div>
  );
};
