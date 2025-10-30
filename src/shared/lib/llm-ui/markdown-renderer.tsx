/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./markdown-renderer.module.scss";
import { useMemo } from "react";
import rehypeRaw from "rehype-raw";

export const MarkdownRenderer = (props: MarkdownRendererProps) => {
  const { content, onSourceClick } = props;

  const processedContent = useMemo(() => {
    const cleanContent = content.trim().replace(/\n{3,}/g, "\n\n");

    return cleanContent.replace(
      /\[Source (\d+)\]/g,
      '<span class="source-link" data-source="$1">[Source $1]</span>'
    );
  }, [content]);

  useMemo(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("source-link")) {
        e.preventDefault();
        const sourceNumber = parseInt(target.getAttribute("data-source") || "0", 10);
        if (sourceNumber > 0) {
          onSourceClick?.(sourceNumber);
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [onSourceClick]);

  const markdownComponents = {
    h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
    h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
    p: ({ children }) => <p className={styles.paragraph}>{children}</p>,
    ul: ({ children }) => <ul className={styles.unorderedList}>{children}</ul>,
    ol: ({ children }) => <ol className={styles.orderedList}>{children}</ol>,
    li: ({ children }) => <li className={styles.listItem}>{children}</li>,
    a: ({ href, children }) => (
      <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    blockquote: ({ children }) => <blockquote className={styles.blockquote}>{children}</blockquote>,
    table: ({ children }) => (
      <div className={styles.tableWrapper}>
        <table className={styles.table}>{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className={styles.thead}>{children}</thead>,
    tbody: ({ children }) => <tbody className={styles.tbody}>{children}</tbody>,
    tr: ({ children }) => <tr className={styles.tr}>{children}</tr>,
    th: ({ children }) => <th className={styles.th}>{children}</th>,
    td: ({ children }) => <td className={styles.td}>{children}</td>,
    strong: ({ children }) => <strong className={styles.strong}>{children}</strong>,
    em: ({ children }) => <em className={styles.em}>{children}</em>,
  };

  return (
    <div className={styles.markdownWrapper}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={markdownComponents}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

interface MarkdownRendererProps {
  content: string;
  onSourceClick?: (sourceNumber: number) => void;
}
