import React from "react";
import { CloseOutlined, ExclamationCircleFilled } from "@ant-design/icons";

import styles from "./index.module.css";

type TProps = {
  message: string;
  onClose: () => void;
};

export const ErrorAlert = (props: TProps) => {
  const { message, onClose } = props;
  return (
    <div data-testid="signup-error-alert" className={styles.errorAlert}>
      <div className={styles.content}>
        <ExclamationCircleFilled style={{ color: "#e54322" }} />
        <div className={styles.message}>{message}</div>
      </div>
      <div className={styles.closeIcon} onClick={onClose}>
        <CloseOutlined style={{ color: "#6C6F80" }} />
      </div>
    </div>
  );
};
