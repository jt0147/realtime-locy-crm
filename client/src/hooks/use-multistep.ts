import { ReactElement, useCallback, useState } from "react";

type TUseMultiStepProps = {
    steps: ReactElement[];
};

export const useMultistep = ({ steps }: TUseMultiStepProps) => {
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

    const next = useCallback(() => {
        setCurrentStepIndex((prevIndex) => {
            if (prevIndex >= steps.length - 1) return prevIndex;
            return prevIndex + 1;
        });
    }, [steps]);

    const back = useCallback(() => {
        setCurrentStepIndex((prevIndex) => {
            if (prevIndex <= 0) return prevIndex;
            return prevIndex - 1;
        });
    }, []);

    const goTo = useCallback((index: number) => {
        setCurrentStepIndex(index);
    }, []);

    return {
        // Step
        stepIndex: currentStepIndex,
        stepTotal: steps.length,
        step: steps[currentStepIndex],
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,

        // Function
        goTo,
        next,
        back,
    };
};
