import { ElementType, ReactElement } from "react";

export type TLastStepParam = () => void;

export type TMultiStep = {
    as?: ElementType;

    title?: string;
    classNames?: {
        wrapper?: string;
        header?: string;
        main?: string;
        footer?: string;
    };

    steps: ReactElement[];
    onLastStep?: (refresh: TLastStepParam) => void | Promise<void>;
    loading?: boolean;
};
