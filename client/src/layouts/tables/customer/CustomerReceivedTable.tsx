import {
    Fragment,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Selection,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";

import {
    deliveryCustomer,
    getEmployeesGroup,
    returnCustomer,
    undeliveryCustomer,
} from "@/api";
import { AutoComplete, Pagination } from "@/components";
import { colorStatusCustomer, statusCustomer } from "@/constants";
import { useAuth, useNotification } from "@/contexts";
import {
    DeliveryCustomerModal,
    ReturnCustomerModal,
    UndeliveryCustomerModal,
} from "@/modals";
import {
    TAuthContextProps,
    TCustomerDto,
    TDeliveryCustomerRequest,
    TEmployeeJobDto,
    TNotificationProps,
    TReturnCustomerRequest,
    TUndeliveryCustomerRequest,
} from "@/types";
import { notification } from "@/utilities";

import { TCustomerTableProps } from "./types";

const columns = [
    { label: "trạng thái", uid: "enumDelivery" },
    { label: "nhân viên", uid: "employee" },
    { label: "mã", uid: "code" },
    { label: "khách hàng", uid: "customer" },
    { label: "thông tin liên hệ", uid: "information" },
    { label: "người giao", uid: "assigner" },
    { label: "thông tin giao việc", uid: "jobDetail" },
    { label: "ghi chú", uid: "note" },
    { label: "", uid: "actions" },
];

const CustomerReceivedTable = ({
    data,
    pagination,
    loading,
    refetch,
    page,
}: TCustomerTableProps) => {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [employees, setEmployees] = useState<TEmployeeJobDto[] | []>([]);
    const [employeeSelected, setEmployeeSelected] = useState<
        TEmployeeJobDto | undefined
    >();

    const selectedData = useMemo(() => {
        if (selectedKeys === "all") {
            return data;
        } else {
            // Get id based on all selected keys
            const selectedIdArray = Array.from(selectedKeys);
            // Get data from id array selected
            const selectedArray = data.filter((item) =>
                selectedIdArray.includes(item.id.toString())
            );
            return selectedArray;
        }
    }, [data, selectedKeys]);

    const [isOpenDeliveryModal, setIsOpenDeliveryModal] =
        useState<boolean>(false);
    const [isOpenUndeliveryModal, setIsOpenUndeliveryModal] =
        useState<boolean>(false);
    const [isOpenReturnModal, setIsOpenReturnModal] = useState<boolean>(false);

    const jobAssignmentInfoRef = useRef<HTMLInputElement | null>(null);

    const { user }: TAuthContextProps = useAuth();
    const { connection }: TNotificationProps = useNotification();

    const navigate = useNavigate();

    const { data: employeeRes } = useQuery({
        queryKey: ["employees", user?.id],
        queryFn: getEmployeesGroup,
        cacheTime: Infinity,
        staleTime: Infinity,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            (user?.permission.includes("1048576") ||
                user?.permission.includes("7000") ||
                user?.permission.includes("7080")),
    });

    const deliveryMutation = useMutation({
        mutationFn: deliveryCustomer,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
                // Unselected row
                setSelectedKeys(new Set([]));
            }
        },
    });

    const undeliveryMutation = useMutation({
        mutationFn: undeliveryCustomer,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
                // Unselected row
                setSelectedKeys(new Set([]));
            }
        },
    });

    const returnMutation = useMutation({
        mutationFn: returnCustomer,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
                // Unselected row
                setSelectedKeys(new Set([]));
            }
        },
    });

    /**
     * * Handle events
     */
    const openDeliveryModal = useCallback(() => {
        setIsOpenDeliveryModal(true);
    }, []);

    const closeDeliveryModal = useCallback(() => {
        setIsOpenDeliveryModal(false);
    }, []);

    const handleDelivery = useCallback(
        async (
            payload: TDeliveryCustomerRequest,
            receiverName: string,
            receiverFullName: string
        ) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result: any = await deliveryMutation.mutateAsync(payload);

            if (result.status) {
                // Call api for notification
                const jobData = {
                    senderName: user?.username.toLowerCase(),
                    senderFullName: user?.fullNameVI ?? "",
                    receiverName,
                    receiverFullName,
                    numberJob: payload.idCustomers.length,
                    idNotification: result.data.idNotification,
                };

                await connection.invoke("NotifyJobAssignment", jobData);
            }

            closeDeliveryModal();
        },
        [closeDeliveryModal, deliveryMutation, connection, user]
    );

    const openUndeliveryModal = useCallback(() => {
        setIsOpenUndeliveryModal(true);
    }, []);

    const closeUndeliveryModal = useCallback(() => {
        setIsOpenUndeliveryModal(false);
    }, []);

    const handleUndelivery = useCallback(
        async (data: TUndeliveryCustomerRequest) => {
            await undeliveryMutation.mutateAsync(data);
            closeUndeliveryModal();
        },
        [closeUndeliveryModal, undeliveryMutation]
    );

    const openReturnModal = useCallback(() => {
        setIsOpenReturnModal(true);
    }, []);

    const closeReturnModal = useCallback(() => {
        setIsOpenReturnModal(false);
    }, []);

    const handleReturn = useCallback(
        async (payload: TReturnCustomerRequest, receiverName: string) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result: any = await returnMutation.mutateAsync(payload);

            if (result.status) {
                // Call api for notification
                const jobData = {
                    senderName: user?.username.toLowerCase(),
                    senderFullName: user?.fullNameVI.toLowerCase(),
                    receiverName,
                    numberJob: payload.idCustomers.length,
                    idNotification: result.data.idNotification,
                };

                await connection.invoke("NotifyReturnJob", jobData);
            }

            closeReturnModal();
        },
        [closeReturnModal, returnMutation, connection, user]
    );

    const renderCell = useCallback(
        (item: TCustomerDto, columnKey: string | number) => {
            switch (columnKey) {
                case "enumDelivery":
                    return (
                        <div
                            className={`w-16 rounded-lg font-medium text-sm first-letter:uppercase ${
                                colorStatusCustomer[item.enumDelivery]
                            }`}
                        >
                            {statusCustomer[item.enumDelivery]}
                        </div>
                    );
                case "employee":
                    return (
                        <div className={`w-32`}>
                            <div className="text-sm font-medium capitalize text-gray-950">
                                {item.employee}
                            </div>
                        </div>
                    );
                case "code":
                    return (
                        <div className={`w-32 space-y-2`}>
                            <div
                                className="text-sm font-medium first-letter:uppercase"
                                role="sub-title"
                            >
                                Mã: {item.code}
                            </div>
                            <div className="text-xs first-letter:uppercase">
                                Mã số thuế: {item.taxCode}
                            </div>
                        </div>
                    );
                case "customer":
                    return (
                        <div className={`w-80 space-y-2`}>
                            <div
                                className="text-sm font-medium first-letter:uppercase"
                                role="sub-title"
                            >
                                {item.nameVI}
                            </div>
                            <div className="text-xs first-letter:uppercase">
                                {item.addressVI}
                            </div>
                            <div className="text-xs first-letter:uppercase">
                                {item.typeOfBusiness}
                            </div>
                        </div>
                    );
                case "information":
                    return (
                        <div className="w-44 space-y-2">
                            <div className="text-xs first-letter:uppercase">
                                {item.phone}
                            </div>
                            <div className="text-xs first-letter:uppercase">
                                {item.email}
                            </div>
                            <div className="text-xs first-letter:uppercase">
                                {item.website}
                            </div>
                        </div>
                    );
                case "assigner":
                    return (
                        <div className="w-28 space-y-2">
                            <div
                                className="text-sm capitalize font-medium"
                                role="sub-title"
                            >
                                {item.jobAssigner}
                            </div>
                            <div className="text-xs capitalize">
                                {item.deliveryDay}
                            </div>
                        </div>
                    );
                case "jobDetail":
                    return (
                        <div className="w-32">
                            <div className="text-sm capitalize">
                                {item.jobAssignmentInfo}
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
                                        onClick={() =>
                                            navigate(`/customer/${item.id}`)
                                        }
                                    >
                                        View
                                    </DropdownItem>
                                    <DropdownItem>Edit</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    );
                default:
                    return <div>{item[columnKey as keyof TCustomerDto]}</div>;
            }
        },
        [navigate]
    );

    useEffect(() => {
        if (employeeRes && employeeRes.status) {
            setEmployees(employeeRes.data as unknown as TEmployeeJobDto[]);
        }
    }, [employeeRes]);

    return (
        <Fragment>
            <div className="bg-white rounded-lg">
                {/* Header table */}
                <div className="p-4 flex items-center flex-wrap gap-3 min-h-[4.375rem]">
                    {selectedData.length > 0 && (
                        <>
                            {(user?.permission.includes("1048576") ||
                                user?.permission.includes("7000") ||
                                user?.permission.includes("7080")) && (
                                <Button
                                    color="primary"
                                    onClick={openDeliveryModal}
                                >
                                    Giao khách
                                </Button>
                            )}
                            {(user?.permission.includes("1048576") ||
                                user?.permission.includes("7000") ||
                                user?.permission.includes("7080")) && (
                                <Button
                                    color="danger"
                                    onClick={openUndeliveryModal}
                                >
                                    Huỷ giao khách
                                </Button>
                            )}
                            {selectedData.every(
                                (item) => item.idEmployee === user?.idEmployee
                            ) && (
                                <Button
                                    color="warning"
                                    className="text-white"
                                    onClick={openReturnModal}
                                >
                                    Trả khách
                                </Button>
                            )}
                        </>
                    )}
                </div>
                {/* Display data table */}
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
                    selectionBehavior="toggle"
                    selectedKeys={selectedKeys}
                    selectionMode="multiple"
                    onSelectionChange={setSelectedKeys}
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
                        items={data}
                        isLoading={loading}
                        loadingState={loading ? "loading" : "idle"}
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
                        {`${page.pageIndex * page.pageSize + 1} - ${
                            page.pageIndex * page.pageSize + data.length
                        } of ${page.totalRow}`}
                    </div>
                    <Pagination {...pagination} />
                </div>
            </div>
            {(user?.permission.includes("1048576") ||
                user?.permission.includes("7000") ||
                user?.permission.includes("7080")) && (
                <DeliveryCustomerModal
                    isOpen={isOpenDeliveryModal}
                    onClose={closeDeliveryModal}
                    onSubmit={async () => {
                        if (!employeeSelected) {
                            notification(
                                false,
                                "Bạn cần chọn nhân viên quản lý!"
                            );
                            return;
                        }

                        const selectedIds: number[] = selectedData.map(
                            (item) => item.id
                        );

                        const payload: TDeliveryCustomerRequest = {
                            idAccountEmployee: employeeSelected.id,
                            idEmployee: employeeSelected.idEmployee,
                            idUserAssign: user.id,
                            idCustomers: selectedIds,
                            jobAssignmentInfo:
                                jobAssignmentInfoRef.current?.value ?? "",
                        };

                        await handleDelivery(
                            payload,
                            employeeSelected.username,
                            employeeSelected.fullNameVI
                        );
                    }}
                    loading={deliveryMutation.isLoading}
                >
                    <AutoComplete
                        label="Nhân viên"
                        options={employees}
                        option={{ key: "id", label: "fullNameVI" }}
                        value={employeeSelected?.id.toString()}
                        onSelectionChange={(val) => {
                            const empSelected = employees.find(
                                (item) => item.id.toString() === val
                            );
                            setEmployeeSelected(empSelected);
                        }}
                    />
                    <Input
                        label="Thông tin giao việc"
                        ref={jobAssignmentInfoRef}
                    />
                </DeliveryCustomerModal>
            )}
            {(user?.permission.includes("1048576") ||
                user?.permission.includes("7000") ||
                user?.permission.includes("7080")) && (
                <UndeliveryCustomerModal
                    isOpen={isOpenUndeliveryModal}
                    onClose={closeUndeliveryModal}
                    onSubmit={async () => {
                        const selectedIds: number[] = selectedData.map(
                            (item) => item.id
                        );
                        await handleUndelivery({ idCustomers: selectedIds });
                    }}
                    loading={undeliveryMutation.isLoading}
                />
            )}
            {user?.username.toLowerCase() !== "admin" && (
                <ReturnCustomerModal
                    isOpen={isOpenReturnModal}
                    onClose={closeReturnModal}
                    onSubmit={async () => {
                        const selectedIds: number[] = selectedData.map(
                            (item) => item.id
                        );
                        await handleReturn(
                            {
                                idCustomers: selectedIds,
                                idUser: user?.id as number,
                            },
                            "admin"
                        );
                    }}
                    loading={returnMutation.isLoading}
                />
            )}
        </Fragment>
    );
};

export default CustomerReceivedTable;
