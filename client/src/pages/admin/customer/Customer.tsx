import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import {
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Input,
    Tooltip,
} from "@nextui-org/react";
import { TbRefresh } from "react-icons/tb";
import { MdFilterListAlt } from "react-icons/md";

import {
    exportCustomerData,
    exportCustomerReceivedData,
    getCustomers,
} from "@/api";
import { Select } from "@/components";
import { privateInstance } from "@/configs";
import { useAuth } from "@/contexts";
import { useDebounced } from "@/hooks";
import {
    CustomerAssignedTable,
    CustomerDeleteTable,
    CustomerDeliveredTable,
    CustomerReceivedTable,
    CustomerTable,
    CustomerUndeliveredTable,
} from "@/layouts";
import {
    CustomerFilterModal,
    ExportCustomerModal,
    ExportCustomerReceiveModal,
} from "@/modals";
import {
    TAuthContextProps,
    TCustomerDto,
    TPagination,
    TTableData,
} from "@/types";

import { getListCustomerTable } from "./helper";

type TListType =
    | "all"
    | "assigned"
    | "delete"
    | "delivered"
    | "received"
    | "undelivered";

type TQuery = {
    idTypeOfBusiness: number | undefined;
    idMajor: number | undefined;
    idClassifyCustomer: number | undefined;
    idEvaluate: number | undefined;
    idTypeOfOperational: number | undefined;
    name: string;
    taxCode: string;
    listType: TListType;

    idFromCountryRoute: number | undefined;
    idToCountryRoute: number | undefined;
    idFromPortRoute: number | undefined;
    idToPortRoute: number | undefined;

    idFromCountryImEx: number | undefined;
    idToCountryImEx: number | undefined;
    idFromPortImEx: number | undefined;
    idToPortImEx: number | undefined;
    term: string;
    hsCode: string;
    type: string;
};

const listTypes = [
    {
        label: "Tất cả",
        value: "all",
    },
    {
        label: "Chưa nhận",
        value: "undelivered",
    },
    {
        label: "Đã nhận",
        value: "received",
    },
    {
        label: "Được giao",
        value: "delivered",
    },
    {
        label: "Đã giao",
        value: "assigned",
    },
    {
        label: "Đã xoá",
        value: "delete",
    },
];

type TData = TTableData<TCustomerDto>;

