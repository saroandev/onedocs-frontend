/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Tabs, TabsList, TabsTrigger } from "@/shared/ui";
import { BookMarked, ChevronLeft, X } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/playbook-tab.module.scss";
import { BUTTON_TYPE, ICON_TYPE } from "@/shared/ui/button/button-config";

interface PlaybookTabProps {
  setChoosenTab: (val: string) => void;
}

export const PlaybookTab = (props: PlaybookTabProps) => {
  const { setChoosenTab } = props;

  const playbooks = [
    {
      id: "pb1",
      title: "SaaS Sözleşmesi (Alıcı Olarak)",
      description:
        "Bu playbook, yazılım hizmet (SaaS) sözleşmelerini alıcı/müşteri perspektifinden değerlendirmek için kullanılır.",
      defaultPlaybook: true,
      scope: "personal" as "personal" | "org",
      clauses: [
        {
          title: "Süre & Fesih",
          issues: [
            "Sözleşme, yazılı kabul olmaksızın otomatik yenileme hükümleri içeriyorsa, bu yüksek risktir.",
            "Fesih bildirimi için makul olmayan uzun süreler (90 gün üzeri) belirlenmişse, bu orta risktir.",
            "Fesih sonrası veri iadesi ve silme prosedürleri açıkça tanımlanmamışsa, bu yüksek risktir.",
          ],
        },
        {
          title: "Hizmet Seviyeleri (SLA)",
          issues: [
            "Uptime garantisi %99.5'in altındaysa veya hiç yoksa, bu yüksek risktir.",
            "SLA ihlali durumunda yaptırımlar ve tazminat hükümleri yoksa veya yetersizse, bu orta risktir.",
            "Planlı bakım süreleri SLA hesaplamalarına dahil ediliyorsa, bu düşük risktir.",
          ],
        },
        {
          title: "Veri Güvenliği & Gizlilik",
          issues: [
            "GDPR/KVKK uyumluluğu taahhütleri yoksa veya yetersizse, bu yüksek risktir.",
            "Veri işleme lokasyonu belirsiz veya kabul edilemez bölgelerdeyse, bu yüksek risktir.",
            "Veri ihlali bildirimi süreleri 72 saatten uzunsa, bu orta risktir.",
          ],
        },
        {
          title: "Fiyatlandırma & Ödeme",
          issues: [
            "Fiyat artışı hükümleri tek taraflı ve sınırsızsa, bu yüksek risktir.",
            "Ödeme koşulları peşin ödeme gerektiriyorsa ve iade politikası yoksa, bu orta risktir.",
            "Kullanıcı sayısı artışında otomatik faturalandırma varsa ve kontrol mekanizması yoksa, bu orta risktir.",
          ],
        },
        {
          title: "Fikri Mülkiyet Hakları",
          issues: [
            "Müşteri verisi üzerinde sağlayıcının hakları tanımlanmışsa, bu yüksek risktir.",
            "Platform üzerinde üretilen içerik/verinin mülkiyeti belirsizse, bu orta risktir.",
            "Geri bildirim ve önerilerin otomatik olarak sağlayıcıya devredildiği hükümler varsa, bu düşük risktir.",
          ],
        },
        {
          title: "Sorumluluk Sınırlamaları",
          issues: [
            "Sağlayıcının sorumluluğu ödenen ücretin altında sınırlandırılmışsa, bu orta risktir.",
            "Dolaylı zararlar için sorumluluk tamamen reddedilmişse, bu orta risktir.",
            "Veri kaybı durumunda sorumluluk sınırı çok düşükse, bu yüksek risktir.",
          ],
        },
      ],
    },
    {
      id: "pb2",
      title: "Ticari Gizlilik Sözleşmesi (Alıcı Olarak)",
      description:
        "Bu playbook, ticari gizlilik sözleşmelerini (NDA) bilgi alan taraf perspektifinden incelemek için kullanılır.",
      defaultPlaybook: true,
      scope: "personal" as "personal" | "org",
      clauses: [
        {
          title: "Gizli Bilgi Tanımı",
          issues: [
            "Gizli bilgi tanımı aşırı geniş veya belirsizse, bu yüksek risktir.",
            "Halihazırda kamuya açık bilgiler gizli bilgi kapsamına dahil ediliyorsa, bu orta risktir.",
            "Alıcının bağımsız olarak geliştirdiği bilgiler gizli sayılıyorsa, bu yüksek risktir.",
          ],
        },
        {
          title: "Gizlilik Süresi",
          issues: [
            "Gizlilik yükümlülüğü 5 yıldan uzunsa, bu orta risktir.",
            "Gizlilik süresi belirsiz veya süresiz tanımlanmışsa, bu yüksek risktir.",
            "Ticari sırlar için ayrı ve daha uzun süre öngörülmüşse, bu düşük risktir.",
          ],
        },
        {
          title: "İzin Verilen Açıklamalar",
          issues: [
            "Yasal zorunluluk durumunda bilgilendirme yükümlülüğü yoksa, bu orta risktir.",
            "Danışmanlar ve çalışanlara açıklama için yazılı onay gerekiyorsa, bu orta risktir.",
            "Mahkeme emri durumunda karşı tarafa bildirim süresi 24 saatten azsa, bu düşük risktir.",
          ],
        },
        {
          title: "İade & İmha Yükümlülüğü",
          issues: [
            "Sözleşme sonunda tüm belgelerin fiziksel olarak iadesi zorunluysa ve dijital kopya yasağı varsa, bu orta risktir.",
            "İmha için yazılı onay belgesi gerekiyorsa, bu düşük risktir.",
            "Yedekleme sistemlerinden silme yükümlülüğü makul olmayan kısa sürede öngörülmüşse, bu orta risktir.",
          ],
        },
        {
          title: "İhlal Durumunda Yaptırımlar",
          issues: [
            "Tek bir ihlalde otomatik olarak sözleşme bedelinin 10 katı tazminat öngörülmüşse, bu yüksek risktir.",
            "İhlal tanımı çok geniş ve net değilse, bu orta risktir.",
            "İhtarname verilmeksizin doğrudan dava hakkı tanınmışsa, bu orta risktir.",
          ],
        },
        {
          title: "Rekabet Yasağı Hükümleri",
          issues: [
            "NDA ile birlikte rekabet yasağı getiriliyorsa ve kapsam çok genişse, bu yüksek risktir.",
            "Çalışan transfer yasağı gibi ek yükümlülükler varsa, bu orta risktir.",
            "Coğrafi veya sektörel sınırlama makul değilse, bu yüksek risktir.",
          ],
        },
      ],
    },
    {
      id: "pb3",
      title: "İş Sözleşmesi (İşveren Olarak)",
      description:
        "Bu playbook, iş sözleşmelerini işveren perspektifinden değerlendirmek için kullanılır.",
      defaultPlaybook: false,
      scope: "org" as "personal" | "org",
      clauses: [
        {
          title: "Çalışma Koşulları",
          issues: [
            "Mesai saatleri ve fazla mesai düzenlemeleri İş Kanunu'na uygun değilse, bu yüksek risktir.",
            "Uzaktan çalışma ve hibrit model kuralları net tanımlanmamışsa, bu orta risktir.",
            "İş tanımı çok dar veya çok geniş kapsamlıysa, bu düşük risktir.",
          ],
        },
        {
          title: "Ücret & Haklar",
          issues: [
            "Prim ve ikramiye koşulları belirsiz ve keyfiyse, bu orta risktir.",
            "Yan haklar (araç, konut, vb.) vergi yükümlülüğü açısından net değilse, bu orta risktir.",
            "Ücret ödeme zamanı ve şekli İş Kanunu'na aykırıysa, bu yüksek risktir.",
          ],
        },
        {
          title: "Fesih Koşulları",
          issues: [
            "İhbar süreleri yasal minimumun altındaysa, bu yüksek risktir.",
            "Haklı fesih nedenleri çok geniş tanımlanmışsa, bu orta risktir.",
            "Kıdem ve ihbar tazminatı koşulları kanuna aykırıysa, bu yüksek risktir.",
          ],
        },
      ],
    },
    {
      id: "pb4",
      title: "Tedarik Sözleşmesi (Alıcı Olarak)",
      description:
        "Bu playbook, tedarik sözleşmelerini alıcı perspektifinden değerlendirmek için kullanılır.",
      defaultPlaybook: false,
      scope: "org" as "personal" | "org",
      clauses: [
        {
          title: "Teslimat Koşulları",
          issues: [
            "Teslimat süreleri belirsiz veya çok uzunsa, bu orta risktir.",
            "Gecikme cezaları yoksa veya sembolik düzeydeyse, bu yüksek risktir.",
            "Kısmi teslimat kuralları net değilse, bu düşük risktir.",
          ],
        },
        {
          title: "Kalite Standartları",
          issues: [
            "Kalite kontrol kriterleri tanımlanmamışsa, bu yüksek risktir.",
            "Numune onayı süreci yoksa, bu orta risktir.",
            "Ret ve iade prosedürü belirsizse, bu yüksek risktir.",
          ],
        },
        {
          title: "Fiyat & Ödeme",
          issues: [
            "Fiyat revizyonu maddeleri tek taraflıysa, bu yüksek risktir.",
            "Ödeme koşulları peşin ağırlıklıysa, bu orta risktir.",
            "Döviz kuru riski sadece alıcıya yükleniyorsa, bu orta risktir.",
          ],
        },
      ],
    },
  ];
  const [selectedPlaybook, setSelectedPlaybook] = useState<(typeof playbooks)[0] | null>(null);
  const [activePlaybookScope, setActivePlaybookScope] = useState<"personal" | "org" | string>(
    "personal"
  );

  const filteredPlaybooks = playbooks.filter((pb) => pb.scope === activePlaybookScope);

  return (
    <div className={styles.container}>
      {!selectedPlaybook && (
        <>
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>Playbooklar</h2>
              <p className={styles.subtitle}>Sözleşme inceleme için hazır playbook'ları kullanın</p>
            </div>
            <Button
              label=""
              buttonType={BUTTON_TYPE.JUST_ICON}
              onClick={() => setChoosenTab(uuidv4())}
              iconType={{ default: ICON_TYPE.CLOSE }}
            />
          </div>

          <div className={styles.content}>
            <div className={styles.filterBar}>
              <span className={styles.countText}>{filteredPlaybooks.length} playbook</span>
              <Tabs
                value={activePlaybookScope}
                onValueChange={(v) => setActivePlaybookScope(v)}
                className={styles.tabs}
              >
                <TabsList className={styles.tabsList}>
                  <TabsTrigger value="personal" className={styles.tabsTrigger}>
                    Kişisel
                  </TabsTrigger>
                  <TabsTrigger value="org" className={styles.tabsTrigger}>
                    Organizasyon
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className={styles.playbookList}>
              {filteredPlaybooks.map((pb) => (
                <div
                  key={pb.id}
                  onClick={() => setSelectedPlaybook(pb)}
                  className={styles.playbookCard}
                >
                  <div className={styles.playbookCardInner}>
                    <div className={styles.playbookIcon}>
                      <BookMarked className={styles.iconSvg} />
                    </div>
                    <div className={styles.playbookInfo}>
                      <div className={styles.playbookHeader}>
                        <h3 className={styles.playbookTitle}>{pb.title}</h3>
                      </div>
                      <p className={styles.playbookDescription}>{pb.description}</p>
                      <p className={styles.playbookMeta}>{pb.clauses.length} madde</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedPlaybook && (
        <div className={styles.detailView}>
          <div className={styles.detailHeader}>
            <div
              // variant="ghost"
              // size="sm"
              className={styles.backButton}
              onClick={() => setSelectedPlaybook(null)}
            >
              <ChevronLeft size={16} />
              Geri
            </div>

            <div className={styles.detailHeaderContent}>
              <div>
                <h2 className={styles.detailTitle}>{selectedPlaybook.title}</h2>
                <p className={styles.detailSubtitle}>{selectedPlaybook.description}</p>
              </div>
            </div>
          </div>

          <div className={styles.detailContent}>
            <div className={styles.clauseCountBar}>
              <span className={styles.clauseCount}>{selectedPlaybook.clauses.length} madde</span>
            </div>

            <div className={styles.clauseList}>
              {selectedPlaybook.clauses.map((clause, idx) => (
                <div key={idx} className={styles.clauseCard}>
                  <h3 className={styles.clauseTitle}>{clause.title}</h3>
                  <ul className={styles.issueList}>
                    {clause.issues.map((issue, i) => (
                      <li key={i} className={styles.issueItem}>
                        <span className={styles.issueBullet}>•</span>
                        <span className={styles.issueText}>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
