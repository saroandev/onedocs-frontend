import { Button, Tabs, TabsList, TabsTrigger } from "@/shared/ui";
import { Clock, Plus, X } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import styles from "../styles/time-track-tab.module.scss";
import { useAppNavigation } from "@/shared/lib/navigation";
import { DateNavigator } from "./date-navigator";

export const TimetrackTab = (props: TimetrackTabProps) => {
  const { setChoosenTab } = props;
  const [timeTrackingTab, setTimeTrackingTab] = useState("calendar");
  const [hasTimeEntry, setHasTimeEntry] = useState(false);
  const { goTo } = useAppNavigation();

  const handleTimeEntry = () => {
    setChoosenTab(uuidv4());
    goTo("/");
  };

  const timeSlots = [
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

  const activities = [
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>İş ve Zaman Takibi</h2>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className={styles.closeButton}
          onClick={() => setChoosenTab(uuidv4())}
        >
          <X className={styles.icon} />
        </Button>
      </div>

      <div className={styles.dateSection}>
        <DateNavigator />
      </div>

      <div className={styles.tabsSection}>
        <Tabs
          value={timeTrackingTab}
          onValueChange={(v) => setTimeTrackingTab(v)}
          className={styles.tabs}
        >
          <TabsList className={styles.tabsList}>
            <TabsTrigger value="calendar">Takvim</TabsTrigger>
            <TabsTrigger value="activities">Aktiviteler</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className={styles.content}>
        {timeTrackingTab === "calendar" && (
          <div className={styles.calendarView}>
            <div className={styles.timeSlots}>
              {timeSlots.map((slot, idx) => (
                <div key={idx} className={styles.timeSlot}>
                  <div className={styles.timeLabel}>{slot.hour}</div>
                  <div className={styles.eventContainer}>
                    {slot.events.length > 0 && (
                      <div className={styles.events}>
                        {slot.events.map((event, eventIdx) => (
                          <div
                            key={eventIdx}
                            className={classNames(styles.event, styles[`event${event.color}`])}
                          >
                            <p className={styles.eventTitle}>{event.title}</p>
                            <p className={styles.eventDuration}>{event.duration}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {timeTrackingTab === "activities" && (
          <div className={styles.activitiesView}>
            <div className={styles.activitiesList}>
              {activities.map((activity, idx) => (
                <div key={idx} className={styles.activityCard}>
                  <div className={styles.activityContent}>
                    <div
                      className={classNames(styles.activityIcon, styles[`icon${activity.color}`])}
                    >
                      {activity.icon}
                    </div>
                    <div className={styles.activityDetails}>
                      <div className={styles.activityHeader}>
                        <span className={styles.activityApp}>{activity.app}</span>
                        <span className={styles.separator}>•</span>
                        <span className={styles.activityType}>{activity.activity}</span>
                      </div>
                      <h3 className={styles.activityName}>{activity.activity}</h3>
                      <p className={styles.activitySubject}>{activity.subject}</p>
                      <div className={styles.activityFooter}>
                        <span className={styles.activityTime}>{activity.time}</span>
                        <span className={styles.separator}>•</span>
                        <span className={styles.activityDuration}>{activity.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        {!hasTimeEntry ? (
          <div className={styles.noEntryContainer}>
            <div className={styles.warningBox}>
              <div className={styles.pulse}>
                <div className={styles.pulseIndicator}></div>
              </div>
              <p className={styles.warningText}>Bugün için henüz zaman girişi yapmadınız</p>
            </div>
            <Button className={styles.addButton} onClick={handleTimeEntry}>
              <Plus className={styles.buttonIcon} />
              Zaman Girişi Yap
            </Button>
          </div>
        ) : (
          <Button
            className={styles.viewButton}
            variant="outline"
            onClick={() => setHasTimeEntry(false)}
          >
            <Clock className={styles.buttonIcon} />
            Zaman Girişi Raporunu Görüntüle
          </Button>
        )}
      </div>
    </div>
  );
};

interface TimetrackTabProps {
  setChoosenTab: (val: string) => void;
}
