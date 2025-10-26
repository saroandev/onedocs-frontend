/* eslint-disable @typescript-eslint/no-explicit-any */
// src/shared/ui/markdown-renderer/markdown-renderer.tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useEffect } from "react";
import styles from "./markdown-renderer.module.scss";

// Prism.js importları
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Dark tema
// Popüler dilleri import et
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-css";
import "prismjs/components/prism-scss";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer = (props: MarkdownRendererProps) => {
  const { content } = props;

  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : "";
          const codeContent = String(children).replace(/\n$/, "");

          return !inline && language ? (
            <div className={styles.codeBlock}>
              <div className={styles.codeBlockHeader}>
                <span className={styles.language}>{language}</span>
                <button className={styles.copyButton} onClick={() => copyToClipboard(codeContent)}>
                  Kopyala
                </button>
              </div>
              <pre className={`language-${language}`}>
                <code className={`language-${language}`}>{codeContent}</code>
              </pre>
            </div>
          ) : (
            <code className={styles.inlineCode} {...props}>
              {children}
            </code>
          );
        },

        // Başlıklar
        h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
        h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
        h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,

        // Paragraf
        p: ({ children }) => <p className={styles.paragraph}>{children}</p>,

        // Listeler
        ul: ({ children }) => <ul className={styles.unorderedList}>{children}</ul>,
        ol: ({ children }) => <ol className={styles.orderedList}>{children}</ol>,
        li: ({ children }) => <li className={styles.listItem}>{children}</li>,

        // Linkler
        a: ({ href, children }) => (
          <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),

        // Blockquote
        blockquote: ({ children }) => (
          <blockquote className={styles.blockquote}>{children}</blockquote>
        ),

        // Tablolar
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

        // Strong (Bold)
        strong: ({ children }) => <strong className={styles.strong}>{children}</strong>,

        // Em (Italic)
        em: ({ children }) => <em className={styles.em}>{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
