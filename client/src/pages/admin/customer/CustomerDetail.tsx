import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Button, Tooltip } from "@nextui-org/react";
import { TbRefresh } from "react-icons/tb";

import { getCustomerById } from "@/api";
import { Loading } from "@/components";
import {
    CustomerDetailSection,
    CustomerRelatedListSection,
    NotFound,
} from "@/layouts";
import { TCustomerDto } from "@/types";
import { isNumber } from "@/utilities";

const CustomerDetail = () => {
    const { id } = useParams();

    const [isRefresh, setIsRefresh] = useState<boolean>(false);

    const [customer, setCustomer] = useState<TCustomerDto | null>(null);

    const { data, isLoading, isRefetching, refetch } = useQuery({
        queryKey: ["customerDetail", id],
        queryFn: () => getCustomerById(Number(id)),
        staleTime: Infinity,
        cacheTime: Infinity,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            id !== undefined &&
            isNumber(id),
    });

    const handleRefreshDone = useCallback(() => {
        setIsRefresh(false);
    }, []);

    useEffect(() => {
        if (data && data.status) {
            setCustomer(data.data as unknown as TCustomerDto);
        }
    }, [data]);

    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    if (!customer && !isLoading) {
        return (
            <div className="py-28">
                <NotFound />
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-between items-center gap-4 p-4 bg-white rounded-lg mt-4">
                <h2 className="title">thông tin khách hàng</h2>
                <div className="flex gap-2 items-center">
                    <Tooltip content="Tải lại dữ liệu">
                        <Button
                            variant="light"
                            className="min-w-8 aspect-square flex items-center justify-center"
                            color="primary"
                            onClick={() => refetch()}
                        >
                            <TbRefresh className="w-4 h-4 flex-shrink-0" />
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <div className="flex flex-col xl:flex-row gap-4 items-start">
                {/* Base information */}
                <div className="w-full xl:w-[25rem] flex-shrink-0 p-4 bg-white rounded-lg shadow">
                    <CustomerDetailSection
                        data={customer as TCustomerDto}
                        isLoading={isRefetching}
                    />
                </div>
                {/* More information */}
                <div className="flex-shrink-0 flex-1 w-full overflow-auto shadow">
                    <CustomerRelatedListSection
                        id={Number(id)}
                        isRefresh={isRefresh}
                        onRefreshDone={handleRefreshDone}
                    />
                </div>
            </div>
        </>
    );
};

export default CustomerDetail;
