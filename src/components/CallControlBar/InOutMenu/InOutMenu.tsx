import { Mic, Video } from "lucide-react";
import styles from "./InOutMenu.module.css";

interface Props {
  type: "camera" | "mic";
}

const DEVICES = {
  camera: { label: "Built-in Camera", Icon: Video },
  mic: { label: "Built-in Microphone", Icon: Mic },
};

export function InputAndOutputMenu({ type }: Props) {
  const { label, Icon } = DEVICES[type];

  return (
    <div className={styles.inOutMenu} role="menu">
      <div className={styles.device} role="menuitem">
        <Icon size={16} />
        <span>{label}</span>
      </div>
    </div>
  );
}
