import { StepProps, Steps } from "antd";

import styles from "./index.module.css";

type TProps = {
  current?: number;
};
const StepBar = (props: TProps) => {
  const { current = 0 } = props;
  const items: StepProps[] = [
    {
      title: (
        <div data-testid="signup-step-title-odd" className="odd_step_title">
          {"Basic Information"}
        </div>
      )
    },
    {
      title: (
        <div data-testid="signup-step-title-even" className="even_step_title">
          {"Bind Bank Account"}
        </div>
      )
    },
    {
      title: (
        <div data-testid="signup-step-title-odd" className="odd_step_title">
          {"Create Trade Password"}
        </div>
      )
    },
    {
      title: (
        <div data-testid="signup-step-title-even" className="even_step_title">
          {"Done"}
        </div>
      )
    }
  ];
  return (
    <div className={styles.steps_root}>
      <Steps
        current={current}
        className={styles.signup_steps}
        data-testid="signup-steps"
        type="navigation"
        direction="horizontal"
        items={items}
      />
    </div>
  );
};

export default StepBar;
