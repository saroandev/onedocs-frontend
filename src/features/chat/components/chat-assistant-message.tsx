import { Button } from "@/shared/ui";
import styles from "@/widgets/chat/styles/chat-area.module.scss";
import classnames from "classnames";
// import { throttleBasic, useLLMOutput, useStreamExample } from "@llm-ui/react";
// import { CodeBlock, MarkdownComponent } from "@/shared/lib/llm-ui";
// import { codeBlockLookBack, findCompleteCodeBlock, findPartialCodeBlock } from "@llm-ui/code";
// import { markdownLookBack } from "@llm-ui/markdown";

// const chatLikeThrottle = throttleBasic({
//   readAheadChars: 40, // LLM çıktısının 40 karakterini buffer olarak hazırla
//   targetBufferChars: 25, // Yazarken 25 karakterlik bir fark bırak
//   adjustPercentage: 0.3, // Hızlanma/yavaşlama oranı (düşük = daha doğal)
//   frameLookBackMs: 8000, // Ortalama hız hesaplamasında 8 saniyelik pencere
//   windowLookBackMs: 1500, // Küçük anlık yavaşlama/yumuşatma süresi
// });

export const ChatAssistantMessage = (props: ChatAssistantMessageProps) => {
  const { data } = props;
  // const { isStreamFinished, output } = useStreamExample(data);

  // const { blockMatches } = useLLMOutput({
  //   llmOutput: output,
  //   fallbackBlock: {
  //     component: MarkdownComponent, // from Step 1
  //     lookBack: markdownLookBack(),
  //   },
  //   blocks: [
  //     {
  //       component: CodeBlock, // from Step 2
  //       findCompleteMatch: findCompleteCodeBlock(),
  //       findPartialMatch: findPartialCodeBlock(),
  //       lookBack: codeBlockLookBack(),
  //     },
  //   ],
  //   isStreamFinished,
  //   throttle: chatLikeThrottle,
  // });

  // const handleMail = (data: ChatMessageType) => {
  //   const subject = encodeURIComponent("Sohbet Mesajı");
  //   const body = encodeURIComponent(data.content);
  //   window.location.href = `mailto:?subject=${subject}&body=${body}`;
  // };

  return (
    <div className={classnames(styles.messageWrapper, styles.assistantMessage)}>
      <div className={styles.messageContent}>
        <div className={styles.assistantBubble}>
          <div className={styles.textContent}>{data}</div>

          {/* {isFetching ? (
            <div className={styles.textContent}>{data}</div>
          ) : (
          <div className={styles.textContent}>
            {blockMatches.map((blockMatch, index) => {
              const Component = blockMatch.block.component;
              return <Component key={index} blockMatch={blockMatch} />;
            })}
          </div>
          )} */}
          <div className={styles.actionButtons}>
            <Button
              label="Beğen"
              buttonType="justIcon"
              iconType={{ default: "like" }}
              variant="secondary"
            />
            <Button
              label="Beğenme"
              buttonType="justIcon"
              iconType={{ default: "dislike" }}
              variant="secondary"
            />
            <Button
              label="Kopyala"
              buttonType="justIcon"
              iconType={{ default: "copy" }}
              variant="secondary"
              onClick={() => navigator.clipboard?.writeText(data)}
            />
            <Button
              label="E-posta"
              buttonType="justIcon"
              iconType={{ default: "mail" }}
              variant="secondary"
              // onClick={() => handleMail(data)}
            />
            <Button
              label="Editöre Ekle"
              buttonType="justIcon"
              iconType={{ default: "update" }}
              variant="secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ChatAssistantMessageProps {
  data: string;
}
