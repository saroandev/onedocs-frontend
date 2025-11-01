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
import { useAuthStore } from "@/features/auth/store/auth.store";

// jsdelivr CDN'den worker yükle - cloudflare CDN'de versiyon yok
// Alternatif: unpkg.com da kullanılabilir
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const PdfViewer = (props: PdfViewerProps) => {
  const { fileUrl, pageable = false } = props;
  const setShowPdfViewer = useChatStore((state) => state.setShowPdfViewer);
  const isLoadingSourceUrl = useChatStore((state) => state.isLoadingSourceUrl);
  const token = useAuthStore((state) => state.token);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);
  const [scale, setScale] = useState<number>(1.0);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const documentRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // PDF'i fetch ile indir ve blob URL oluştur
  const fetchPdfAsBlob = async (url: string, authToken: string) => {
    try {
      console.log("🔄 Fetching PDF from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        redirect: "follow", // Redirect'leri takip et (301, 302, etc.)
      });

      console.log("📡 Response status:", response.status, response.statusText);
      console.log("📡 Final URL after redirects:", response.url);

      const contentType = response.headers.get("content-type");
      console.log("📄 Content-Type:", contentType);

      // Backend JSON hata mesajı mı dönüyor kontrol et
      if (contentType?.includes("application/json")) {
        const errorData = await response.json();
        console.error("❌ Backend error response (FULL):", JSON.stringify(errorData, null, 2));
        console.error("❌ Error detail:", errorData?.detail);
        console.error("❌ Error code:", errorData?.detail?.error?.code);
        console.error("❌ Error message:", errorData?.detail?.error?.message);

        const errorMessage = errorData?.detail?.error?.message
          || errorData?.detail?.message
          || errorData?.message
          || "Backend PDF döndürmedi, JSON hata mesajı geldi";

        throw new Error(errorMessage);
      }

      // 200-299 arası başarılı sayılır
      if (!response.ok) {
        console.error("❌ PDF fetch failed:", response.status, response.statusText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // PDF kontrolü
      if (!contentType?.includes("application/pdf")) {
        console.error("❌ Wrong content type:", contentType);
        throw new Error(`Expected PDF but got: ${contentType}`);
      }

      const blob = await response.blob();
      console.log("✅ PDF blob received. Size:", blob.size, "bytes");

      if (blob.size < 1000) {
        console.warn("⚠️ Suspiciously small PDF blob, might be an error");
      }

      const blobUrl = URL.createObjectURL(blob);
      console.log("✅ PDF blob URL created:", blobUrl);
      setPdfBlobUrl(blobUrl);
    } catch (err) {
      console.error("❌ PDF fetch error:", err);
      setError(true);
      setIsLoading(false);
      showNotification("error", "PDF yüklenirken hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  // fileUrl değiştiğinde PDF'i fetch et
  useEffect(() => {
    if (fileUrl && token) {
      setIsLoading(true);
      setError(false);
      setPdfBlobUrl(null);
      fetchPdfAsBlob(fileUrl, token);
    }

    // Cleanup: blob URL'i temizle
    return () => {
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
    };
    // ⚠️ pdfBlobUrl dependency'den ÇIKARILDI - infinite loop önlendi!
  }, [fileUrl, token]);

  const file = useMemo(() => {
    if (!pdfBlobUrl) return null;

    // Blob URL kullan - artık authentication gerektirmez
    return { url: pdfBlobUrl };
  }, [pdfBlobUrl]);

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
}
