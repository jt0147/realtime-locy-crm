export type TPaginationProps = {
    loop?: boolean;
    showControls?: boolean;
    color?:
        | "default"
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "danger";
    onPaginationChange: (page: number) => void;
    total: number;
    initialPage: number;
};