const Customer = () => {
    const [tableData, setTableData] = useState<TData>([]);
    const [pagination, setPagination] = useState<TPagination>({
        pageIndex: 0,
        pageSize: 100,
    });
    const [totalRow, setTotalRow] = useState<number>(0);

    const [query, setQuery] = useState<TQuery>({
        idTypeOfBusiness: undefined,
        idMajor: undefined,
        idClassifyCustomer: undefined,
        idEvaluate: undefined,
        idTypeOfOperational: undefined,
        name: "",
        taxCode: "",
        listType: "all",
        idFromCountryRoute: undefined,
        idToCountryRoute: undefined,
        idFromPortRoute: undefined,
        idToPortRoute: undefined,
        idFromCountryImEx: undefined,
        idToCountryImEx: undefined,
        idFromPortImEx: undefined,
        idToPortImEx: undefined,
        term: "",
        hsCode: "",
        type: "",
    });

    const [isOpenExportModal, setIsOpenExportModal] = useState<boolean>(false);
    const [isOpenExportReceivedModal, setIsOpenExportReceivedModal] =
        useState<boolean>(false);
    const [isOpenFilterModal, setIsOpenFilterModal] = useState<boolean>(false);

    const { user }: TAuthContextProps = useAuth();

    const navigate = useNavigate();

    const debouncedName = useDebounced(query.name, 1000);
    const debouncedTaxCode = useDebounced(query.taxCode, 1000);

    const filterLists = useMemo(() => {
        const lists = getListCustomerTable(
            user?.permission as string,
            user?.username.toLowerCase() as string
        );
        const result = listTypes.filter((item) => {
            return lists.includes(item.label.toLowerCase());
        });
        return result;
    }, [user]);

    const {
        data: customerRes,
        isFetching,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: [
            "customer",
            pagination.pageIndex,
            pagination.pageSize,
            debouncedName,
            debouncedTaxCode,
            query.idTypeOfBusiness,
            query.idMajor,
            query.idClassifyCustomer,
            query.idEvaluate,
            query.idTypeOfOperational,
            query.listType,
            query.idFromCountryRoute,
            query.idToCountryRoute,
            query.idFromPortRoute,
            query.idToPortRoute,
            query.idFromCountryImEx,
            query.idToCountryImEx,
            query.idFromPortImEx,
            query.idToPortImEx,
            query.term,
            query.hsCode,
            query.type,
            user?.id,
        ],
        queryFn: () =>
            getCustomers({
                start: pagination.pageIndex * pagination.pageSize,
                size: pagination.pageSize,
                name: debouncedName,
                taxCode: debouncedTaxCode,
                idTypeOfBusiness: query.idTypeOfBusiness as number,
                idMajor: query.idMajor as number,
                idClassifyCustomer: query.idClassifyCustomer as number,
                idEvaluate: query.idEvaluate as number,
                idTypeOfOperational: query.idTypeOfOperational as number,
                listType: query.listType,
                idFromCountryRoute: query.idFromCountryRoute as number,
                idToCountryRoute: query.idToCountryRoute as number,
                idFromPortRoute: query.idFromPortRoute as number,
                idToPortRoute: query.idToPortRoute as number,
                idFromCountryImEx: query.idFromCountryImEx as number,
                idToCountryImEx: query.idToCountryImEx as number,
                idFromPortImEx: query.idFromPortImEx as number,
                idToPortImEx: query.idToPortImEx as number,
                term: query.term,
                hsCode: query.hsCode,
                type: query.type,
            }),
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    const exportMutation = useMutation({
        mutationFn: exportCustomerData,
    });

    const exportReceivedMutation = useMutation({
        mutationFn: exportCustomerReceivedData,
    });

    /**
     * * Handle events
     */
    const openExportModal = useCallback(() => {
        setIsOpenExportModal(true);
    }, []);

    const closeExportModal = useCallback(() => {
        setIsOpenExportModal(false);
    }, []);

    const handleExportData = useCallback(async () => {
        const data = await exportMutation.mutateAsync();

        if (data && data.status) {
            const baseUrl = privateInstance.defaults.baseURL;
            const fileName = data.data.downloadUrl.split("/").slice(-1)[0];
            const url = `${baseUrl}/export/download/${fileName}`;

            // Create a link element
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;

            // Trigger click event to initiate download
            link.click();

            closeExportModal();
        }
    }, [exportMutation, closeExportModal]);

    const openExportReceivedModal = useCallback(() => {
        setIsOpenExportReceivedModal(true);
    }, []);

    const closeExportReceivedModal = useCallback(() => {
        setIsOpenExportReceivedModal(false);
    }, []);

    const handleExportReceivedData = useCallback(async () => {
        const data = await exportReceivedMutation.mutateAsync();

        if (data && data.status) {
            const baseUrl = privateInstance.defaults.baseURL;
            const fileName = data.data.downloadUrl.split("/").slice(-1)[0];
            const url = `${baseUrl}/export/download/${fileName}`;

            // Create a link element
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;

            // Trigger click event to initiate download
            link.click();

            closeExportReceivedModal();
        }
    }, [exportReceivedMutation, closeExportReceivedModal]);

    const openFilterModal = useCallback(() => {
        setIsOpenFilterModal(true);
    }, []);

    const closeFilterModal = useCallback(() => {
        setIsOpenFilterModal(false);
    }, []);

    useEffect(() => {
        if (customerRes && customerRes.status) {
            setTableData(customerRes.data.data);
            setTotalRow(customerRes.data.totalRow);
        }
    }, [customerRes]);

    return (
        <>
            <div className="flex justify-between items-center p-4 bg-white rounded-lg mt-4">
                <h2 className="title">quản lý khách hàng</h2>
                <div className="flex gap-2 items-center">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                className="inline-flex items-center gap-1"
                                color="primary"
                            >
                                <span className="first-letter:uppercase">
                                    xuất dữ liệu
                                </span>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            className="max-w-48"
                            aria-label="Static Actions"
                        >
                            <DropdownItem key="export-customer">
                                <div
                                    className="first-letter:uppercase cursor-pointer text-wrap"
                                    onClick={openExportModal}
                                >
                                    export dữ liệu khách hàng
                                </div>
                            </DropdownItem>
                            <DropdownItem key="export-customer-received">
                                <div
                                    className="first-letter:uppercase cursor-pointer text-wrap"
                                    onClick={openExportReceivedModal}
                                >
                                    export dữ liệu khách hàng đang quản lý
                                </div>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Button
                        className="inline-block first-letter:uppercase text-white"
                        color="success"
                        onClick={() => navigate("/customer/new")}
                    >
                        tạo mới
                    </Button>
                </div>
            </div>
            <div className="bg-white rounded-lg">
                <div className="p-4 flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-64">
                            <Input
                                label="Tên khách hàng"
                                value={query.name}
                                onChange={(e) =>
                                    setQuery((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="w-48">
                            <Input
                                label="Mã số thuế"
                                value={query.taxCode}
                                onChange={(e) =>
                                    setQuery((prev) => ({
                                        ...prev,
                                        taxCode: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="w-48">
                            <Select
                                label="Trạng thái"
                                options={filterLists}
                                option={{ label: "label", key: "value" }}
                                disallowEmptySelection
                                value={query.listType}
                                onChange={(e) => {
                                    setQuery((prev) => ({
                                        ...prev,
                                        listType:
                                            e.target.value !== ""
                                                ? (e.target.value as TListType)
                                                : "all",
                                    }));
                                    setPagination((prev) => ({
                                        ...prev,
                                        pageIndex: 0,
                                    }));
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
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
                        <Tooltip content="Lọc dữ liệu">
                            <Button
                                variant="light"
                                className="min-w-8 aspect-square flex items-center justify-center"
                                onClick={openFilterModal}
                            >
                                <MdFilterListAlt className="w-4 h-4 flex-shrink-0" />
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
            {/* Table */}
            {query.listType === "all" && (
                <CustomerTable
                    data={tableData}
                    pagination={{
                        initialPage: pagination.pageIndex + 1,
                        total: Math.ceil(totalRow / pagination.pageSize),
                        onPaginationChange: (page) =>
                            setPagination((prev) => ({
                                ...prev,
                                pageIndex: page - 1,
                            })),
                    }}
                    loading={isFetching || isLoading}
                    refetch={() => refetch()}
                    page={{ ...pagination, totalRow }}
                />
            )}
            {query.listType === "assigned" &&
                (user?.permission.includes("1048576") ||
                    user?.permission.includes("7000") ||
                    user?.permission.includes("7080")) && (
                    <CustomerAssignedTable
                        data={tableData}
                        pagination={{
                            initialPage: pagination.pageIndex + 1,
                            total: Math.ceil(totalRow / pagination.pageSize),
                            onPaginationChange: (page) =>
                                setPagination((prev) => ({
                                    ...prev,
                                    pageIndex: page - 1,
                                })),
                        }}
                        loading={isFetching || isLoading}
                        refetch={() => refetch()}
                        page={{ ...pagination, totalRow }}
                    />
                )}
            {query.listType === "received" && (
                <CustomerReceivedTable
                    data={tableData}
                    pagination={{
                        initialPage: pagination.pageIndex + 1,
                        total: Math.ceil(totalRow / pagination.pageSize),
                        onPaginationChange: (page) =>
                            setPagination((prev) => ({
                                ...prev,
                                pageIndex: page - 1,
                            })),
                    }}
                    loading={isFetching || isLoading}
                    refetch={() => refetch()}
                    page={{ ...pagination, totalRow }}
                />
            )}
            {query.listType === "undelivered" && (
                <CustomerUndeliveredTable
                    data={tableData}
                    pagination={{
                        initialPage: pagination.pageIndex + 1,
                        total: Math.ceil(totalRow / pagination.pageSize),
                        onPaginationChange: (page) =>
                            setPagination((prev) => ({
                                ...prev,
                                pageIndex: page - 1,
                            })),
                    }}
                    loading={isFetching || isLoading}
                    refetch={() => refetch()}
                    page={{ ...pagination, totalRow }}
                />
            )}
            {query.listType === "delivered" &&
                user?.username.toLowerCase() !== "admin" && (
                    <CustomerDeliveredTable
                        data={tableData}
                        pagination={{
                            initialPage: pagination.pageIndex + 1,
                            total: Math.ceil(totalRow / pagination.pageSize),
                            onPaginationChange: (page) =>
                                setPagination((prev) => ({
                                    ...prev,
                                    pageIndex: page - 1,
                                })),
                        }}
                        loading={isFetching || isLoading}
                        refetch={() => refetch()}
                        page={{ ...pagination, totalRow }}
                    />
                )}
            {query.listType === "delete" &&
                (user?.permission.includes("1048576") ||
                    user?.permission.includes("7000") ||
                    user?.permission.includes("7020")) && (
                    <CustomerDeleteTable
                        data={tableData}
                        pagination={{
                            initialPage: pagination.pageIndex + 1,
                            total: Math.ceil(totalRow / pagination.pageSize),
                            onPaginationChange: (page) =>
                                setPagination((prev) => ({
                                    ...prev,
                                    pageIndex: page - 1,
                                })),
                        }}
                        loading={isFetching || isLoading}
                        refetch={() => refetch()}
                        page={{ ...pagination, totalRow }}
                    />
                )}
            {/* Modals */}
            {(user?.permission.includes("1048576") ||
                user?.permission.includes("7000") ||
                user?.permission.includes("7060")) && (
                <ExportCustomerModal
                    isOpen={isOpenExportModal}
                    onClose={closeExportModal}
                    onSubmit={handleExportData}
                    loading={exportMutation.isLoading}
                />
            )}
            {(user?.permission.includes("1048576") ||
                user?.permission.includes("7000") ||
                user?.permission.includes("7060")) && (
                <ExportCustomerReceiveModal
                    isOpen={isOpenExportReceivedModal}
                    onClose={closeExportReceivedModal}
                    onSubmit={handleExportReceivedData}
                    loading={exportReceivedMutation.isLoading}
                />
            )}
            <CustomerFilterModal
                isOpen={isOpenFilterModal}
                onClose={closeFilterModal}
                initQuery={query}
                updateQuery={setQuery}
            />
        </>
    );
};

export default Customer;
