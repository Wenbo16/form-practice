import React from "react";
import PinInput from "react-pin-input";

import styles from "./index.module.css";

type TProps = {
  showCode?: boolean;
  initVal: string;
  onChange: (value: string, index: number) => void;
  onClick?: () => void;
};

export const TradeCodeInput = (props: TProps) => {
  const { showCode = false, initVal, onChange, onClick } = props;

  return (
    <div
      data-testid="trade-code-input"
      onClick={onClick}
      className={styles.tradeCodeInput}
    >
      <PinInput
        key={~~showCode}
        initialValue={initVal}
        length={6}
        secret={!showCode}
        secretDelay={!showCode ? 2000 : 0}
        type="custom"
        onChange={onChange}
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "450px"
        }}
        inputStyle={{
          width: "60px",
          height: "70px",
          lineHeight: "70px",
          fontSize: "36px",
          borderWidth: "0 0 1px 0",
          borderColor: "#CBD0DB",
          background: "_"
        }}
        inputFocusStyle={{
          borderWidth: "0 0 1px 0",
          borderColor: "#2098D4"
        }}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
    </div>
  );
};
