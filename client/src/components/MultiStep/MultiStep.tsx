import { useMultistep } from "@/hooks";

import { TMultiStep } from "./types";
import { Button } from "@nextui-org/react";
import { FormEvent, useCallback } from "react";

const MultiStep = ({
    as: Component = "div",
    steps,
    title,
    onLastStep,
    loading,
}: TMultiStep) => {
    const {
        stepIndex,
        stepTotal,
        step,
        isFirstStep,
        isLastStep,
        back,
        next,
        goTo,
    } = useMultistep({ steps });

    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();

            if (!isLastStep) return next();

            if (isLastStep) {
                await onLastStep?.(() => goTo(0));
            }
        },
        [goTo, isLastStep, next, onLastStep]
    );

    return (
        <Component onSubmit={Component === "form" ? handleSubmit : undefined}>
            {/* header */}
            <header className="flex justify-between items-center gap-4 p-4">
                <h2 className="title">{title}</h2>
                <div className="text-sm">
                    {stepTotal > 0 ? stepIndex + 1 : 0} / {stepTotal}
                </div>
            </header>
            {/* main */}
            <div className="p-4">{step}</div>
            {/* footer */}
            <footer className="flex items-center justify-end gap-4 p-4">
                {!isFirstStep && (
                    <Button color="success" variant="light" onClick={back}>
                        Back
                    </Button>
                )}
                <Button
                    className="text-white"
                    color="success"
                    type={Component === "form" ? "submit" : "button"}
                    onClick={Component === "form" ? undefined : next}
                    isLoading={loading}
                    disabled={loading}
                >
                    {isLastStep ? "Finish" : "Next"}
                </Button>
            </footer>
        </Component>
    );
};

export default MultiStep;
