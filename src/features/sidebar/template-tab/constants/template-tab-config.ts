export const templates = [
  {
    id: "t1",
    title: "Hizmet Sözleşmesi Şablonu",
    description:
      "Genel hizmet sözleşmesi şablonu. Hizmet veren ve alan taraflar arasında kullanılabilir.",
    category: "Ticari Sözleşmeler",
    lastUpdated: "Bugün",
    scope: "personal" as "personal" | "org",
    currentVersion: "3.0",
    versions: [
      {
        id: "v3",
        version: "3.0",
        date: "05.10.2024",
        changes: "Son güncellemeler ve KVKK uyumluluğu eklendi",
        isCurrent: true,
      },
      {
        id: "v2",
        version: "2.1",
        date: "28.09.2024",
        changes: "Hata düzeltmeleri ve madde iyileştirmeleri",
      },
      {
        id: "v1",
        version: "2.0",
        date: "15.09.2024",
        changes: "İlk yayınlanan versiyon",
      },
    ],
  },
  {
    id: "t2",
    title: "Gizlilik Sözleşmesi (NDA)",
    description:
      "Ticari gizlilik ve gizlilik anlaşması şablonu. İki taraf arasında bilgi paylaşımı için.",
    category: "Gizlilik",
    lastUpdated: "Dün",
    scope: "personal" as "personal" | "org",
    currentVersion: "2.5",
    versions: [
      {
        id: "v4",
        version: "2.5",
        date: "04.10.2024",
        changes: "Gizlilik süresi güncellemesi",
        isCurrent: true,
      },
      {
        id: "v3",
        version: "2.0",
        date: "20.09.2024",
        changes: "Yasal düzenlemeler eklendi",
      },
      {
        id: "v2",
        version: "1.5",
        date: "10.09.2024",
        changes: "Madde revizyonları",
      },
    ],
  },
  {
    id: "t3",
    title: "İş Sözleşmesi Şablonu",
    description:
      "Belirsiz süreli iş sözleşmesi şablonu. İşveren ve çalışan arasında kullanılabilir.",
    category: "İş Hukuku",
    lastUpdated: "2 gün önce",
    scope: "org" as "personal" | "org",
    currentVersion: "4.2",
    versions: [
      {
        id: "v5",
        version: "4.2",
        date: "03.10.2024",
        changes: "İş Kanunu değişiklikleri uygulandı",
        isCurrent: true,
      },
      {
        id: "v4",
        version: "4.1",
        date: "25.09.2024",
        changes: "Uzaktan çalışma maddeleri eklendi",
      },
      {
        id: "v3",
        version: "4.0",
        date: "15.09.2024",
        changes: "Önemli güncelleme",
      },
    ],
  },
  {
    id: "t4",
    title: "Tedarik Sözleşmesi",
    description: "Mal veya hizmet tedarik sözleşmesi şablonu. Tedarikçi ve alıcı arasında.",
    category: "Ticari Sözleşmeler",
    lastUpdated: "3 gün önce",
    scope: "org" as "personal" | "org",
    currentVersion: "1.8",
    versions: [
      {
        id: "v2",
        version: "1.8",
        date: "02.10.2024",
        changes: "Teslimat koşulları güncellendi",
        isCurrent: true,
      },
      {
        id: "v1",
        version: "1.5",
        date: "18.09.2024",
        changes: "İlk versiyon",
      },
    ],
  },
  {
    id: "t5",
    title: "Danışmanlık Sözleşmesi",
    description: "Profesyonel danışmanlık hizmeti sözleşmesi şablonu.",
    category: "Ticari Sözleşmeler",
    lastUpdated: "1 hafta önce",
    scope: "personal" as "personal" | "org",
    currentVersion: "2.0",
    versions: [
      {
        id: "v3",
        version: "2.0",
        date: "28.09.2024",
        changes: "Tam revizyon yapıldı",
        isCurrent: true,
      },
      {
        id: "v2",
        version: "1.2",
        date: "12.09.2024",
        changes: "Küçük düzeltmeler",
      },
      {
        id: "v1",
        version: "1.0",
        date: "01.09.2024",
        changes: "İlk yayın",
      },
    ],
  },
];
