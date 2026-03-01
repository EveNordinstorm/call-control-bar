import { useState } from "react";
import { motion } from "motion/react";
import { Mic, Video, Menu } from "lucide-react";
import { ControlButton } from "./ControlButton/ControlButton";
import { InputAndOutputMenu } from "./InOutMenu/InOutMenu";
import { SettingsMenu } from "./SettingsMenu/SettingsMenu";
import styles from "./CallControlBar.module.css";

type OpenMenu = "camera" | "mic" | "settings" | null;

function HangUpIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M16.835 11.2585C15.3138 10.7585 13.6884 10.488 11.9999 10.488C10.3114 10.488 8.6861 10.7585 7.1649 11.2585L7.1649 13.3226C7.1649 13.7805 6.85386 14.1799 6.40989 14.2921L3.57486 15.0085C2.9431 15.1681 2.32987 14.6906 2.32987 14.0389V10.361C2.32987 9.64702 2.70683 8.97984 3.34508 8.65992C4.55173 8.05508 5.83045 7.57277 7.1649 7.2293C8.71028 6.83155 10.3304 6.62 11.9999 6.62C13.6695 6.62 15.2896 6.83155 16.835 7.22931C18.1694 7.57277 19.4481 8.05508 20.6548 8.65992C21.293 8.97984 21.67 9.64702 21.67 10.361L21.67 14.0389C21.67 14.6906 21.0568 15.1681 20.425 15.0085L17.59 14.2921C17.146 14.1799 16.835 13.7805 16.835 13.3226L16.835 11.2585Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CallControlBar() {
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isMicActive, setIsMicActive] = useState(true);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [hangingUp, setHangingUp] = useState(false);

  const toggle = (menu: NonNullable<OpenMenu>) =>
    setOpenMenu((current) => (current === menu ? null : menu));

  const handleHangUp = () => {
    if (hangingUp) return;
    setOpenMenu(null);
    setHangingUp(true);
    setTimeout(() => setHangingUp(false), 1100);
  };

  const buttonTransition = (delay: number) =>
    hangingUp
      ? { duration: 0.25, delay, ease: "easeIn" as const }
      : { duration: 0 };

  return (
    <div className={styles.wrapper}>
      {!hangingUp && openMenu === "camera" && (
        <InputAndOutputMenu type="camera" />
      )}
      {!hangingUp && openMenu === "mic" && <InputAndOutputMenu type="mic" />}
      {!hangingUp && openMenu === "settings" && <SettingsMenu />}

      <div className={styles.bar}>
        <motion.div
          initial={false}
          animate={hangingUp ? { x: 120, opacity: 0 } : { x: 0, opacity: 1 }}
          transition={buttonTransition(0)}
        >
          <ControlButton
            icon={Video}
            label="Toggle camera"
            title={isCameraActive ? "Camera on" : "Camera off"}
            chevronTitle="Camera options"
            showChevron
            isActive={isCameraActive}
            onToggle={() => setIsCameraActive((o) => !o)}
            onChevronClick={() => toggle("camera")}
            chevronOpen={openMenu === "camera"}
          />
        </motion.div>

        <motion.div
          initial={false}
          animate={hangingUp ? { x: 120, opacity: 0 } : { x: 0, opacity: 1 }}
          transition={buttonTransition(0.07)}
        >
          <ControlButton
            icon={Mic}
            label="Toggle microphone"
            title={isMicActive ? "Mute mic" : "Unmute mic"}
            chevronTitle="Mic options"
            showChevron
            isActive={isMicActive}
            onToggle={() => setIsMicActive((o) => !o)}
            onChevronClick={() => toggle("mic")}
            chevronOpen={openMenu === "mic"}
          />
        </motion.div>

        <motion.div
          initial={false}
          animate={hangingUp ? { x: 120, opacity: 0 } : { x: 0, opacity: 1 }}
          transition={buttonTransition(0.14)}
        >
          <ControlButton
            icon={Menu}
            label="Open settings"
            title="Settings menu"
            onClick={() => toggle("settings")}
          />
        </motion.div>

        <div className={styles.hangUpWrapper}>
          <ControlButton
            icon={HangUpIcon}
            label="Leave call"
            title="End call"
            variant="negative"
            iconRotate={hangingUp ? 0 : -45}
            onClick={handleHangUp}
          />
        </div>
      </div>
    </div>
  );
}
