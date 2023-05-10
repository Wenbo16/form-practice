import React from "react";
import { Spin } from "antd";

import styles from "./index.module.css";

export const MaskedLoader = () => {
  return (
    <div className={styles.maskedLoader}>
      <Spin size="large" />
    </div>
  );
};
