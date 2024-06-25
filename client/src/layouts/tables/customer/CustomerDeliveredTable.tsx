import { Fragment, useCallback, useMemo, useRef, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Spinner,
    Dropdown,
    DropdownTrigger,
    Button,
    DropdownMenu,
    DropdownItem,
    Selection,
    Input,
} from "@nextui-org/react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";

import { acceptCustomer, denyCustomer } from "@/api";
import { Pagination } from "@/components";
import { colorStatusCustomer, statusCustomer } from "@/constants";
import { useAuth, useNotification } from "@/contexts";
import { AcceptCustomerModal, DenyCustomerModal } from "@/modals";
import {
    TAcceptCustomerRequest,
    TAuthContextProps,
    TCustomerDto,
    TDenyCustomerRequest,
    TNotificationProps,
} from "@/types";

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

const CustomerDeliveredTable = ({
    data,
    pagination,
    loading,
    refetch,
    page,
}: TCustomerTableProps) => {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

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

    const [isOpenAcceptModal, setIsOpenAcceptModal] = useState<boolean>(false);
    const [isOpenDenyModal, setIsOpenDenyModal] = useState<boolean>(false);

    const denyRef = useRef<HTMLInputElement | null>(null);

    const { user }: TAuthContextProps = useAuth();
    const { connection }: TNotificationProps = useNotification();

    const navigate = useNavigate();

    const acceptMutation = useMutation({
        mutationFn: acceptCustomer,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
                // Unselected row
                setSelectedKeys(new Set([]));
            }
        },
    });

    const denyMutation = useMutation({
        mutationFn: denyCustomer,
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
    const openAcceptModal = useCallback(() => {
        setIsOpenAcceptModal(true);
    }, []);

    const closeAcceptModal = useCallback(() => {
        setIsOpenAcceptModal(false);
    }, []);

    const handleAccept = useCallback(
        async (selectedIds: number[]) => {
            const payload: TAcceptCustomerRequest = {
                idUser: user?.id as number,
                idEmployee: user?.idEmployee as number,
                idCustomers: selectedIds,
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result: any = await acceptMutation.mutateAsync(payload);
            if (result.status) {
                // Call api for notification.
                const jobData = {
                    idNotification: result.data.idNotification,
                };

                await connection.invoke("NotifyJobAssignment", jobData);
            }

            closeAcceptModal();
        },
        [acceptMutation, closeAcceptModal, connection, user]
    );

    const openDenyModal = useCallback(() => {
        setIsOpenDenyModal(true);
    }, []);

    const closeDenyModal = useCallback(() => {
        setIsOpenDenyModal(false);
    }, []);

    const handleDeny = useCallback(
        async (selectedIds: number[]) => {
            const payload: TDenyCustomerRequest = {
                idUser: user?.id as number,
                idEmployee: user?.idEmployee as number,
                idCustomers: selectedIds,
                reasonForDeny: denyRef.current?.value as string,
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result: any = await denyMutation.mutateAsync(payload);
            if (result.status) {
                // Call api for notification.
                const jobData = {
                    idNotification: result.data.idNotification,
                };

                await connection.invoke("NotifyJobAssignment", jobData);
            }

            closeDenyModal();
        },
        [closeDenyModal, connection, denyMutation, user]
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

    return (
        <Fragment>
            <div className="bg-white rounded-lg">
                {/* Header table */}
                <div className="p-4 flex items-center flex-wrap gap-3 min-h-[4.375rem]">
                    {selectedData.length > 0 && (
                        <>
                            <Button color="danger" onClick={openDenyModal}>
                                Từ chối
                            </Button>
                            <Button
                                className="text-white"
                                color="success"
                                onClick={openAcceptModal}
                            >
                                Nhận
                            </Button>
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
            <AcceptCustomerModal
                isOpen={isOpenAcceptModal}
                onClose={closeAcceptModal}
                onSubmit={async () => {
                    const selectedIds: number[] = selectedData.map(
                        (item) => item.id
                    );

                    await handleAccept(selectedIds);
                }}
                loading={acceptMutation.isLoading}
            />
            <DenyCustomerModal
                isOpen={isOpenDenyModal}
                onClose={closeDenyModal}
                onSubmit={async () => {
                    const selectedIds: number[] = selectedData.map(
                        (item) => item.id
                    );
                    await handleDeny(selectedIds);
                }}
                loading={denyMutation.isLoading}
            >
                <Input label="Lý do từ chối" ref={denyRef} />
            </DenyCustomerModal>
        </Fragment>
    );
};

export default CustomerDeliveredTable;
