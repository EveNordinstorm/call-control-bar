import { motion } from "motion/react";
import { Disc, AudioLines, Camera } from "lucide-react";
import styles from "./SettingsMenu.module.css";

const containerVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 30,
    },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

export function SettingsMenu() {
  return (
    <motion.div
      className={styles.settingsMenu}
      style={{ transformOrigin: "bottom" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.ul className={styles.list} variants={listVariants}>
        <motion.li variants={itemVariants}>
          <Disc size={16} />
          <div>Record</div>
        </motion.li>
        <motion.li variants={itemVariants}>
          <AudioLines size={16} />
          <div>Audio Settings</div>
        </motion.li>
        <motion.li variants={itemVariants}>
          <Camera size={16} />
          <div>Video Effects</div>
        </motion.li>
      </motion.ul>
    </motion.div>
  );
}
