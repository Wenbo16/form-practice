import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useAtom } from "jotai";
import { formDataAtom } from "../store";
import { CreateUser } from "./CreateUser";
import { ErrorAlert } from "./ErrorAlert";
import { MaskedLoader } from "./MaskedLoader";
import { ToggleTradeCode } from "./ToggleTradeCode";
import { TradeCodeErrorHint } from "./TradeCodeErrorHint";
import { TradeCodeInput } from "./TradeCodeInput";

import styles from "./index.module.css";

const defaultBtnStyle: React.CSSProperties = {
  display: "inline-block",
  margin: "45px 40px 0",
  border: "none",
  width: "88px",
  height: "36px",
  fontWeight: 600,
  cursor: "pointer",
  backgroundColor: "#a3c644",
  color: "#ffffff"
};

type TProps = {
  handleSubmit: () => void;
  handleBack: () => void;
};

const Step3 = (props: TProps) => {
  const { handleSubmit, handleBack } = props;

  const [formData] = useAtom(formDataAtom);

  const [showCode, setShowCode] = useState(false);
  const [tradePas, setTradePas] = useState("");
  const [tradeConfirm, setTradeConfirm] = useState("");
  const [hint, setHint] = useState<TTradeCodeHint>("");
  const [showHint, setShowHint] = useState(false);
  const [loading, setLoading] = useState(false);

  const [alertMsg, setAlertMsg] = useState("");

  const validate = (pass: string, confirm: string) => {
    setHint("");
    setShowHint(false);
    if (!/^\d*$/.test(pass) || !/^\d*$/.test(confirm)) {
      setHint("NaN");
      setShowHint(true);
    } else if (pass.length < 6) {
      setHint("invalidPas");
    } else if (pass.indexOf(confirm) !== 0) {
      setHint("noMatch");
      setShowHint(true);
    }
  };

  useEffect(() => validate(tradePas, tradeConfirm), [tradePas, tradeConfirm]);

  



  const onSubmit = (skip: boolean) => {
    if (!skip) {
      if (tradePas.length + tradeConfirm.length < 1) {
        setHint("emptyInput");
        setShowHint(true);
        return;
      } else if (tradePas !== tradeConfirm) {
        setHint("noMatch");
        setShowHint(true);
        return;
      }
    }
    setLoading(true);
  };

  return (
    <div className={styles.container}>
      {loading && <MaskedLoader />}
      <div data-testid="signup-step3-desc" className={styles.desc}>
        {"Please create your trade password with "}
        <b>{"6 numbers"}</b>
        {". Fields marked without an asterisk * are "}
        <b>{"optional"}</b>
        {". "}
        <button
          className={styles.skipButton}
          data-testid="signup-step3-skip"
          onClick={() => onSubmit(true)}
        >
          {"Skip->"}
        </button>
        {" to next step."}
      </div>
      <div data-testid="singup-trade-code-input">
        <div
          className={styles.label}
          data-testid="singup-trade-code-input-label"
        >
          {"Trade Password"}
          <ToggleTradeCode
            showCode={showCode}
            toggle={() => setShowCode((prev) => !prev)}
          />
        </div>
        <TradeCodeInput
          showCode={showCode}
          initVal={tradePas}
          onChange={(value) => {
            setTradePas(value);
          }}
        />
      </div>
      <div data-testid="singup-trade-code-confirm">
        <div
          className={styles.label}
          data-testid="singup-trade-code-confirm-label"
        >
          {"Confrim Trade Password"}
        </div>
        <TradeCodeInput
          onClick={() => setShowHint(true)}
          showCode={showCode}
          initVal={tradeConfirm}
          onChange={(value) => {
            setTradeConfirm(value);
          }}
        />
      </div>
      {showHint && <TradeCodeErrorHint hintType={hint} />}
      <div className={styles.buttonWrapper}>
        <Button
          data-testid="signup-step3-submit"
          style={defaultBtnStyle}
          onClick={() => onSubmit(false)}
        >
          {"Submit"}
        </Button>
        <Button
          data-testid="signup-step3-back"
          onClick={() => handleBack()}
          style={{
            ...defaultBtnStyle,
            border: "1px solid #DFE1E9",
            backgroundColor: "#FFFFFF",
            color: "#686767"
          }}
        >
          {"Back"}
        </Button>
        <CreateUser
          formData={formData}
          tradePas={tradePas}
          onError={() =>
            setAlertMsg(`Submission failed, click "Submit" and try again!`)
          }
          onSucc={() => handleSubmit()}
        />
      </div>
      {alertMsg && (
        <ErrorAlert message={alertMsg} onClose={() => setAlertMsg("")} />
      )}
    </div>
  );
};
export default Step3;
