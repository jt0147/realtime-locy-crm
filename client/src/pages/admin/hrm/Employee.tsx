import { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { TbRefresh } from "react-icons/tb";
import { HiDotsVertical } from "react-icons/hi";

import {
    deleteEmployee,
    getAllDepartments,
    getAllOffices,
    getAllPositions,
    getEmployees,
    updateEmployee,
} from "@/api";
import { Pagination, Select } from "@/components";
import { gender } from "@/constants";
import { useAuth } from "@/contexts";
import {} from "@/modals";
import { useDebounced } from "@/hooks";
import {
    TAuthContextProps,
    TDeleteEmployeeRequest,
    TDepartmentDto,
    TEmployeeDto,
    TOfficeDto,
    TPagination,
    TPositionDto,
    TTableData,
    TUpdateEmployeeRequest,
} from "@/types";

type TData = TTableData<TEmployeeDto>;
type TQuery = {
    idPosition: number | undefined;
    idDepartment: number | undefined;
    idOffice: number | undefined;
    trangThai: boolean;
};

const columns = [
    { label: "Mã nhân viên", uid: "code" },
    { label: "Thông tin cơ bản", uid: "base" },
    { label: "Địa chỉ", uid: "address" },
    { label: "Thông tin liên hệ", uid: "contact" },
    { label: "Thông tin làm việc", uid: "work" },
    { label: "Số lượng khách hàng", uid: "numberWork" },
    { label: "", uid: "actions" },
];

const Employee = () => {
    const [tableData, setTableData] = useState<TData>([]);
    const [search, setSearch] = useState<string>("");
    const [pagination, setPagination] = useState<TPagination>({
        pageIndex: 0,
        pageSize: 100,
    });
    const [totalRow, setTotalRow] = useState<number>(0);

    const [query, setQuery] = useState<TQuery>({
        idPosition: undefined,
        idDepartment: undefined,
        idOffice: undefined,
        trangThai: true,
    });
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [updateSelected, setUpdateSelected] =
        useState<TUpdateEmployeeRequest | null>(null);
    const [idDelete, setIdDelete] = useState<number | null>(null);

    const [isOpenUndeleteModal, setIsOpenUndeleteModal] =
        useState<boolean>(false);
    const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] =
        useState<boolean>(false);
    const [isOpenChangePermissionModal, setIsOpenChangePermissionModal] =
        useState<boolean>(false);

    const [positions, setPositions] = useState<TPositionDto[] | []>([]);
    const [departments, setDepartments] = useState<TDepartmentDto[] | []>([]);
    const [offices, setOffices] = useState<TOfficeDto[] | []>([]);

    const { user }: TAuthContextProps = useAuth();
    const debouncedSearch = useDebounced(search, 1000);

    const navigate = useNavigate();

    const {
        data: employeeRes,
        isFetching,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: [
            "employees",
            pagination.pageIndex,
            pagination.pageSize,
            debouncedSearch,
            query.idPosition,
            query.idDepartment,
            query.idOffice,
            query.trangThai,
        ],
        queryFn: () =>
            getEmployees({
                start: pagination.pageIndex * pagination.pageSize,
                size: pagination.pageSize,
                name: debouncedSearch,
                idPosition: query.idPosition as number,
                idDepartment: query.idDepartment as number,
                idOffice: query.idOffice as number,
                status: query.trangThai,
            }),
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            (user?.permission.includes("1048576") ||
                user?.permission.includes("5000")),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    const { data: positionRes } = useQuery({
        queryKey: "position",
        queryFn: getAllPositions,
        refetchOnWindowFocus: true,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    const { data: departmentsRes } = useQuery({
        queryKey: "departments",
        queryFn: getAllDepartments,
        refetchOnWindowFocus: true,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    const { data: officesRes } = useQuery({
        queryKey: "offices",
        queryFn: getAllOffices,
        refetchOnWindowFocus: true,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    const updateMutation = useMutation({
        mutationFn: updateEmployee,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
            }
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteEmployee,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
            }
        },
    });

    const undeleteMutation = useMutation({
        mutationFn: deleteEmployee,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
            }
        },
    });

    const changePasswordMutation = useMutation({
        mutationFn: updateEmployee,
    });

    const changePermissionMutation = useMutation({
        mutationFn: updateEmployee,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
            }
        },
    });

    /**
     * * Handle events
     */
    const openUpdateModal = useCallback(() => {
        setIsOpenUpdateModal(true);
    }, []);

    const closeUpdateModal = useCallback(() => {
        setIsOpenUpdateModal(false);
        setUpdateSelected(null);
    }, []);

    const handleUpdate = useCallback(
        async (data: TUpdateEmployeeRequest) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res: any = await updateMutation.mutateAsync(data);
            if (res.status) {
                closeUpdateModal();
            }
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

    const handleDeleteModal = useCallback(
        async (data: TDeleteEmployeeRequest) => {
            await deleteMutation.mutateAsync(data);
            closeDeleteModal();
        },
        [closeDeleteModal, deleteMutation]
    );

    const openUndeleteModal = useCallback(() => {
        setIsOpenUndeleteModal(true);
    }, []);

    const closeUndeleteModal = useCallback(() => {
        setIsOpenUndeleteModal(false);
        setIdDelete(null);
    }, []);

    const handleUndeleteModal = useCallback(
        async (data: TDeleteEmployeeRequest) => {
            await undeleteMutation.mutateAsync(data);
            closeUndeleteModal();
        },
        [closeUndeleteModal, undeleteMutation]
    );

    const openChangePasswordModal = useCallback(() => {
        setIsOpenChangePasswordModal(true);
    }, []);

    const closeChangePasswordModal = useCallback(() => {
        setIsOpenChangePasswordModal(false);
        setUpdateSelected(null);
    }, []);

    const handleChangePassword = useCallback(
        async (data: TUpdateEmployeeRequest) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res: any = await changePasswordMutation.mutateAsync(data);
            if (res.status) {
                closeChangePasswordModal();
            }
        },
        [closeChangePasswordModal, changePasswordMutation]
    );

    const openChangePermissionModal = useCallback(() => {
        setIsOpenChangePermissionModal(true);
    }, []);

    const closeChangePermissionModal = useCallback(() => {
        setIsOpenChangePermissionModal(false);
        setUpdateSelected(null);
    }, []);

    const handleChangePermission = useCallback(
        async (data: TUpdateEmployeeRequest) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res: any = await changePermissionMutation.mutateAsync(data);
            if (res.status) {
                closeChangePermissionModal();
            }
        },
        [closeChangePermissionModal, changePermissionMutation]
    );

    const renderCell = useCallback(
        (item: TEmployeeDto, columnKey: string | number) => {
            switch (columnKey) {
                case "code":
                    return (
                        <div className="w-16 space-y-2">
                            <div className="text-sm font-medium">
                                {item.employeeCode}
                            </div>
                        </div>
                    );

                case "base":
                    return (
                        <div className="w-64 flex gap-4 items-start">
                            <div className="w-16 aspect-square flex-shrink-0">
                                <img
                                    className="w-full h-full object-cover rounded-full"
                                    src={
                                        item.photoURL ||
                                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                    }
                                    alt={item.fullNameVI}
                                />
                            </div>
                            <div className="space-y-2 flex-1">
                                <div className="text-sm font-medium capitalize">
                                    {item.fullNameVI}
                                </div>
                                <div className="text-sm">{item.birthDay}</div>
                                <div className="text-sm first-letter:uppercase">
                                    {
                                        gender.find((i) => item.gender === i.id)
                                            ?.nameVI
                                    }
                                </div>
                            </div>
                        </div>
                    );
                case "address":
                    return (
                        <div className="w-48 space-y-2">
                            <div className="text-sm first-letter:uppercase">
                                {item.address}
                            </div>
                            <div className="text-sm first-letter:uppercase">
                                {item.homeTown}
                            </div>
                        </div>
                    );
                case "contact":
                    return (
                        <div className="w-32 space-y-2">
                            <div className="text-sm first-letter:uppercase">
                                {item.email}
                            </div>
                            <div className="text-sm first-letter:uppercase">
                                {item.phone}
                            </div>
                        </div>
                    );
                case "work":
                    return (
                        <div className="w-32 space-y-2">
                            <div className="text-sm first-letter:uppercase">
                                {item.position}
                            </div>
                            <div className="text-sm first-letter:uppercase">
                                {item.department}
                            </div>
                            <div className="text-sm first-letter:uppercase">
                                {item.office}
                            </div>
                        </div>
                    );
                case "numberWork":
                    return (
                        <div className="w-32 space-y-2">
                            <div className="text-sm">
                                {item.numberOfManagedCustomers}
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
                                {query.trangThai ? (
                                    <DropdownMenu>
                                        <DropdownItem
                                            onClick={() => {
                                                setUpdateSelected({
                                                    id: item.idAccount,
                                                    username: item.username,
                                                    password: "",
                                                    active: item.active,
                                                    permission: item.permission,
                                                    idEmployee: item.id,
                                                    idPosition: item.idPosition,
                                                    idDepartment:
                                                        item.idDepartment,
                                                    idOffice: item.idOffice,
                                                    employeeCode:
                                                        item.employeeCode,
                                                    fullNameVI: item.fullNameVI,
                                                    fullNameEN: item.fullNameEN,
                                                    birthDay: item.birthDay,
                                                    gender: item.gender,
                                                    homeTown: item.homeTown,
                                                    address: item.address,
                                                    email: item.email,
                                                    idNumber: item.idNumber,
                                                    placeForIDCard:
                                                        item.placeForIDCard,
                                                    dayForIDCard:
                                                        item.dayForIDCard,
                                                    photoURL: item.photoURL,
                                                    note: item.note,
                                                    numberOfManagedCustomers:
                                                        item.numberOfManagedCustomers,
                                                });
                                                openUpdateModal();
                                            }}
                                        >
                                            Chỉnh sửa
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => {
                                                setUpdateSelected({
                                                    id: item.idAccount,
                                                    username: item.username,
                                                    password: "",
                                                    active: item.active,
                                                    permission: item.permission,
                                                    idEmployee: item.id,
                                                    idPosition: item.idPosition,
                                                    idDepartment:
                                                        item.idDepartment,
                                                    idOffice: item.idOffice,
                                                    employeeCode:
                                                        item.employeeCode,
                                                    fullNameVI: item.fullNameVI,
                                                    fullNameEN: item.fullNameEN,
                                                    birthDay: item.birthDay,
                                                    gender: item.gender,
                                                    homeTown: item.homeTown,
                                                    address: item.address,
                                                    email: item.email,
                                                    idNumber: item.idNumber,
                                                    placeForIDCard:
                                                        item.placeForIDCard,
                                                    dayForIDCard:
                                                        item.dayForIDCard,
                                                    photoURL: item.photoURL,
                                                    note: item.note,
                                                    numberOfManagedCustomers:
                                                        item.numberOfManagedCustomers,
                                                });
                                                openChangePasswordModal();
                                            }}
                                        >
                                            Thay đổi mật khẩu
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => {
                                                setUpdateSelected({
                                                    id: item.idAccount,
                                                    username: item.username,
                                                    password: "",
                                                    active: item.active,
                                                    permission: item.permission,
                                                    idEmployee: item.id,
                                                    idPosition: item.idPosition,
                                                    idDepartment:
                                                        item.idDepartment,
                                                    idOffice: item.idOffice,
                                                    employeeCode:
                                                        item.employeeCode,
                                                    fullNameVI: item.fullNameVI,
                                                    fullNameEN: item.fullNameEN,
                                                    birthDay: item.birthDay,
                                                    gender: item.gender,
                                                    homeTown: item.homeTown,
                                                    address: item.address,
                                                    email: item.email,
                                                    idNumber: item.idNumber,
                                                    placeForIDCard:
                                                        item.placeForIDCard,
                                                    dayForIDCard:
                                                        item.dayForIDCard,
                                                    photoURL: item.photoURL,
                                                    note: item.note,
                                                    numberOfManagedCustomers:
                                                        item.numberOfManagedCustomers,
                                                });
                                                openChangePermissionModal();
                                            }}
                                        >
                                            Cập nhật quyền
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => {
                                                setIdDelete(item.id);
                                                openDeleteModal();
                                            }}
                                        >
                                            Xoá
                                        </DropdownItem>
                                    </DropdownMenu>
                                ) : (
                                    <DropdownMenu>
                                        <DropdownItem
                                            onClick={() => {
                                                setIdDelete(item.id);
                                                openUndeleteModal();
                                            }}
                                        >
                                            Huỷ xoá
                                        </DropdownItem>
                                    </DropdownMenu>
                                )}
                            </Dropdown>
                        </div>
                    );
                default:
                    return <div>{item[columnKey as keyof TEmployeeDto]}</div>;
            }
        },
        [
            openChangePasswordModal,
            openChangePermissionModal,
            openDeleteModal,
            openUndeleteModal,
            openUpdateModal,
            query.trangThai,
        ]
    );

    useEffect(() => {
        if (employeeRes && employeeRes.status) {
            setTableData(employeeRes.data.data);
            setTotalRow(employeeRes.data.totalRow);
        }
    }, [employeeRes]);

    useEffect(() => {
        if (positionRes && positionRes.status) {
            setPositions(positionRes.data as unknown as TPositionDto[]);
        }
    }, [positionRes]);

    useEffect(() => {
        if (departmentsRes && departmentsRes.status) {
            setDepartments(departmentsRes.data as unknown as TDepartmentDto[]);
        }
    }, [departmentsRes]);

    useEffect(() => {
        if (officesRes && officesRes.status) {
            setOffices(officesRes.data as unknown as TOfficeDto[]);
        }
    }, [officesRes]);
    useEffect(() => {
        console.log(query);
    }, [query]);

    return (
        <Fragment>
            <div className="flex justify-between items-center p-4 bg-white rounded-lg mt-4">
                <h2 className="title">quản lý nhân viên</h2>
                <div className="flex gap-2 items-center">
                    <Button
                        className="inline-block first-letter:uppercase text-white"
                        color="success"
                        onClick={() => navigate("/employee/new")}
                    >
                        tạo mới
                    </Button>
                </div>
            </div>
            <div className="p-4 bg-white flex justify-between items-center min-h-[4.375rem] rounded-lg">
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="w-64">
                        <Input
                            label="Tìm kiếm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-48">
                        <Select
                            label="Chức vụ"
                            options={positions}
                            option={{ label: "nameVI", key: "id" }}
                            disallowEmptySelection
                            value={query.idPosition}
                            onChange={(e) => {
                                setQuery((prev) => ({
                                    ...prev,
                                    idPosition:
                                        e.target.value !== ""
                                            ? parseInt(e.target.value)
                                            : undefined,
                                }));
                            }}
                        />
                    </div>
                    <div className="w-48">
                        <Select
                            label="Phòng ban"
                            options={departments}
                            option={{ label: "nameVI", key: "id" }}
                            disallowEmptySelection
                            value={query.idDepartment}
                            onChange={(e) => {
                                setQuery((prev) => ({
                                    ...prev,
                                    idDepartment:
                                        e.target.value !== ""
                                            ? parseInt(e.target.value)
                                            : undefined,
                                }));
                            }}
                        />
                    </div>
                    <div className="w-48">
                        <Select
                            label="Văn phòng"
                            options={offices}
                            option={{ label: "nameVI", key: "id" }}
                            disallowEmptySelection
                            value={query.idOffice}
                            onChange={(e) => {
                                setQuery((prev) => ({
                                    ...prev,
                                    idOffice:
                                        e.target.value !== ""
                                            ? parseInt(e.target.value)
                                            : undefined,
                                }));
                            }}
                        />
                    </div>
                    <div className="w-48">
                        <Select
                            label="Trạng thái"
                            options={[
                                { label: "Chưa xoá", value: "true" },
                                { label: "Đã xoá", value: "false" },
                            ]}
                            option={{ label: "label", key: "value" }}
                            disallowEmptySelection
                            value={query.trangThai.toString()}
                            onChange={(e) => {
                                console.log(e.target.value);
                                setQuery((prev) => ({
                                    ...prev,
                                    trangThai:
                                        e.target.value === "false"
                                            ? false
                                            : true,
                                }));
                                setPagination((prev) => ({
                                    ...prev,
                                    pageIndex: 0,
                                }));
                            }}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
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
                aria-label="Employee data table"
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
        </Fragment>
    );
};

export default Employee;
