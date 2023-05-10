import React from "react";
import styles from "./index.module.css";

type TProps = {
  hintType: TTradeCodeHint;
};

export const TradeCodeErrorHint = (props: TProps) => {
  const { hintType } = props;

  return (
    <div data-testid="signup-step3-hints" className={styles.step3_hint}>
      {hintType === "NaN" && (
        <div>{"Your trade password should be 6 numbers."}</div>
      )}
      {hintType === "invalidPas" && (
        <div>{"You must have 6 numbers as your trade password."}</div>
      )}
      {hintType === "noMatch" && (
        <div>
          {"Your trade password is inconsistent, please check and re-enter."}
        </div>
      )}
      {hintType === "emptyInput" && (
        <div>
          {
            "Please fill in the Trader Password and Confirm Trade Password, or Skip to next step."
          }
        </div>
      )}
    </div>
  );
};
