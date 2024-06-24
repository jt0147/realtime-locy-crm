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
    createCustomerContact,
    deleteCustomerContact,
    getCustomerContacts,
    updateCustomerContact,
} from "@/api";
import { Pagination } from "@/components";
import { gender } from "@/constants";
import { useDebounced } from "@/hooks";
import {
    CreateCustomerContactModal,
    DeleteCustomerContactModal,
    UpdateCustomerContactModal,
} from "@/modals";
import {
    TCreateCustomerContactRequest,
    TCustomerContactDto,
    TPagination,
    TTableData,
    TUpdateCustomerContactRequest,
} from "@/types";

import { TTableProps } from "./types";

type TData = TTableData<TCustomerContactDto>;

const columns = [
    { label: "người liên hệ", uid: "contact" },
    { label: "giới tính", uid: "gender" },
    { label: "thông tin liên hệ", uid: "information" },
    { label: "chức vụ", uid: "position" },
    { label: "ghi chú", uid: "note" },
    { label: "người đại diện", uid: "representative" },
    { label: "", uid: "actions" },
];

const initCustomerContact: TCreateCustomerContactRequest = {
    nameVI: "",
    nameEN: "",
    addressVI: "",
    addressEN: "",
    enumGioiTinh: undefined,
    handPhone: "",
    homePhone: "",
    email: "",
    note: "",
    idCustomer: undefined,
    bankAccountNumber: "",
    bankAddress: "",
    bankBranchName: "",
    chat: "",
    chucVu: "",
    flagDaiDien: false,
};

const CustomerContactTable = ({
    id,
    isRefresh,
    onRefreshDone,
}: TTableProps) => {
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
    const [createData, setCreateData] = useState<TCreateCustomerContactRequest>(
        { ...initCustomerContact, idCustomer: Number(id) }
    );
    const [updateSelected, setUpdateSelected] =
        useState<TUpdateCustomerContactRequest | null>(null);
    const [idDelete, setIdDelete] = useState<number | null>(null);

    const debouncedSearch = useDebounced(search, 1000);

    const { isFetching, isLoading, refetch } = useQuery({
        queryKey: [
            ["contacts", id],
            debouncedSearch, //refetch when search changes
            pagination.pageIndex, //refetch when pagination.pageIndex changes
            pagination.pageSize, //refetch when pagination.pageSize changes
        ],
        queryFn: () =>
            getCustomerContacts({
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

    const createMutation = useMutation({
        mutationFn: createCustomerContact,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
            }
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateCustomerContact,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
            }
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteCustomerContact,
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
        setCreateData({ ...initCustomerContact, idCustomer: Number(id) });
    }, [id]);

    const handleCreate = useCallback(
        async (data: TCreateCustomerContactRequest) => {
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
        async (data: TUpdateCustomerContactRequest) => {
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
        (item: TCustomerContactDto, columnKey: string | number) => {
            switch (columnKey) {
                case "contact":
                    return (
                        <div className={`w-44 space-y-2`}>
                            <div
                                className="text-sm font-medium first-letter:uppercase"
                                role="sub-title"
                            >
                                {item.nameVI}
                            </div>
                            <div className="text-xs first-letter:uppercase">
                                {item.addressVI}
                            </div>
                        </div>
                    );
                case "gender":
                    return (
                        <div className={`w-8`}>
                            <div className="text-sm first-letter:uppercase">
                                {item.enumGioiTinh != null &&
                                item.enumGioiTinh >= 0
                                    ? gender[item.enumGioiTinh as number].nameVI
                                    : ""}
                            </div>
                        </div>
                    );
                case "information":
                    return (
                        <div className="w-44 space-y-2">
                            <div className="text-sm">{item.handPhone}</div>
                            <div className="text-sm">{item.email}</div>
                        </div>
                    );
                case "position":
                    return (
                        <div className="w-28 space-y-2">
                            <div className="text-sm first-letter:uppercase font-medium">
                                {item.chucVu}
                            </div>
                        </div>
                    );
                case "note":
                    return (
                        <div className="w-32">
                            <div className="text-sm capitalize">
                                {item.note}
                            </div>
                        </div>
                    );
                case "representative":
                    return (
                        <div className="w-8 space-y-2">
                            <input
                                type="checkbox"
                                id={item.id?.toString()}
                                name={item.id?.toString()}
                                checked={item.flagDaiDien}
                                readOnly
                            />
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
                                                nameVI: item.nameVI,
                                                nameEN: item.nameEN,
                                                addressVI: item.addressVI,
                                                addressEN: item.addressEN,
                                                enumGioiTinh: item.enumGioiTinh,
                                                handPhone: item.handPhone,
                                                homePhone: item.homePhone,
                                                email: item.email,
                                                note: item.note,
                                                idCustomer: item.idCustomer,
                                                bankAccountNumber:
                                                    item.bankAccountNumber,
                                                bankBranchName:
                                                    item.bankBranchName,
                                                bankAddress: item.bankAddress,
                                                chat: item.chat,
                                                flagDaiDien: item.flagDaiDien,
                                                chucVu: item.chucVu,
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
                        <div>
                            {item[columnKey as keyof TCustomerContactDto]}
                        </div>
                    );
            }
        },
        [openDeleteModal, openUpdateModal]
    );

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
            <CreateCustomerContactModal
                data={createData}
                setData={setCreateData}
                isOpen={isOpenCreateModal}
                onClose={closeCreateModal}
                onSubmit={async () => {
                    await handleCreate(createData);
                }}
                loading={createMutation.isLoading}
            />
            <UpdateCustomerContactModal
                isOpen={isOpenUpdateModal}
                onClose={closeUpdateModal}
                onSubmit={async (item) => {
                    await handleUpdate(item);
                }}
                loading={updateMutation.isLoading}
                item={updateSelected}
            />
            <DeleteCustomerContactModal
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

export default CustomerContactTable;
