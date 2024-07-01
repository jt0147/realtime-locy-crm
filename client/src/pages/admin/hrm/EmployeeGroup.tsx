import { Fragment, useCallback, useMemo, useState } from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import {
    MaterialReactTable,
    type MRT_ColumnDef,
    useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { TbRefresh } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import {
    createEmployeeGroup,
    deleteEmployeeOfGroup,
    getEmployeeGroups,
} from "@/api";
import { useAuth } from "@/contexts";
import { CreateEmployeeGroupModal, DeleteEmployeeGroupModal } from "@/modals";
import {
    TAuthContextProps,
    TCreateEmployeeGroupRequest,
    TEmployeeGroupDto,
    TTableData,
} from "@/types";
import { buildTree, notification } from "@/utilities";

const initEmployeeGroup: TCreateEmployeeGroupRequest = {
    parentId: undefined,
    nameGroup: "",
    idNhanVien: [],
    flagViewAllGroup: false,
};

type TColumn = Partial<TEmployeeGroupDto & { subRows: TEmployeeGroupDto[] }>;
type TData = TTableData<TEmployeeGroupDto & { subRows: TEmployeeGroupDto[] }>;

const EmployeeGroup = () => {
    const [tableData, setTableData] = useState<TData>([]);
    const [totalRow, setTotalRow] = useState<number>(0);

    const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [idSelectedDelete, setIdSelectedDelete] = useState<number | null>(
        null
    );
    const [createData, setCreateData] = useState<TCreateEmployeeGroupRequest>({
        ...initEmployeeGroup,
    });

    const navigate = useNavigate();

    const { user }: TAuthContextProps = useAuth();

    const { isError, isFetching, isLoading, refetch } = useQuery({
        queryKey: "employeeGroups",
        queryFn: getEmployeeGroups,
        onSuccess: (data) => {
            if (data.status) {
                const dataTree = buildTree(data.data.data);
                setTableData(dataTree);
                setTotalRow(data.data.totalRow);
            }
        },
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            (user?.permission.includes("1048576") ||
                user?.permission.includes("5000")),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    const createMutation = useMutation({
        mutationFn: createEmployeeGroup,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
            }
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteEmployeeOfGroup,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
            }
        },
    });

    /**
     * * Handle events
     */
    const openCreateModal = useCallback((id: number | undefined) => {
        setCreateData((prev) => ({ ...prev, parentId: id }));
        setIsOpenCreateModal(true);
    }, []);

    const closeCreateModal = useCallback(() => {
        setCreateData((prev) => ({ ...prev, parentId: undefined }));
        setIsOpenCreateModal(false);
    }, []);

    const handleCreate = useCallback(
        async (data: TCreateEmployeeGroupRequest) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result: any = await createMutation.mutateAsync(data);
            if (result.status) {
                closeCreateModal();
            }
        },
        [closeCreateModal, createMutation]
    );

    const openDeleteModal = useCallback(() => {
        setIsOpenDeleteModal(true);
    }, []);

    const closeDeleteModal = useCallback(() => {
        setIdSelectedDelete(null);
        setIsOpenDeleteModal(false);
    }, []);

    const handleDelete = useCallback(
        async (id: number) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result: any = await deleteMutation.mutateAsync(id);
            if (result.status) {
                closeDeleteModal();
            }
        },
        [closeDeleteModal, deleteMutation]
    );

    /**
     * * Material table configuration
     */
    const columns = useMemo<MRT_ColumnDef<TColumn>[]>(() => {
        return [
            {
                accessorKey: "nameGroup",
                header: "Nhóm",
                size: 240,
            },
            {
                accessorKey: "nameVI",
                header: "Tên nhân viên",
                size: 240,
                muiTableBodyCellProps: () => ({
                    className: "capitalize",
                }),
            },
            {
                accessorKey: "chucVu",
                header: "Chức vụ",
                size: 180,
                muiTableBodyCellProps: () => ({
                    className: "first-letter:uppercase",
                }),
            },
            {
                accessorKey: "flagViewAllGroup",
                header: "Xem tất cả nhóm",
                size: 120,
                accessorFn: (row) => (
                    <input
                        type="checkbox"
                        id={row.id?.toString()}
                        name={row.id?.toString()}
                        defaultChecked={row.flagViewAllGroup}
                        disabled
                    />
                ),
            },
        ];
    }, []);

    const table = useMaterialReactTable({
        columns,
        data: tableData,
        enableStickyHeader: true,
        enableStickyFooter: true,
        enablePagination: false,
        enableExpanding: true,
        enableEditing: true,
        muiTableContainerProps: { sx: { maxHeight: "640px" } },
        renderTopToolbar: () => (
            <div className="flex justify-end items-center gap-3 min-h-[4.375rem] px-4">
                <Tooltip arrow placement="right" title="Tải lại dữ liệu">
                    <Button
                        variant="light"
                        className="min-w-8 aspect-square flex items-center justify-center"
                        color="primary"
                        onClick={() => {
                            refetch();
                        }}
                    >
                        <TbRefresh className="w-4 h-4 flex-shrink-0" />
                    </Button>
                </Tooltip>
            </div>
        ),
        renderRowActions: ({ row }) => (
            <Box sx={{ display: "flex", gap: "0.25rem" }}>
                {(user?.permission.includes("1048576") ||
                    user?.permission.includes("5000")) && (
                    <>
                        {(user?.permission.includes("1048576") ||
                            user?.permission.includes("5000")) && (
                            <Tooltip
                                arrow
                                placement="left"
                                title="Tạo nhóm con"
                            >
                                <IconButton
                                    color="success"
                                    size="small"
                                    onClick={() => {
                                        const { id } = row.original;
                                        openCreateModal(id);
                                    }}
                                >
                                    <FiPlus />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Tooltip arrow placement="left" title="Loại khỏi nhóm">
                            <IconButton
                                color="error"
                                size="small"
                                onClick={() => {
                                    const { id, subRows, nameVI } =
                                        row.original;

                                    if (subRows && subRows.length > 0) {
                                        notification(
                                            false,
                                            `Nhân viên ${nameVI} đang quản lý nhân viên khác.`
                                        );
                                    }

                                    if (!subRows) {
                                        setIdSelectedDelete(id as number);
                                        openDeleteModal();
                                    }
                                }}
                            >
                                <IoClose />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </Box>
        ),
        renderEmptyRowsFallback: () => (
            <div className="px-2 py-6">
                <p className="subtitle first-letter:uppercase">
                    không có dữ liệu
                </p>
            </div>
        ),
        getSubRows: (row) => row.subRows, //default
        initialState: {
            expanded: true,
            columnPinning: {
                right: ["mrt-row-actions"],
            },
        },
        manualFiltering: true,
        rowCount: totalRow,
        state: {
            isLoading,
            showAlertBanner: isError,
            showProgressBars: isFetching,
        },
    });

    return (
        <Fragment>
            <div className="flex justify-between items-center p-4 bg-white rounded-lg mt-4">
                <h2 className="title">phân cấp nhân viên</h2>
                <div className="flex gap-2 items-center">
                    <Button
                        className="inline-block first-letter:uppercase"
                        color="primary"
                        onClick={() => navigate("/employee/group")}
                    >
                        quản lý nhân viên
                    </Button>
                    <Button
                        className="inline-block first-letter:uppercase text-white"
                        color="success"
                        onClick={() => console.log("tao nhom moi")}
                    >
                        tạo mới
                    </Button>
                </div>
            </div>
            <div className="bg-white rounded-lg">
                <MaterialReactTable table={table} />
            </div>
            {/* Modal */}
            {(user?.permission.includes("1048576") ||
                user?.permission.includes("5000")) && (
                <CreateEmployeeGroupModal
                    data={createData}
                    setData={setCreateData}
                    isOpen={isOpenCreateModal}
                    onClose={closeCreateModal}
                    onSubmit={async () => {
                        await handleCreate(createData);
                    }}
                    loading={createMutation.isLoading}
                />
            )}
            {(user?.permission.includes("1048576") ||
                user?.permission.includes("5000")) && (
                <DeleteEmployeeGroupModal
                    isOpen={isOpenDeleteModal}
                    onClose={closeDeleteModal}
                    onSubmit={async () => {
                        await handleDelete(idSelectedDelete as number);
                    }}
                    loading={deleteMutation.isLoading}
                />
            )}
        </Fragment>
    );
};

export default EmployeeGroup;
