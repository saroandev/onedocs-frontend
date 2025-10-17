import { Icon404, Icon500, IconMaintenance, IconSuccess2 } from "../icons";
import { BANNER_TYPE, type BannerType } from "./banner-config";
import styles from "./banner.module.scss";
import { useAppNavigation } from "@/shared/lib/navigation";
import { Button } from "../button/button";
import { GridShape } from "../grid-shape/grid-shape";

export const Banner = (props: Props) => {
  const {
    type,
    title = "ERROR",
    message = "We can’t seem to find the page you are looking for!",
    buttonLabel = "Back to Home Page",
    directURL = "/",
  } = props;
  const { goTo } = useAppNavigation();

  const bannerTypes = {
    [BANNER_TYPE.INTERNAL_SERVER]: <Icon500 />,
    [BANNER_TYPE.NOT_FOUND]: <Icon404 />,
    [BANNER_TYPE.SUCCESS]: <IconSuccess2 />,
    [BANNER_TYPE.MAINTENANCE]: <IconMaintenance />,
  };

  return (
    <div className={styles.container}>
      <GridShape />
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {bannerTypes[type]}
        <p className={styles.message}>{message}</p>
        <Button
          className={styles.button}
          label={buttonLabel}
          buttonType="justText"
          onClick={() => goTo(directURL)}
          variant="secondary"
        />
      </div>
      <p className={styles.footer}>&copy; {new Date().getFullYear()} - OneDocs</p>
    </div>
  );
};

interface Props {
  type: BannerType;
  title?: string;
  message?: string;
  buttonLabel?: string;
  directURL?: string;
}
