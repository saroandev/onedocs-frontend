import type { CodeToHtmlOptions } from "@llm-ui/code";
import { loadHighlighter, useCodeBlockToHtml, allLangs, allLangsAlias } from "@llm-ui/code";
// WARNING: Importing bundledThemes increases your bundle size
// see: https://llm-ui.com/docs/blocks/code#bundle-size
import { bundledThemes } from "shiki/themes";
import { type LLMOutputComponent } from "@llm-ui/react";
import parseHtml from "html-react-parser";
import { bundledLanguagesInfo } from "shiki/langs";
import { createHighlighter } from "shiki"; // Değişiklik burada

const highlighter = loadHighlighter(
  createHighlighter({
    // getHighlighterCore yerine createHighlighter
    langs: allLangs(bundledLanguagesInfo),
    langAlias: allLangsAlias(bundledLanguagesInfo),
    themes: Object.values(bundledThemes),
  })
);

const codeToHtmlOptions: CodeToHtmlOptions = {
  theme: "github-dark",
};

// Customize this component with your own styling
export const CodeBlock: LLMOutputComponent = ({ blockMatch }) => {
  const { html, code } = useCodeBlockToHtml({
    markdownCodeBlock: blockMatch.output,
    highlighter,
    codeToHtmlOptions,
  });
  if (!html) {
    // fallback to <pre> if Shiki is not loaded yet
    return (
      <pre className="shiki">
        <code>{code}</code>
      </pre>
    );
  }
  return <>{parseHtml(html)}</>;
};
