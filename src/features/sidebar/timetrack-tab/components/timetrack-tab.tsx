import { Button, Tabs, TabsList, TabsTrigger } from "@/shared/ui";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import styles from "../styles/timetrack-tab.module.scss";
import { useAppNavigation } from "@/shared/lib/navigation";
import { DateNavigator } from "./date-navigator";
import { activities, timeSlots } from "../constants/timetrack-tab-config";

export const TimetrackTab = (props: TimetrackTabProps) => {
  const { setChoosenTab } = props;
  const [timeTrackingTab, setTimeTrackingTab] = useState("calendar");
  const [hasTimeEntry, setHasTimeEntry] = useState(false);
  const { goTo } = useAppNavigation();

  const handleTimeEntry = () => {
    setChoosenTab(uuidv4());
    goTo("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>İş ve Zaman Takibi</h2>
        </div>
        <Button
          label=""
          buttonType={"justIcon"}
          onClick={() => setChoosenTab(uuidv4())}
          iconType={{ default: "close" }}
        />
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
                <div className={styles.pulseIndicator} />
              </div>
              <p className={styles.warningText}>Bugün için henüz zaman girişi yapmadınız</p>
            </div>
            <Button
              label="Zaman Girişi Yap"
              onClick={handleTimeEntry}
              buttonType="iconWithText"
              iconType={{ default: "plus" }}
              iconTextReverse
            />
          </div>
        ) : (
          <Button
            label="Zaman Girişi Raporunu Görüntüle"
            onClick={() => setHasTimeEntry(false)}
            buttonType="iconWithText"
            iconType={{ default: "plus" }}
            iconTextReverse
            variant="secondary"
          />
        )}
      </div>
    </div>
  );
};

interface TimetrackTabProps {
  setChoosenTab: (val: string) => void;
}
