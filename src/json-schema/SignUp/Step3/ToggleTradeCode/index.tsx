import React from 'react';
// import inVisibleIcon from "../../../../assets/images/icon-invisible.png"
// import visibleIcon from "../../../../assets/images/icon-visible.png";

import styles from "./index.module.css";

type TProps = {
  showCode?: boolean;
  toggle: () => void;
};

export const ToggleTradeCode = (props: TProps) => {
  const { showCode, toggle } = props;
  return (
    <button
      className={styles.toggleCode}
      data-testid="signup-toggle-trade-code"
      onClick={toggle}
    >
      {/* {showCode ? (
        <img src={visibleIcon} height={12} width={18} alt="" />
      ) : (
        <img src={inVisibleIcon} height={12} width={18} alt="" />
      )} */}
    </button>
  );
};
