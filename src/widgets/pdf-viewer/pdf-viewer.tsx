/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styles from "./pdf-viewer.module.scss";
import { showNotification } from "@/shared/lib/notification";
import { LoaderPinwheel } from "lucide-react";
import classnames from "classnames";
import { Alert, Button } from "@/shared/ui";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useChatStore } from "@/features/chat";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export const PdfViewer = (props: PdfViewerProps) => {
  const { fileUrl, highlightText = "", pageable = false } = props;
  const setShowPdfViewer = useChatStore((state) => state.setShowPdfViewer);
  const isLoadingSourceUrl = useChatStore((state) => state.isLoadingSourceUrl);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);
  const [scale, setScale] = useState<number>(1.0);
  const [searchText, setSearchText] = useState<string>(highlightText);
  const documentRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const file = useMemo(() => {
    if (!fileUrl) return null;
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

  useEffect(() => {
    setSearchText(highlightText);
  }, [highlightText]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setCurrentPage(1);
    setIsLoading(false);
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

  const normalizeText = useCallback((text: string): string => {
    return text.toLocaleLowerCase("tr-TR").trim().replace(/\s+/g, " ");
  }, []);

  const highlightTextInDOM = useCallback(() => {
    if (!searchText || searchText.trim() === "") return;

    // Tüm text layer span'lerini bul
    const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");

    textLayers.forEach((textLayer) => {
      const spans = Array.from(textLayer.querySelectorAll('span[role="presentation"]'));

      // Tüm span'lerdeki text'i birleştir
      let fullText = "";
      const spanTexts: string[] = [];

      spans.forEach((span) => {
        const text = span.textContent || "";
        spanTexts.push(text);
        fullText += text;
      });

      // Normalize edilmiş versiyonlarda ara
      const normalizedFullText = normalizeText(fullText);
      const normalizedSearch = normalizeText(searchText);

      if (!normalizedFullText.includes(normalizedSearch)) return;

      // Search phrase'in başlangıç ve bitiş indekslerini bul
      const searchIndex = normalizedFullText.indexOf(normalizedSearch);
      if (searchIndex === -1) return;

      const searchEndIndex = searchIndex + normalizedSearch.length;

      // Hangi span'lerin highlight edilmesi gerektiğini bul
      let currentIndex = 0;
      spans.forEach((span, idx) => {
        const spanText = spanTexts[idx];
        const spanLength = normalizeText(spanText).length;
        const spanStart = currentIndex;
        const spanEnd = currentIndex + spanLength;

        // Bu span, search phrase'in içinde mi?
        if (spanEnd > searchIndex && spanStart < searchEndIndex) {
          // Önceki highlight'ları temizle
          if (!span.classList.contains("pdf-highlight-wrapper")) {
            span.classList.add("pdf-highlight-wrapper");

            // Mark elementi ekle
            const mark = document.createElement("mark");
            mark.className = "pdf-highlight";
            mark.textContent = spanText;

            // Span'in içeriğini temizle ve mark ekle
            span.textContent = "";
            span.appendChild(mark);
          }
        }

        currentIndex = spanEnd;
      });
    });
  }, [searchText, normalizeText]);

  const onPageRenderSuccess = useCallback(() => {
    setTimeout(() => {
      highlightTextInDOM();
    }, 100);
  }, [highlightTextInDOM]);

  useEffect(() => {
    if (numPages > 0) {
      // Önce tüm highlight'ları temizle
      const existingHighlights = document.querySelectorAll(".pdf-highlight-wrapper");
      existingHighlights.forEach((span) => {
        const mark = span.querySelector("mark.pdf-highlight");
        if (mark) {
          const text = mark.textContent || "";
          span.textContent = text;
          span.classList.remove("pdf-highlight-wrapper");
        }
      });

      highlightTextInDOM();
    }
  }, [searchText, currentPage, numPages, highlightTextInDOM]);

  const renderPages = () => {
    if (!numPages) return null;

    const commonProps = {
      scale: scale,
      className: styles.page,
      renderTextLayer: true,
      renderAnnotationLayer: true,
      loading: null,
      onRenderSuccess: onPageRenderSuccess,
    };

    if (pageable) {
      return (
        <Page key={`page_${currentPage}_${searchText}`} pageNumber={currentPage} {...commonProps} />
      );
    }

    return Array.from(new Array(numPages), (_, index) => (
      <Page key={`page_${index + 1}_${searchText}`} pageNumber={index + 1} {...commonProps} />
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
        </div>
      )}

      {error && (
        <div className={styles.content}>
          <Alert
            variant="error"
            title="Pdf yüklenemedi"
            message="Pdf yüklenirken beklenmeyen bir hata oluştu."
            showLink={false}
            className={styles.alert}
          />
        </div>
      )}

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
        >
          {renderPages()}
        </Document>
      </div>
    </aside>
  );
};

interface PdfViewerProps {
  fileUrl?: string;
  highlightText?: string;
  pageable?: boolean;
}
