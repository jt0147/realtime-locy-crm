import { Fragment, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import moment from "moment";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Spinner,
    Button,
    Input,
    Tooltip,
} from "@nextui-org/react";
import { TbRefresh } from "react-icons/tb";

import { getReportWork } from "@/api";
import { useAuth } from "@/contexts";
import {
    TAuthContextProps,
    TPagination,
    TReportWorkDto,
    TTableData,
} from "@/types";
import { Pagination } from "@/components";

type TFilterFeatures = {
    startDate: string;
    endDate: string;
};

type TData = TTableData<TReportWorkDto>;

const columns = [
    { label: "nhân viên tác nghiệp", uid: "createdAt" },
    { label: "khách hàng", uid: "customer" },
    { label: "nhân viên quản lý", uid: "employee" },
    { label: "loại tác nghiệp", uid: "typeofoperational" },
    { label: "người liên hệ", uid: "contact" },
    { label: "nội dung", uid: "content" },
    { label: "thời gian thực hiện", uid: "dateWork" },
    { label: "thông tin phản hồi", uid: "responseInfo" },
];

const ReportWorkTable = () => {
    const [tableData, setTableData] = useState<TData>([]);
    const [pagination, setPagination] = useState<TPagination>({
        pageIndex: 0,
        pageSize: 100,
    });
    const [totalRow, setTotalRow] = useState<number>(0);

    const [query, setQuery] = useState<TFilterFeatures>({
        startDate: moment().startOf("week").format("YYYY-MM-DD"),
        endDate: moment().endOf("week").format("YYYY-MM-DD"),
    });

    const [isFiltering, setIsFiltering] = useState<boolean>(true);

    const { user }: TAuthContextProps = useAuth();

    const {
        data: reportWorksRes,
        isFetching,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: [
            "reportWorks",
            pagination.pageIndex, //refetch when pagination.pageIndex changes
            pagination.pageSize, //refetch when pagination.pageSize changes
            query.startDate, //refetch when query changes
            query.endDate, //refetch when query changes
            user,
        ],
        queryFn: () =>
            getReportWork({
                start: pagination.pageIndex,
                size: pagination.pageSize,
                ...query,
            }),
        onError: () => {
            setIsFiltering(false);
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        enabled:
            query.startDate.trim() !== "" &&
            query.endDate.trim() !== "" &&
            isFiltering,
    });

    /**
     * * Handle events
     */
    const handleSubmit = () => {
        // TODO: Set filtering status state to true
        setIsFiltering(true);
    };

    const renderCell = useCallback(
        (item: TReportWorkDto, columnKey: string | number) => {
            switch (columnKey) {
                case "createdAt":
                    return (
                        <div className="w-20 rounded-lg">
                            <div className="text-sm capitalize">
                                {item.createdAt}
                            </div>
                        </div>
                    );
                case "customer":
                    return (
                        <div className="w-32">
                            <div className="text-sm first-letter:uppercase">
                                {item.customer}
                            </div>
                        </div>
                    );
                case "employee":
                    return (
                        <div className="w-32">
                            <div className="text-sm capitalize">
                                {item.employee}
                            </div>
                        </div>
                    );
                case "typeofoperational":
                    return (
                        <div className="w-16 space-y-2">
                            <div className="text-sm first-letter:uppercase">
                                {item.typeOfOperational}
                            </div>
                        </div>
                    );
                case "contact":
                    return (
                        <div className="w-32 space-y-2">
                            <div className="text-sm first-letter:uppercase">
                                {item.contact}
                            </div>
                        </div>
                    );
                case "content":
                    return (
                        <div className="w-40 space-y-2">
                            <div className="text-sm first-letter:uppercase">
                                {item.contactContent}
                            </div>
                        </div>
                    );
                case "dateWork":
                    return (
                        <div className="w-16">
                            <div className="text-sm">{item.timeWork}</div>
                        </div>
                    );
                case "responseInfo":
                    return (
                        <div className="w-32 space-y-2">
                            <div className="text-sm first-letter:uppercase">
                                {item.responseContent}
                            </div>
                            <div className="text-xs capitalize">
                                {item.responseAt}
                            </div>
                        </div>
                    );
                default:
                    return <div>{item[columnKey as keyof TReportWorkDto]}</div>;
            }
        },
        []
    );

    useEffect(() => {
        if (reportWorksRes && reportWorksRes.status) {
            setTableData(reportWorksRes.data.data);
            setTotalRow(reportWorksRes.data.totalRow);

            // TODO: Set finding status state to false
            setIsFiltering(false);
        }
    }, [reportWorksRes]);

    return (
        <Fragment>
            <div className="space-y-4">
                {/* Header table */}
                <div className="flex justify-between items-center gap-4">
                    <div className="flex gap-4 items-center">
                        <div className="w-48 flex-grow-0">
                            <Input
                                label="Ngày bắt đầu"
                                type="date"
                                value={query.startDate}
                                onChange={(e) =>
                                    setQuery({
                                        ...query,
                                        startDate: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="w-48 flex-grow-0">
                            <Input
                                label="Ngày kết thúc"
                                type="date"
                                value={query.endDate}
                                onChange={(e) =>
                                    setQuery({
                                        ...query,
                                        endDate: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <Button
                            color="success"
                            className="text-white"
                            onClick={handleSubmit}
                            isLoading={isFiltering}
                            disabled={isFiltering}
                        >
                            {isFiltering ? "Đang lọc" : "Lọc dữ liệu"}
                        </Button>
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
                    </div>
                </div>
                {/* Table */}
                <div className="bg-white rounded-lg">
                    <Table
                        isHeaderSticky
                        aria-label="Customer data table"
                        checkboxesProps={{
                            classNames: {
                                wrapper:
                                    "after:bg-foreground after:text-background text-background",
                            },
                        }}
                        classNames={{
                            wrapper: "max-h-[36rem]",
                            td: "align-top",
                        }}
                    >
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn
                                    className="first-letter:uppercase text-sm font-medium"
                                    key={column.uid}
                                >
                                    {column.label}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody
                            items={tableData}
                            isLoading={isLoading || isFetching}
                            loadingState={isLoading ? "loading" : "idle"}
                            loadingContent={<Spinner />}
                            emptyContent={
                                <div className="px-2 py-6">
                                    <p className="subtitle first-letter:uppercase">
                                        không có dữ liệu
                                    </p>
                                </div>
                            }
                        >
                            {(item) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => (
                                        <TableCell>
                                            {renderCell(item, columnKey)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {/* Bottom table */}
                    <div className="p-4 flex justify-between gap-4">
                        <div className="text-sm">
                            {`${
                                pagination.pageIndex * pagination.pageSize + 1
                            } - ${
                                pagination.pageIndex * pagination.pageSize +
                                tableData.length
                            } of ${totalRow}`}
                        </div>
                        <Pagination
                            initialPage={pagination.pageIndex + 1}
                            total={Math.ceil(totalRow / pagination.pageSize)}
                            onPaginationChange={(page) =>
                                setPagination((prev) => ({
                                    ...prev,
                                    pageIndex: page - 1,
                                }))
                            }
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ReportWorkTable;
