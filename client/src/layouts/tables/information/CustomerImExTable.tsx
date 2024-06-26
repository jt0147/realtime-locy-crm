import { Fragment, useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import { HiDotsVertical } from "react-icons/hi";

import {
    createCustomerImEx,
    deleteCustomerImEx,
    getAllCountries,
    getCustomerImExs,
    updateCustomerImEx,
} from "@/api";
import { Pagination } from "@/components";
import { useAuth } from "@/contexts";
import { useDebounced } from "@/hooks";
import {
    CreateCustomerImExModal,
    DeleteCustomerImExModal,
    UpdateCustomerImExModal,
} from "@/modals";
import {
    TAuthContextProps,
    TCountryDto,
    TCreateCustomerImExRequest,
    TCustomerImExDto,
    TPagination,
    TTableData,
    TUpdateCustomerImExRequest,
} from "@/types";

import { TTableProps } from "./types";

type TData = TTableData<TCustomerImExDto>;

const columns = [
    { label: "thời gian thực hiện", uid: "time" },
    { label: "thông tin đi", uid: "infoFrom" },
    { label: "thông tin đến", uid: "infoTo" },
    { label: "HS Code", uid: "hscode" },
    { label: "loại", uid: "type" },
    { label: "thông tin chi tiết", uid: "information" },
    { label: "tạo", uid: "createdAt" },
    { label: "", uid: "actions" },
];

const initCustomerImEx: TCreateCustomerImExRequest = {
    idCustomer: undefined,
    idUserCreate: undefined,
    idFromCountry: undefined,
    idFromPort: undefined,
    idToCountry: undefined,
    idToPort: undefined,
    code: "",
    type: "",
    commd: "",
    date: "",
    term: "",
    vessel: "",
    vol: "",
    unt: "",
};

const CustomerImExTable = ({ id, isRefresh, onRefreshDone }: TTableProps) => {
    const { user }: TAuthContextProps = useAuth();

    const [tableData, setTableData] = useState<TData>([]);
    const [search, setSearch] = useState<string>("");
    const [pagination, setPagination] = useState<TPagination>({
        pageIndex: 0,
        pageSize: 100,
    });
    const [totalRow, setTotalRow] = useState<number>(0);

    const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [createData, setCreateData] = useState<TCreateCustomerImExRequest>({
        ...initCustomerImEx,
        idCustomer: Number(id),
        idUserCreate: user?.id,
    });
    const [updateSelected, setUpdateSelected] =
        useState<TUpdateCustomerImExRequest | null>(null);
    const [idDelete, setIdDelete] = useState<number | null>(null);

    const [countries, setCountries] = useState<TCountryDto[] | []>([]);

    const debouncedSearch = useDebounced(search, 1000);

    const { isFetching, isLoading, refetch } = useQuery({
        queryKey: [
            ["imexs", id],
            debouncedSearch, //refetch when search changes
            pagination.pageIndex, //refetch when pagination.pageIndex changes
            pagination.pageSize, //refetch when pagination.pageSize changes
        ],
        queryFn: () =>
            getCustomerImExs({
                start: pagination.pageIndex * pagination.pageSize,
                size: pagination.pageSize,
                search,
                idCustomer: id,
            }),
        onSuccess: (data) => {
            if (data.status) {
                setTableData(data.data.data);
                setTotalRow(data.data.totalRow);
            }
        },
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
        keepPreviousData: true,
        refetchOnWindowFocus: true,
    });

    const { data: countriesRes } = useQuery({
        queryKey: "countries",
        queryFn: getAllCountries,
        refetchOnWindowFocus: true,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    const createMutation = useMutation({
        mutationFn: createCustomerImEx,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
            }
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateCustomerImEx,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
            }
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteCustomerImEx,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
            }
        },
    });

    /**
     * * Handle events
     */
    const openCreateModal = useCallback(() => {
        setIsOpenCreateModal(true);
    }, []);

    const closeCreateModal = useCallback(() => {
        setIsOpenCreateModal(false);
        setCreateData({
            ...initCustomerImEx,
            idCustomer: Number(id),
            idUserCreate: user?.id,
        });
    }, [id, user]);

    const handleCreate = useCallback(
        async (data: TCreateCustomerImExRequest) => {
            await createMutation.mutateAsync(data);
            closeCreateModal();
        },
        [closeCreateModal, createMutation]
    );

    const openUpdateModal = useCallback(() => {
        setIsOpenUpdateModal(true);
    }, []);

    const closeUpdateModal = useCallback(() => {
        setIsOpenUpdateModal(false);
        setUpdateSelected(null);
    }, []);

    const handleUpdate = useCallback(
        async (data: TUpdateCustomerImExRequest) => {
            await updateMutation.mutateAsync(data);
            closeUpdateModal();
        },
        [closeUpdateModal, updateMutation]
    );

    const openDeleteModal = useCallback(() => {
        setIsOpenDeleteModal(true);
    }, []);

    const closeDeleteModal = useCallback(() => {
        setIsOpenDeleteModal(false);
        setIdDelete(null);
    }, []);

    const handleDelete = useCallback(
        async (id: number) => {
            await deleteMutation.mutateAsync(id);
            closeDeleteModal();
        },
        [closeDeleteModal, deleteMutation]
    );

    const renderCell = useCallback(
        (item: TCustomerImExDto, columnKey: string | number) => {
            switch (columnKey) {
                case "time":
                    return (
                        <div className={`w-8 space-y-2`}>
                            <div className="text-sm">{item.date}</div>
                        </div>
                    );
                case "infoFrom":
                    return (
                        <div className={`w-48 space-y-2`}>
                            <div
                                className="text-sm font-medium first-letter:uppercase"
                                role="sub-title"
                            >
                                {item.cangDi}
                            </div>
                            <div className="text-xs first-letter:uppercase">
                                {item.quocGiaDi}
                            </div>
                        </div>
                    );
                case "infoTo":
                    return (
                        <div className={`w-48 space-y-2`}>
                            <div
                                className="text-sm font-medium first-letter:uppercase"
                                role="sub-title"
                            >
                                {item.cangDen}
                            </div>
                            <div className="text-xs first-letter:uppercase">
                                {item.quocGiaDen}
                            </div>
                        </div>
                    );
                case "hscode":
                    return (
                        <div className={`w-12 space-y-2`}>
                            <div className="text-sm first-letter:uppercase">
                                {item.code}
                            </div>
                        </div>
                    );
                case "type":
                    return (
                        <div className={`w-24 space-y-2`}>
                            <div className="text-sm first-letter:uppercase">
                                {item.type}
                            </div>
                        </div>
                    );
                case "information":
                    return (
                        <div className={`w-32 space-y-2`}>
                            <div className="text-sm first-letter:uppercase">
                                tên tàu: {item.vessel}
                            </div>
                            <div className="text-sm first-letter:uppercase">
                                term: {item.term}
                            </div>
                            <div className="text-sm first-letter:uppercase">
                                vol: {item.vol}
                            </div>
                            <div className="text-sm first-letter:uppercase">
                                unt: {item.unt}
                            </div>
                        </div>
                    );
                case "createdAt":
                    return (
                        <div className="w-32 space-y-2">
                            <div
                                className="text-sm capitalize font-medium"
                                role="sub-title"
                            >
                                {item.nguoiTao}
                            </div>
                            <div className="text-xs capitalize">
                                {item.createDate}
                            </div>
                        </div>
                    );
                case "actions":
                    return (
                        <div className="relative flex justify-end items-center gap-2">
                            <Dropdown className="bg-background border-1 border-default-200">
                                <DropdownTrigger>
                                    <Button
                                        isIconOnly
                                        radius="full"
                                        size="sm"
                                        variant="light"
                                    >
                                        <HiDotsVertical className="text-lg text-gray-400" />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem
                                        onClick={() => {
                                            setUpdateSelected({
                                                id: item.id,
                                                idCustomer: item.idCustomer,
                                                idFromCountry:
                                                    item.idFromCountry,
                                                idFromPort: item.idFromPort,
                                                idToCountry: item.idToCountry,
                                                idToPort: item.idToPort,
                                                code: item.code,
                                                type: item.type,
                                                commd: item.commd,
                                                date: item.date,
                                                term: item.term,
                                                unt: item.unt,
                                                vessel: item.vessel,
                                                vol: item.vol,
                                            });
                                            openUpdateModal();
                                        }}
                                    >
                                        Edit
                                    </DropdownItem>
                                    <DropdownItem
                                        onClick={() => {
                                            setIdDelete(item.id);
                                            openDeleteModal();
                                        }}
                                    >
                                        Delete
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    );
                default:
                    return (
                        <div>{item[columnKey as keyof TCustomerImExDto]}</div>
                    );
            }
        },
        [openDeleteModal, openUpdateModal]
    );

    useEffect(() => {
        if (countriesRes && countriesRes.status) {
            setCountries(countriesRes.data as unknown as TCountryDto[]);
        }
    }, [countriesRes]);

    useEffect(() => {
        if (isRefresh) {
            refetch();
            onRefreshDone();
        }
    }, [isRefresh, onRefreshDone, refetch]);

    return (
        <Fragment>
            {/* Header table */}
            <div className="p-4 flex justify-between items-center min-h-[4.375rem]">
                <div className="w-64">
                    <Input
                        label="Tìm kiếm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div>
                    <Button
                        className="inline-block first-letter:uppercase text-white"
                        color="success"
                        onClick={openCreateModal}
                    >
                        tạo mới
                    </Button>
                </div>
            </div>
            {/* Display data table */}
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
                        {`${pagination.pageIndex * pagination.pageSize + 1} - ${
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
            <CreateCustomerImExModal
                data={createData}
                setData={setCreateData}
                isOpen={isOpenCreateModal}
                onClose={closeCreateModal}
                onSubmit={async () => {
                    await handleCreate(createData);
                }}
                loading={createMutation.isLoading}
                countries={countries}
            />
            <UpdateCustomerImExModal
                isOpen={isOpenUpdateModal}
                onClose={closeUpdateModal}
                onSubmit={async (item) => {
                    await handleUpdate(item);
                }}
                loading={updateMutation.isLoading}
                item={updateSelected}
                countries={countries}
            />
            <DeleteCustomerImExModal
                isOpen={isOpenDeleteModal}
                onClose={closeDeleteModal}
                onSubmit={async () => {
                    await handleDelete(idDelete as number);
                }}
                loading={deleteMutation.isLoading}
            />
        </Fragment>
    );
};

export default CustomerImExTable;
