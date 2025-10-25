// src/shared/ui/typewriter-text/typewriter-text.tsx
import { useEffect, useState, useRef, useMemo } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  isNew?: boolean;
}

// Bileşen artık state sıfırlama mantığını doğrudan içeriyor.
export const TypewriterText = (props: TypewriterTextProps) => {
  const { text, speed = 20, onComplete, isNew = false } = props;

  // 1. Durum: text değiştiğinde veya isNew true olduğunda iç state'i sıfırlamak için
  // text ve isNew'e bağlı bir "anahtar" değeri oluşturulur.
  // Bu değer değiştiğinde useState'e başlangıç değeri yeniden hesaplanır.
  const resetTrigger = useMemo(() => ({ text, isNew }), [text, isNew]);

  // displayedText'in başlangıç değeri resetTrigger'a göre hesaplanır.
  // resetTrigger değiştiğinde (text veya isNew değiştiğinde), useState'in başlangıç değeri
  // yeniden hesaplanacağı için sıfırlama (reset) etkisi sağlanır.
  const [displayedText, setDisplayedText] = useState(() =>
    resetTrigger.isNew ? "" : resetTrigger.text
  );

  // currentIndex de benzer şekilde resetTrigger'a göre sıfırlanır.
  const [currentIndex, setCurrentIndex] = useState(() =>
    resetTrigger.isNew ? 0 : resetTrigger.text.length
  );

  // Animasyonun tamamlanıp tamamlanmadığını tutan ref.
  const hasCompletedRef = useRef(!resetTrigger.isNew);

  // NOT: Eğer text veya isNew değişirse, yukarıdaki useState başlangıç fonksiyonları yeniden
  // çalışır ve state'ler sıfırlanır. Bu, useEffect içinde setDisplayedText çağırmaktan kaçınır.

  // Animasyon döngüsü (typing animation)
  useEffect(() => {
    // Animasyon tamamlandıysa veya isNew false ise (yani direkt gösterilecekse) dur.
    if (!isNew || hasCompletedRef.current) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!hasCompletedRef.current) {
      // Animasyon bittiğinde
      hasCompletedRef.current = true;
      onComplete?.();
    }
    // Bağımlılık dizisinde text, displayedText veya currentIndex yok.
    // Animasyon ilerleme durumunu currentIndex yönetiyor. text, speed, onComplete prop'ları sabit.
  }, [currentIndex, text, speed, onComplete, isNew]);

  return <span>{displayedText}</span>;
};
