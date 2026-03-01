import { ChevronUp } from "lucide-react";
import type { ComponentType } from "react";
import styles from "./ControlButton.module.css";

interface Props {
  icon: ComponentType<{ size?: number }>;
  label: string;
  title?: string;
  chevronTitle?: string;
  variant?: "default" | "negative";
  showChevron?: boolean;
  isActive?: boolean;
  onToggle?: () => void;
  onChevronClick?: () => void;
  chevronOpen?: boolean;
  onClick?: () => void;
}

export function ControlButton({
  icon: Icon,
  label,
  title,
  chevronTitle,
  variant = "default",
  showChevron = false,
  isActive = true,
  onToggle,
  onChevronClick,
  chevronOpen = false,
  onClick,
}: Props) {
  if (showChevron) {
    return (
      <div role="group" aria-label={label} className={styles.group}>
        <button
          type="button"
          className={styles.groupMain}
          aria-label={label}
          aria-pressed={!isActive}
          data-tooltip={title}
          onClick={onToggle}
        >
          <span
            className={[styles.iconWrapper, !isActive ? styles.inactive : ""]
              .filter(Boolean)
              .join(" ")}
          >
            <Icon size={24} />
          </span>
        </button>
        <button
          type="button"
          className={styles.groupChevron}
          aria-label={`${label} — device settings`}
          aria-expanded={chevronOpen}
          data-tooltip={chevronTitle}
          onClick={onChevronClick}
        >
          <ChevronUp size={16} />
        </button>
      </div>
    );
  }

  const variantClass = variant === "negative" ? styles["button--negative"] : "";

  return (
    <button
      type="button"
      className={[styles.button, styles["button--square"], variantClass]
        .filter(Boolean)
        .join(" ")}
      aria-label={label}
      data-tooltip={title}
      onClick={onClick}
    >
      <Icon size={24} />
    </button>
  );
}
