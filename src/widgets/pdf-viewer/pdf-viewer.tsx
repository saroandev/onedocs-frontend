/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useMemo, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styles from "./pdf-viewer.module.scss";
import { showNotification } from "@/shared/lib/notification";
import { LoaderPinwheel } from "lucide-react";
import classnames from "classnames";
import { Alert, Button } from "@/shared/ui";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useChatStore } from "@/features/chat";

// jsdelivr CDN'den worker yükle - cloudflare CDN'de versiyon yok
// Alternatif: unpkg.com da kullanılabilir
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const PdfViewer = (props: PdfViewerProps) => {
  const { fileUrl, pageable = false, highlightText = "" } = props;
  const setShowPdfViewer = useChatStore((state) => state.setShowPdfViewer);
  const isLoadingSourceUrl = useChatStore((state) => state.isLoadingSourceUrl);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);
  const [scale, setScale] = useState<number>(1.0);
  const documentRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const file = useMemo(() => {
    if (!fileUrl) return null;

    // Direkt HTTPS presigned URL kullan - artık blob'a çevirmeye gerek yok
    return { url: fileUrl };
  }, [fileUrl]);

  const options = useMemo(
    () => ({
      cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/standard_fonts/`,
    }),
    []
  );

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setCurrentPage(1);
    setIsLoading(false);
  };

  // PDF yüklendikten sonra text'i highlight et
  useEffect(() => {
    if (!highlightText || !numPages || isLoading) return;

    // TextLayer render olması için kısa bir delay
    const timer = setTimeout(() => {
      highlightTextInPdf(highlightText);
    }, 500);

    return () => clearTimeout(timer);
  }, [highlightText, numPages, isLoading]);

  const highlightTextInPdf = (searchText: string) => {
    if (!containerRef.current) return;

    // Önceki highlight'ları temizle
    const previousHighlights = containerRef.current.querySelectorAll(".pdf-highlight");
    previousHighlights.forEach((el) => el.classList.remove("pdf-highlight"));

    // TextLayer'daki tüm text span'leri bul
    const textLayerDivs = containerRef.current.querySelectorAll(".react-pdf__Page__textContent");

    let firstMatch: HTMLElement | null = null;
    let foundMatch = false;

    textLayerDivs.forEach((textLayer) => {
      const textSpans = textLayer.querySelectorAll("span");

      // Tüm text'i birleştir ve normalize et
      let fullText = "";
      const spanMap: { start: number; end: number; span: HTMLElement }[] = [];

      textSpans.forEach((span) => {
        const start = fullText.length;
        const text = span.textContent || "";
        fullText += text;
        spanMap.push({ start, end: fullText.length, span });
      });

      // Normalize edilmiş text'te ara
      const normalizedSearchText = searchText.toLowerCase().trim();
      const normalizedFullText = fullText.toLowerCase();

      const index = normalizedFullText.indexOf(normalizedSearchText);

      if (index !== -1) {
        foundMatch = true;
        const matchEnd = index + normalizedSearchText.length;

        // Eşleşen text'in hangi span'lerde olduğunu bul
        spanMap.forEach(({ start, end, span }) => {
          if ((start >= index && start < matchEnd) || (end > index && end <= matchEnd) || (start <= index && end >= matchEnd)) {
            span.classList.add("pdf-highlight");
            if (!firstMatch) {
              firstMatch = span;
            }
          }
        });
      }
    });

    // İlk eşleşmeye scroll yap
    if (firstMatch && containerRef.current) {
      setTimeout(() => {
        firstMatch?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);

      console.log("✅ Text highlighted and scrolled:", searchText.substring(0, 50) + "...");
    } else if (!foundMatch) {
      console.warn("⚠️ Text not found in PDF:", searchText.substring(0, 50) + "...");
    }
  };

  const onDocumentLoadError = (error: Error) => {
    if (error.message.includes("fetch")) {
      showNotification(
        "error",
        "PDF dosyasına erişilemiyor. Lütfen internet bağlantınızı kontrol edin."
      );
    } else if (error.message.includes("Invalid PDF")) {
      showNotification("error", "Geçersiz PDF dosyası. Lütfen dosyayı kontrol edin.");
    } else if (error.message.includes("password")) {
      showNotification("error", "Bu PDF şifre korumalıdır.");
    } else {
      showNotification("error", "PDF yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
    }

    setError(true);
    setIsLoading(false);
  };

  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, numPages));
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
  const handleClose = () => setShowPdfViewer(false);

  const handleDownload = () => {
    if (!fileUrl) return;

    // Presigned URL'den dosya indir
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `document-${Date.now()}.pdf`;
    link.target = "_blank"; // Yeni sekmede aç
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification("success", "PDF indiriliyor...");
  };

  const handlePrint = () => {
    if (!fileUrl) return;

    // Yeni pencerede aç ve yazdır
    const printWindow = window.open(fileUrl, "_blank");
    if (printWindow) {
      printWindow.addEventListener("load", () => {
        printWindow.print();
      });
    } else {
      showNotification("error", "Yazdırma penceresi açılamadı. Lütfen pop-up engelleyiciyi kontrol edin.");
    }
  };

  const renderPages = () => {
    if (!numPages) return null;

    const commonProps = {
      scale: scale,
      className: styles.page,
      renderTextLayer: true,
      renderAnnotationLayer: true,
      loading: null,
    };

    if (pageable) {
      return <Page key={`page_${currentPage}`} pageNumber={currentPage} {...commonProps} />;
    }

    return Array.from(new Array(numPages), (_, index) => (
      <Page key={`page_${index + 1}`} pageNumber={index + 1} {...commonProps} />
    ));
  };

  if (isLoadingSourceUrl) {
    return (
      <aside className={styles.container}>
        <LoaderPinwheel className={styles.loading} />
      </aside>
    );
  }

  return (
    <aside className={styles.container} onClick={(e) => e.stopPropagation()}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3 className={styles.title}>PDF Görüntüleyici</h3>
          {numPages > 0 && pageable && (
            <span className={styles.pageInfo}>
              Sayfa {currentPage} / {numPages}
            </span>
          )}
          {numPages > 0 && !pageable && <span className={styles.pageInfo}>{numPages} Sayfa</span>}
        </div>
        <Button
          label=""
          buttonType="justIcon"
          onClick={handleClose}
          iconType={{ default: "close" }}
        />
      </div>

      {isLoading && <LoaderPinwheel className={styles.loading} />}

      {!isLoading && (
        <div className={styles.toolbar}>
          {pageable && (
            <>
              <div className={styles.toolbarGroup}>
                <Button
                  buttonType="justIcon"
                  label="Önceki sayfa"
                  disabled={currentPage <= 1 || error}
                  onClick={goToPreviousPage}
                  className={styles.toolbarButton}
                  iconType={{ default: "chevron-left" }}
                />
                <Button
                  buttonType="justIcon"
                  label="Sonraki sayfa"
                  disabled={currentPage >= numPages || error}
                  onClick={goToNextPage}
                  className={styles.toolbarButton}
                  iconType={{ default: "chevron-right" }}
                />
              </div>
              <div className={styles.toolbarDivider} />
            </>
          )}
          <div className={styles.toolbarGroup}>
            <Button
              buttonType="justIcon"
              label="Uzaklaştır"
              disabled={scale <= 0.5}
              onClick={handleZoomOut}
              className={styles.toolbarButton}
              iconType={{ default: "minus" }}
            />
            <div className={styles.toolbarButton}>{Math.round(scale * 100)}%</div>
            <Button
              buttonType="justIcon"
              label="Yakınlaştır"
              disabled={scale >= 2.5}
              onClick={handleZoomIn}
              className={styles.toolbarButton}
              iconType={{ default: "plus" }}
            />
          </div>
          <div className={styles.toolbarDivider} />
          <div className={styles.toolbarGroup}>
            <Button
              buttonType="justIcon"
              label="İndir"
              disabled={!fileUrl || error}
              onClick={handleDownload}
              className={styles.toolbarButton}
              iconType={{ default: "download" }}
            />
            <Button
              buttonType="justIcon"
              label="Yazdır"
              disabled={!fileUrl || error}
              onClick={handlePrint}
              className={styles.toolbarButton}
              iconType={{ default: "printer" }}
            />
          </div>
        </div>
      )}

      {/* {error && (
        <div className={styles.content}>
          <Alert
            variant="error"
            title="Pdf yüklenemedi"
            message="Pdf yüklenirken beklenmeyen bir hata oluştu."
            showLink={false}
            className={styles.alert}
          />
        </div>
      )} */}

      <div
        ref={containerRef}
        className={classnames(
          styles.content,
          pageable ? styles.contentPageable : styles.contentScrollable
        )}
      >
        <Document
          file={file}
          options={options}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={null}
          className={styles.document}
          inputRef={documentRef}
          error={false}
        >
          {renderPages()}
        </Document>

        {error && (
          <Alert
            variant="error"
            title="Pdf yüklenemedi"
            message="Pdf yüklenirken beklenmeyen bir hata oluştu."
            showLink={false}
            className={styles.alert}
          />
        )}
      </div>
    </aside>
  );
};

interface PdfViewerProps {
  fileUrl?: string;
  pageable?: boolean;
  highlightText?: string;
}
