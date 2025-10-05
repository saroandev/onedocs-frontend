import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import classNames from "classnames";
import styles from "./tabs.module.scss";

interface TabsProps extends React.ComponentProps<typeof TabsPrimitive.Root> {
  className?: string;
}

export const Tabs = ({ className, ...props }: TabsProps) => {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={classNames(styles.tabs, className)}
      {...props}
    />
  );
};

interface TabsListProps extends React.ComponentProps<typeof TabsPrimitive.List> {
  className?: string;
}

export const TabsList = ({ className, ...props }: TabsListProps) => {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={classNames(styles.tabsList, className)}
      {...props}
    />
  );
};

interface TabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  className?: string;
}

export const TabsTrigger = ({ className, ...props }: TabsTriggerProps) => {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={classNames(styles.tabsTrigger, className)}
      {...props}
    />
  );
};

interface TabsContentProps extends React.ComponentProps<typeof TabsPrimitive.Content> {
  className?: string;
}

export const TabsContent = ({ className, ...props }: TabsContentProps) => {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={classNames(styles.tabsContent, className)}
      {...props}
    />
  );
};
