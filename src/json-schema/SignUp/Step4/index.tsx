import React from "react";
import { Button } from "antd";

import styles from "./index.module.css";

const Step4: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.flex}>
       
      </div>
      <div data-testid="completed-message" className={styles.flexMessage}>
        You have completed your registration.
      </div>
      <div>
        <Button
          data-testid="login-btn"
          htmlType="submit"
          className={styles.flexButton}
          onClick={() => {}}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Step4;
