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
