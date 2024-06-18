type TSizeModal =
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";

export type TModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void | Promise<void>;
    title?: string;
    size?: TSizeModal;
};

type TWidth =
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl";

export type TBaseModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    width?: TWidth;

    labelButtonCancel?: string;
    labelButtonOk?: string;
};

export type TCreateModalProps<T> = TBaseModalProps & {
    onSubmit: (payload: T) => Promise<boolean>;
    isLoading: boolean;
};

export type TUpdateModalProps<T> = TBaseModalProps & {
    onSubmit: (payload: T) => Promise<boolean>;
    prevData: T | null;
    isLoading: boolean;
};
