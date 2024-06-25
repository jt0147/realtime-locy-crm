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
    createCustomerOperational,
    deleteCustomerOperational,
    getAllCustomerContacts,
    getAllOperationals,
    getCustomerOperationals,
    updateCustomerOperational,
} from "@/api";
import { Pagination } from "@/components";
import { useAuth } from "@/contexts";
import { useDebounced } from "@/hooks";
import {
    CreateCustomerOperationalModal,
    DeleteCustomerOperationalModal,
    UpdateCustomerOperationalModal,
} from "@/modals";
import {
    TAuthContextProps,
    TCreateCustomerOperationalRequest,
    TCustomerContactDto,
    TCustomerOperationalDto,
    TOperationalDto,
    TPagination,
    TTableData,
    TUpdateCustomerOperationalRequest,
} from "@/types";

import { TTableProps } from "./types";

type TData = TTableData<TCustomerOperationalDto>;

const columns = [
    { label: "người liên hệ", uid: "contact" },
    { label: "tác nghiệp", uid: "operational" },
    { label: "nội dung", uid: "content" },
    { label: "khách hàng phản hồi", uid: "customerResponse" },
    { label: "tạo", uid: "createdAt" },
    { label: "", uid: "actions" },
];

const initCustomerOperational: TCreateCustomerOperationalRequest = {
    idLoaiTacNghiep: undefined,
    noiDung: "",
    idUserCreate: undefined,
    idCustomer: undefined,
    thoiGianThucHien: "",
    idNguoiLienHe: undefined,
    khachHangPhanHoi: "",
    ngayPhanHoi: "",
};

const CustomerOperationalTable = ({
    id,
    isRefresh,
    onRefreshDone,
}: TTableProps) => {
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
    const [createData, setCreateData] =
        useState<TCreateCustomerOperationalRequest>({
            ...initCustomerOperational,
            idCustomer: Number(id),
            idUserCreate: user?.id,
        });
    const [updateSelected, setUpdateSelected] =
        useState<TUpdateCustomerOperationalRequest | null>(null);
    const [idDelete, setIdDelete] = useState<number | null>(null);

    const debouncedSearch = useDebounced(search, 1000);

    const [contacts, setContacts] = useState<TCustomerContactDto[] | []>([]);
    const [operationals, setOperationals] = useState<TOperationalDto[] | []>(
        []
    );

    const { isFetching, isLoading, refetch } = useQuery({
        queryKey: [
            ["operationals", id],
            debouncedSearch, //refetch when search changes
            pagination.pageIndex, //refetch when pagination.pageIndex changes
            pagination.pageSize, //refetch when pagination.pageSize changes
        ],
        queryFn: () =>
            getCustomerOperationals({
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

    const { data: contactsRes } = useQuery({
        queryKey: ["contacts", id],
        queryFn: () => getAllCustomerContacts(id as number),
        refetchOnWindowFocus: true,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            id !== null,
    });

    const { data: operationalsRes } = useQuery({
        queryKey: "operationals",
        queryFn: getAllOperationals,
        refetchOnWindowFocus: true,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    const createMutation = useMutation({
        mutationFn: createCustomerOperational,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
            }
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateCustomerOperational,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
            }
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteCustomerOperational,
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
        setCreateData({ ...initCustomerOperational, idCustomer: Number(id) });
    }, [id]);

    const handleCreate = useCallback(
        async (data: TCreateCustomerOperationalRequest) => {
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
        async (data: TUpdateCustomerOperationalRequest) => {
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
        (item: TCustomerOperationalDto, columnKey: string | number) => {
            switch (columnKey) {
                case "contact":
                    return (
                        <div className={`w-44 space-y-2`}>
                            <div className="text-sm font-medium first-letter:uppercase">
                                {item.nguoiLienHe}
                            </div>
                        </div>
                    );
                case "operational":
                    return (
                        <div className={`w-12`}>
                            <div
                                className="text-sm first-letter:uppercase"
                                role="subtitle"
                            >
                                {item.loaiTacNghiep}
                            </div>
                            <div className="text-xs">
                                {item.thoiGianThucHien}
                            </div>
                        </div>
                    );
                case "content":
                    return (
                        <div className="w-44 space-y-2">
                            <div className="text-sm">{item.noiDung}</div>
                        </div>
                    );
                case "customerResponse":
                    return (
                        <div className="w-32 space-y-2">
                            <div className="text-sm first-letter:uppercase font-medium">
                                {item.khachHangPhanHoi}
                            </div>
                            <div className="text-xs">{item.ngayPhanHoi}</div>
                        </div>
                    );
                case "createdAt":
                    return (
                        <div className="w-32">
                            <div
                                className="text-sm capitalize font-medium"
                                role="sub-title"
                            >
                                {item.nguoiTao}
                            </div>
                            <div className="text-xs capitalize">
                                {item.dateCreate}
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
                                                idLoaiTacNghiep:
                                                    item.idLoaiTacNghiep,
                                                idNguoiLienHe:
                                                    item.idNguoiLienHe,
                                                khachHangPhanHoi:
                                                    item.khachHangPhanHoi,
                                                ngayPhanHoi: item.ngayPhanHoi,
                                                noiDung: item.noiDung,
                                                thoiGianThucHien:
                                                    item.thoiGianThucHien,
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
                            {item[columnKey as keyof TCustomerOperationalDto]}
                        </div>
                    );
            }
        },
        [openDeleteModal, openUpdateModal]
    );

    useEffect(() => {
        if (contactsRes && contactsRes.status) {
            setContacts(contactsRes.data as unknown as TCustomerContactDto[]);
        }
    }, [contactsRes]);

    useEffect(() => {
        if (operationalsRes && operationalsRes.status) {
            setOperationals(
                operationalsRes.data as unknown as TOperationalDto[]
            );
        }
    }, [operationalsRes]);

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
            <CreateCustomerOperationalModal
                data={createData}
                setData={setCreateData}
                isOpen={isOpenCreateModal}
                onClose={closeCreateModal}
                onSubmit={async () => {
                    await handleCreate(createData);
                }}
                loading={createMutation.isLoading}
                contacts={contacts}
                operationals={operationals}
            />
            <UpdateCustomerOperationalModal
                isOpen={isOpenUpdateModal}
                onClose={closeUpdateModal}
                onSubmit={async (item) => {
                    await handleUpdate(item);
                }}
                loading={updateMutation.isLoading}
                item={updateSelected}
                contacts={contacts}
                operationals={operationals}
            />
            <DeleteCustomerOperationalModal
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

export default CustomerOperationalTable;
