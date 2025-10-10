export const activities = [
  {
    app: "Word",
    icon: "📝",
    activity: "Belge Hazırlık",
    subject: "Dava Dosyası Hazırlık",
    time: "09:00 - 11:30",
    duration: "2.5 saat",
    color: "blue",
  },
  {
    app: "Zoom",
    icon: "🎥",
    activity: "Toplantı",
    subject: "Müvekkil Toplantısı",
    time: "10:00 - 11:00",
    duration: "1 saat",
    color: "indigo",
  },
  {
    app: "Chrome",
    icon: "🌐",
    activity: "Web Tarama",
    subject: "Araştırma ve E-posta",
    time: "11:00 - 12:45",
    duration: "1.75 saat",
    color: "green",
  },
  {
    app: "Outlook",
    icon: "📧",
    activity: "E-posta",
    subject: "Müvekkil Yazışmaları",
    time: "13:00 - 13:30",
    duration: "30dk",
    color: "purple",
  },
  {
    app: "Teams",
    icon: "💬",
    activity: "Toplantı",
    subject: "Ekip Toplantısı",
    time: "17:00 - 17:45",
    duration: "45dk",
    color: "pink",
  },
];

export const timeSlots = [
  { hour: "08:00", events: [] },
  {
    hour: "09:00",
    events: [{ title: "Dava Dosyası Hazırlık", duration: "2.5 saat", color: "blue" }],
  },
  {
    hour: "10:00",
    events: [{ title: "Müvekkil Toplantısı", duration: "1 saat", color: "indigo" }],
  },
  {
    hour: "11:00",
    events: [{ title: "Araştırma ve E-posta", duration: "1.75 saat", color: "green" }],
  },
  { hour: "12:00", events: [] },
  { hour: "13:00", events: [] },
  {
    hour: "14:00",
    events: [{ title: "Duruşma", duration: "2 saat", color: "amber" }],
  },
  { hour: "15:00", events: [] },
  {
    hour: "16:00",
    events: [{ title: "Danışmanlık Görüşmesi", duration: "1 saat", color: "teal" }],
  },
  {
    hour: "17:00",
    events: [{ title: "Ekip Toplantısı", duration: "45dk", color: "pink" }],
  },
  { hour: "18:00", events: [] },
];
