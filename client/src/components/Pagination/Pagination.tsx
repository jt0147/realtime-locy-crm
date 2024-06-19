import { Pagination as PaginationNext } from "@nextui-org/react";

import { TPaginationProps } from "./types";

const Pagination = ({
    showControls = true,
    loop,
    color = "success",
    total,
    initialPage,
    onPaginationChange,
}: TPaginationProps) => {
    return (
        <PaginationNext
            showControls={showControls}
            loop={loop}
            color={color}
            total={total}
            initialPage={initialPage}
            onChange={(page) => onPaginationChange(page)}
        />
    );
};

export default Pagination;
