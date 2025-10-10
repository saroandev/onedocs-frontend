export const playbooks = [
  {
    id: "pb1",
    title: "SaaS Sözleşmesi (Alıcı Olarak)",
    titleEn: "SaaS Agreement (as Buyer)",
    description:
      "Bu playbook, yazılım hizmet (SaaS) sözleşmelerini alıcı/müşteri perspektifinden değerlendirmek için kullanılır. Hukuk uzmanlarının servis seviyeleri, veri hakları, gizlilik, güvenlik, fikri mülkiyet, sorumluluk ve çıkış stratejileri gibi SaaS sözleşmelerine özgü temel riskleri belirlemelerine, anlamalarına ve azaltmalarına yardımcı olmak üzere tasarlanmıştır.",
    defaultPlaybook: true,
    clauses: [
      {
        title: "Süre & Fesih",
        issues: [
          "Sözleşme, yazılı kabul olmaksızın veya bir yıldan uzun yenileme süreleri ile otomatik yenileme ('evergreen') hükümleri içeriyorsa, bu yüksek risktir; yazılı bildirim ve alıcının açık onayı gereklidir.",
          "Alıcı makul bir bildirimle (örn. 30-60 gün) dilediği zaman fesih hakkına sahip değilse, bu yüksek risktir; makul, belgelenmiş, geri alınamayan maliyetlerle (kayıp kârlar değil) sınırlı herhangi bir fesih ücreti ile dilediği zaman feshetme hakkı gereklidir.",
          "Tekrarlanan hizmet arızaları, önemli ihlal veya iflas için nedenle fesih mevcut değilse, bu yüksek risktir; bunların derhal fesih gerekçeleri olarak dahil edildiğinden emin olun.",
        ],
      },
      {
        title: "Hizmet Seviyeleri (SLA)",
        issues: [
          "Sözleşme, ölçülebilir hizmet seviyesi taahhütleri (çalışma süresi, performans metrikleri) içermiyorsa veya bunlar sektör standartlarının altındaysa (örn. %99 çalışma süresi), bu yüksek risktir.",
          "SLA ihlalleri için yeterli çözüm yolları (servis kredileri, fesih hakları) yoksa, bu yüksek risktir; önemli kesintiler için anlamlı tazminat ve fesih hakları gereklidir.",
        ],
      },
    ],
  },
  {
    id: "pb2",
    title: "Ticari Gizlilik Sözleşmesi (Alıcı Olarak)",
    titleEn: "Commercial NDA (as Receiver)",
    description:
      "Bu playbook, ticari gizlilik sözleşmelerini (NDA) bilgi alan taraf perspektifinden incelemek için kullanılır. Gizli bilgilerin kapsamı, kullanım kısıtlamaları, ifşa yükümlülükleri ve süre konularında dengeli koşullar sağlamayı hedefler.",
    defaultPlaybook: true,
    clauses: [
      {
        title: "Gizli Bilgi Tanımı",
        issues: [
          "Gizli bilgi tanımı aşırı geniş veya belirsizse (örn. 'tüm bilgiler' veya işaretleme gerekliliği olmadan), bu yüksek risktir; açık sınırlamalar ve işaretleme/tanımlama gereksinimi ekleyin.",
          "Halihazırda bilinen, bağımsız geliştirilen veya yasal olarak üçüncü taraflardan alınan bilgiler için standart istisnalar yoksa, bu yüksek risktir.",
        ],
      },
      {
        title: "Kullanım Kısıtlamaları",
        issues: [
          "İzin verilen kullanım, belirlenen iş amacıyla sınırlı değilse, bu orta risktir; kullanımın yalnızca belirtilen değerlendirme/işlem amacıyla sınırlandırıldığından emin olun.",
          "Yasal olarak zorunlu ifşalar için istisna yoksa (mahkeme kararı, düzenleyici talep), bu yüksek risktir; makul bildirim yükümlülüğüyle birlikte zorunlu ifşa istisnası ekleyin.",
        ],
      },
    ],
  },
  {
    id: "pb3",
    title: "Birleşme & Devralma GİS (Alıcı Olarak)",
    titleEn: "M&A NDA (as Acquirer)",
    description:
      "Bu playbook, birleşme ve devralma (M&A) süreçlerinde kullanılan gizlilik sözleşmelerini devralan taraf bakış açısından değerlendirmek içindir. Due diligence sürecindeki bilgi koruması, rekabet yasağı hükümleri ve standstill (dondurma) anlaşmalarına odaklanır.",
    defaultPlaybook: true,
    clauses: [
      {
        title: "Due Diligence & Bilgi Erişimi",
        issues: [
          "Alıcının due diligence için makul erişim hakkı kısıtlanmışsa veya hedef şirket tek taraflı olarak bilgi vermeyi reddedebiliyorsa, bu yüksek risktir.",
          "Finansal, yasal, operasyonel bilgilere tam erişim ve uzman danışman kullanımı açıkça izin verilmelidir.",
        ],
      },
      {
        title: "Standstill (Dondurma) Hükümleri",
        issues: [
          "Standstill süresi aşırı uzunsa (örn. 2 yıldan fazla) veya hedef şirket başkalarıyla görüşme başlatırsa bile devam ediyorsa, bu yüksek risktir.",
          "Alıcının davet üzerine teklif verebilmesi ve otomatik feragat (fiduciary out) mekanizması olmalıdır.",
        ],
      },
    ],
  },
  {
    id: "pb4",
    title: "Tedarikçi/Satıcı Sözleşmesi (Alıcı Olarak)",
    titleEn: "Vendor/Supplier (as Buyer)",
    description:
      "Bu playbook, mal veya hizmet tedarik sözleşmelerini alıcı şirket açısından incelemek için kullanılır. Teslimat, kalite standartları, garanti, sorumluluk sınırlamaları ve ödeme koşulları gibi ticari risklere odaklanır.",
    defaultPlaybook: true,
    clauses: [
      {
        title: "Teslimat & Performans",
        issues: [
          "Teslimat süreleri ve cezai şartlar netleştirilmemişse veya tedarikçi gecikmelerden sorumlu tutulmuyorsa, bu orta-yüksek risktir.",
          "Kalite standartları ve kabul kriterleri belgelenmeli, alıcıya reddetme ve iade hakkı tanınmalıdır.",
        ],
      },
      {
        title: "Garanti & Sorumluluk",
        issues: [
          "Tedarikçi, ürün/hizmetin amaca uygun olacağına dair garanti vermiyorsa veya tüm garantileri feragat ediyorsa, bu yüksek risktir.",
          "Sorumluluk sınırlamaları, alıcının zararlarını kapsamayacak kadar düşükse (örn. sözleşme bedelinin %10'u), bu yüksek risktir; en az sözleşme bedelinin 1-2 katı sorumluluk sınırı talep edin.",
        ],
      },
    ],
  },
  {
    id: "pb5",
    title: "İş Sözleşmesi (İşveren Olarak)",
    titleEn: "Employment Agreement (as Employer)",
    description:
      "Bu playbook, iş sözleşmelerini işveren tarafı açısından hazırlamak ve gözden geçirmek için kullanılır. Rekabet yasağı, fikri mülkiyet devri, gizlilik ve fesih koşulları gibi işveren haklarının korunmasına odaklanır.",
    defaultPlaybook: true,
    clauses: [
      {
        title: "Rekabet Yasağı & Müşteri Yasağı",
        issues: [
          "Rekabet yasağı coğrafi ve süre açısından mantıksızsa (örn. tüm dünya, 5 yıl), mahkeme tarafından uygulanamaz bulunabilir; makul kapsam (1-2 yıl, ilgili pazar) belirleyin.",
          "Çalışanın iş sonrası geçim hakkını tamamen ortadan kaldıran kısıtlamalar, hukuka aykırı olabilir; dengeli ve ölçülü olmalıdır.",
        ],
      },
      {
        title: "Fikri Mülkiyet Devri",
        issues: [
          "Çalışan tarafından iş kapsamında yaratılan tüm fikri mülkiyetin otomatik olarak işverene devredilmediği durumlarda, bu yüksek risktir.",
          "İş süresi ve sonrasında yaratılan işlerle ilgili açık atama (assignment) hükmü ve çalışanın feragat beyanı eklenmelidir.",
        ],
      },
    ],
  },
];
