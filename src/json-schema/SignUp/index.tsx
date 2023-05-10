import React, { useState } from "react";
// @ts-ignore
import StepBar from "./StepBar/index.tsx";
// @ts-ignore

import Step1 from "./Step1/index.tsx";
// @ts-ignore

import Step2 from "./Step2/index.tsx";
// @ts-ignore

import Step3 from "./Step3/index.tsx";
// @ts-ignore

import Step4 from "./Step4/index.tsx";

import styles from "./index.module.css";

type stepMappingType = {
  step: number;
  component: React.ReactNode;
};

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);

  const stepMapping = [
    { step: 1, component: <Step1 handleSubmit={() => setCurrentStep(2)} /> },
    {
      step: 2,
      component: <Step2 handleSubmit={(step: any) => setCurrentStep(step)} />
    },
    {
      step: 3,
      component: (
        <Step3
          handleSubmit={() => setCurrentStep(4)}
          handleBack={() => setCurrentStep(2)}
        />
      )
    },
    { step: 4, component: <Step4 /> }
  ] as const;
  const currentComponent = stepMapping.find(
    (item: stepMappingType) => item.step === currentStep
  )!.component;

  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>
        <StepBar current={currentStep - 1} />
      </div>
      <div className={styles.content}>{currentComponent}</div>
    </div>
  );
}
