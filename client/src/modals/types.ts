import { Dispatch } from "react";

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
    loading?: boolean;
};

export type TCreateModalProps<T> = TModalProps & {
    data: T;
    setData: Dispatch<React.SetStateAction<T>>;
};

export type TUpdateModalProps<T> = Omit<TModalProps, "onSubmit"> & {
    item: T | null;
    onSubmit: (item: T) => void | Promise<void>;
};
