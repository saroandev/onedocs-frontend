import styles from "@/widgets/chat/styles/chat-area.module.scss";

export const ChatWelcome = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.emptyStateContainer}>
          <div className={styles.emptyStateContent}>
            <div className={styles.emptyStateHeader}>
              <div className={styles.titleWrapper}>
                <h1 className={styles.mainTitle}>Hukuk Asistani</h1>
              </div>
              <p className={styles.subtitle}>
                Hukuk Asistanı; sorularınızı yanıtlar, metinleri özetler, dilekçe ve sözleşme
                taslakları oluşturur, ilgili mevzuat ve emsal kararlara yönlendirir. Kısaca, günlük
                hukuki işlerinizi hızlandırmak için yanınızdadır
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
