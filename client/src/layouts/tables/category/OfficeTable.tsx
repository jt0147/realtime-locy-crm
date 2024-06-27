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
    Tooltip,
} from "@nextui-org/react";
import { HiDotsVertical } from "react-icons/hi";
import { TbRefresh } from "react-icons/tb";

import {
    createOffice,
    deleteOffice,
    getAllCountries,
    getCities,
    updateOffice,
} from "@/api";
import { Pagination } from "@/components";
import { useDebounced } from "@/hooks";
import {
    CreateOfficeModal,
    DeleteOfficeModal,
    UpdateOfficeModal,
} from "@/modals";
import {
    TOfficeDto,
    TCountryDto,
    TCreateOfficeRequest,
    TPagination,
    TTableData,
    TUpdateOfficeRequest,
} from "@/types";

type TData = TTableData<TOfficeDto>;

const columns = [
    { label: "mã", uid: "code" },
    { label: "thông tin văn phòng", uid: "office" },
    { label: "địa chỉ", uid: "address" },
    { label: "thông tin liên hệ", uid: "contact" },
    { label: "ghi chú", uid: "note" },
    { label: "", uid: "actions" },
];

const initOffice: TCreateOfficeRequest = {
    code: "",
    nameVI: "",
    nameEN: "",
    addressVI: "",
    addressEN: "",
    email: "",
    fax: "",
    idCity: undefined,
    idCountry: undefined,
    phone: "",
    note: "",
    taxCode: "",
    website: "",
};

const OfficeTable = () => {
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
    const [createData, setCreateData] = useState<TCreateOfficeRequest>({
        ...initOffice,
    });
    const [updateSelected, setUpdateSelected] =
        useState<TUpdateOfficeRequest | null>(null);
    const [idDelete, setIdDelete] = useState<number | null>(null);

    const [countries, setCountries] = useState<TCountryDto[] | []>([]);

    const debouncedSearch = useDebounced(search, 1000);

    const { isFetching, isLoading, refetch } = useQuery({
        queryKey: [
            "cities",
            debouncedSearch, //refetch when search changes
            pagination.pageIndex, //refetch when pagination.pageIndex changes
            pagination.pageSize, //refetch when pagination.pageSize changes
        ],
        queryFn: () =>
            getCities({
                start: pagination.pageIndex * pagination.pageSize,
                size: pagination.pageSize,
                search,
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
        mutationFn: createOffice,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
            }
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateOffice,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
            }
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteOffice,
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
        setCreateData({ ...initOffice });
    }, []);

    const handleCreate = useCallback(
        async (data: TCreateOfficeRequest) => {
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
        async (data: TUpdateOfficeRequest) => {
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
        (item: TOfficeDto, columnKey: string | number) => {
            switch (columnKey) {
                case "code":
                    return (
                        <div className="w-16 space-y-2">
                            <div className="text-sm font-medium">
                                {item.code}
                            </div>
                            <div className="text-xs">{item.taxCode}</div>
                        </div>
                    );

                case "name":
                    return (
                        <div className="w-64 space-y-2">
                            <div className="text-sm font-medium first-letter:uppercase">
                                {item.nameVI}
                            </div>
                            <div className="text-xs first-letter:uppercase">
                                {item.addressVI}
                            </div>
                        </div>
                    );
                case "address":
                    return (
                        <div className="w-48 space-y-2">
                            <div className="text-sm font-medium first-letter:uppercase">
                                {item.quocGia}
                            </div>
                            <div className="text-xs first-letter:uppercase">
                                {item.thanhPho}
                            </div>
                        </div>
                    );
                case "contact":
                    return (
                        <div className="w-64 space-y-2">
                            <div className="text-sm first-letter:uppercase">
                                {item.phone}
                            </div>
                            <div className="text-sm first-letter:uppercase">
                                {item.email}
                            </div>
                            <div className="text-sm first-letter:uppercase">
                                {item.website}
                            </div>
                        </div>
                    );
                case "note":
                    return (
                        <div className="w-32 space-y-2">
                            <div className="text-sm first-letter:uppercase">
                                {item.note}
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
                                                code: item.code,
                                                nameVI: item.nameVI,
                                                nameEN: item.nameEN,
                                                addressVI: item.addressVI,
                                                addressEN: item.addressEN,
                                                email: item.email,
                                                fax: item.fax,
                                                idCity: item.idCity,
                                                idCountry: item.idCountry,
                                                note: item.note,
                                                phone: item.phone,
                                                taxCode: item.taxCode,
                                                website: item.website,
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
                    return <div>{item[columnKey as keyof TOfficeDto]}</div>;
            }
        },
        [openDeleteModal, openUpdateModal]
    );

    useEffect(() => {
        if (countriesRes && countriesRes.status) {
            setCountries(countriesRes.data as unknown as TCountryDto[]);
        }
    }, [countriesRes]);

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
                <div className="flex items-center gap-2">
                    <Button
                        className="inline-block first-letter:uppercase text-white"
                        color="success"
                        onClick={openCreateModal}
                    >
                        tạo mới
                    </Button>
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
            {/* Display data table */}
            <Table
                isHeaderSticky
                aria-label="Category data table"
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
            {/* Modals */}
            <CreateOfficeModal
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
            <UpdateOfficeModal
                isOpen={isOpenUpdateModal}
                onClose={closeUpdateModal}
                onSubmit={async (item) => {
                    await handleUpdate(item);
                }}
                loading={updateMutation.isLoading}
                item={updateSelected}
                countries={countries}
            />
            <DeleteOfficeModal
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

export default OfficeTable;
