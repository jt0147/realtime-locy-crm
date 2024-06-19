import { TCustomerDto, TTableData } from "@/types";

export type TCustomerTableProps = {
    data: TTableData<TCustomerDto>;
    loading?: boolean;

    // Pagination
    pagination: {
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
    size: number;
};
