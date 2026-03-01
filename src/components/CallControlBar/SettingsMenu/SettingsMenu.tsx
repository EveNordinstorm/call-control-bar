import styles from "./SettingsMenu.module.css";
import { Disc, AudioLines, Camera } from "lucide-react";

export function SettingsMenu() {
  return (
    <div className={styles.settingsMenu}>
      <ul className={styles.list}>
        <li>
          <Disc size={16} />
          <div>Record</div>
        </li>
        <li>
          <AudioLines size={16} />
          <div>Audio Settings</div>
        </li>
        <li>
          <Camera size={16} />
          <div>Video Effects</div>
        </li>
      </ul>
    </div>
  );
}
