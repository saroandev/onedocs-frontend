export const optionsSource = [
  {
    id: "turk-hukuk-mevzuat",
    name: "Türk Hukuku Mevzuatları",
  },
  {
    id: "reklam-kurum-karar",
    name: "Reklam Kurulu Kararları",
  },
  {
    id: "rekabet-kurum-karar",
    name: "Rekabet Kurumu Kararları",
  },
];

export const DOCUMENT_TEMPLATES = [
  {
    id: "is-sozlesmesi",
    title: "İş Sözleşmesi Şablonu",
    description:
      "Standart iş sözleşmesi için çalışan bilgileri, pozisyon, maaş ve iş koşullarını içerir.",
    category: "Sözleşmeler",
  },
  {
    id: "gizlilik-sozlesmesi",
    title: "Gizlilik Sözleşmesi (NDA)",
    description:
      "Taraflar arası gizlilik taahhüdü için şablon. Gizli bilgi kapsamı, yükümlülükler ve süre bilgilerini içerir.",
    category: "Sözleşmeler",
  },
  {
    id: "hizmet-sozlesmesi",
    title: "Hizmet Sözleşmesi",
    description:
      "Hizmet sağlayıcı ile müşteri arasında kapsam, süre, ücret ve ödeme koşullarını belirler.",
    category: "Sözleşmeler",
  },
  {
    id: "kira-sozlesmesi",
    title: "Kira Sözleşmesi",
    description:
      "Konut veya işyeri kiralaması için kiracı-malik bilgileri, kira bedeli, süre ve depozito şartlarını içerir.",
    category: "Sözleşmeler",
  },
  {
    id: "satis-sozlesmesi",
    title: "Satış Sözleşmesi",
    description:
      "Mal veya hizmet satışı için alıcı-satıcı, bedel, teslimat ve ödeme şartlarını düzenler.",
    category: "Sözleşmeler",
  },
  {
    id: "ihtarname",
    title: "İhtarname",
    description:
      "Karşı tarafa resmi uyarı ve talep bildirimi. Edimin ifası, süre ve yasal sonuçları içerir.",
    category: "Bildirimler",
  },
  {
    id: "vekaletname",
    title: "Vekâletname",
    description:
      "Belirli işlemler için yetki devri belgesi. Vekil bilgileri, yetki kapsamı ve geçerlilik süresi.",
    category: "Yetkilendirme",
  },
  {
    id: "muvafakatname",
    title: "Muvafakatname",
    description:
      "Belirli bir işlem veya eylem için açık rıza beyanı. Kişi bilgileri ve muvafakat konusunu içerir.",
    category: "Beyanlar",
  },
  {
    id: "toplanti-tutanagi",
    title: "Toplantı Tutanağı",
    description:
      "Resmi toplantı özeti için şablon. Katılımcılar, gündem, alınan kararlar ve aksiyon maddeleri.",
    category: "Tutanaklar",
  },
];

export const playbooks = [
  {
    id: "pb1",
    title: "SaaS Sözleşmesi (Alıcı Olarak)",
    titleEn: "SaaS Agreement (as Buyer)",
    description:
      "Bu playbook, yazılım hizmet (SaaS) sözleşmelerini alıcı/müşteri perspektifinden değerlendirmek için kullanılır.",
  },
  {
    id: "pb2",
    title: "Ticari Gizlilik Sözleşmesi (Alıcı Olarak)",
    titleEn: "Commercial NDA (as Receiver)",
    description:
      "Bu playbook, ticari gizlilik sözleşmelerini (NDA) bilgi alan taraf perspektifinden incelemek için kullanılır.",
  },
  {
    id: "pb3",
    title: "Birleşme & Devralma GİS (Alıcı Olarak)",
    titleEn: "M&A NDA (as Acquirer)",
    description:
      "Bu playbook, birleşme ve devralma (M&A) süreçlerinde kullanılan gizlilik sözleşmelerini devralan taraf bakış açısından değerlendirmek içindir.",
  },
  {
    id: "pb4",
    title: "Tedarikçi/Satıcı Sözleşmesi (Alıcı Olarak)",
    titleEn: "Vendor/Supplier (as Buyer)",
    description:
      "Bu playbook, mal veya hizmet tedarik sözleşmelerini alıcı şirket açısından incelemek için kullanılır.",
  },
  {
    id: "pb5",
    title: "İş Sözleşmesi (İşveren Olarak)",
    titleEn: "Employment Agreement (as Employer)",
    description:
      "Bu playbook, iş sözleşmelerini işveren tarafı açısından hazırlamak ve gözden geçirmek için kullanılır.",
  },
];
