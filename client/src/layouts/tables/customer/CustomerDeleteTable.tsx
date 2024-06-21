import { Fragment, useCallback, useState } from "react";
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
} from "@nextui-org/react";
import { useMutation } from "react-query";
import { HiDotsVertical } from "react-icons/hi";

import { deleteCustomer, removeCustomer } from "@/api";
import { Pagination } from "@/components";
import { useAuth } from "@/contexts";
import { RemoveCustomerModal, UndeleteCustomerModal } from "@/modals";
import {
    TAuthContextProps,
    TCustomerDto,
    TDeleteCustomerRequest,
} from "@/types";

import { TCustomerTableProps } from "./types";

const columns = [
    { label: "mã", uid: "code" },
    { label: "khách hàng", uid: "customer" },
    { label: "thông tin liên hệ", uid: "information" },
    { label: "địa chỉ", uid: "address" },
    { label: "người xoá", uid: "deletedAt" },
    { label: "lý do xoá", uid: "deleteInfo" },
    { label: "", uid: "actions" },
];

const CustomerDeleteTable = ({
    data,
    pagination,
    loading,
    refetch,
    page,
}: TCustomerTableProps) => {
    const [isOpenUndeleteModal, setIsOpenUndeleteModal] =
        useState<boolean>(false);
    const [isOpenRemoveModal, setIsOpenRemoveModal] = useState<boolean>(false);

    const [idDelete, setIdDelete] = useState<number | null>(null);

    const { user }: TAuthContextProps = useAuth();

    const undeleteMutation = useMutation({
        mutationFn: deleteCustomer,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
                setIdDelete(null);
            }
        },
    });

    const removeMutation = useMutation({
        mutationFn: removeCustomer,
        onSuccess: (data) => {
            if (data.status) {
                refetch();
            }
        },
    });
    /**
     * * Handle events
     */
    const openUndeleteModal = useCallback(() => {
        setIsOpenUndeleteModal(true);
    }, []);

    const closeUndeleteModal = useCallback(() => {
        setIsOpenUndeleteModal(false);
    }, []);

    const handleUndelete = useCallback(
        async (data: TDeleteCustomerRequest) => {
            await undeleteMutation.mutateAsync(data);
            closeUndeleteModal();
        },
        [closeUndeleteModal, undeleteMutation]
    );

    const openRemoveModal = useCallback(() => {
        setIsOpenRemoveModal(true);
    }, []);

    const closeRemoveModal = useCallback(() => {
        setIsOpenRemoveModal(false);
    }, []);

    const handleRemove = useCallback(
        async (id: number) => {
            await removeMutation.mutateAsync(id);
            closeRemoveModal();
        },
        [closeRemoveModal, removeMutation]
    );

    const renderCell = useCallback(
        (item: TCustomerDto, columnKey: string | number) => {
            switch (columnKey) {
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
                case "address":
                    return (
                        <div className="w-28 space-y-2">
                            <div
                                className="text-sm capitalize font-medium"
                                role="sub-title"
                            >
                                {item.country}
                            </div>
                            <div className="text-xs capitalize">
                                {item.city}
                            </div>
                        </div>
                    );
                case "deletedAt":
                    return (
                        <div className="w-32 space-y-2">
                            <div
                                className="text-sm capitalize font-medium"
                                role="sub-title"
                            >
                                {item.userDelete}
                            </div>
                            <div className="text-xs capitalize">
                                {item.dateDelete}
                            </div>
                        </div>
                    );
                case "deleteInfo":
                    return (
                        <div className="w-32">
                            <div className="text-sm capitalize">
                                {item.reasonForDelete}
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
                                            setIdDelete(item.id);
                                            openUndeleteModal();
                                        }}
                                    >
                                        Huỷ xoá
                                    </DropdownItem>
                                    <DropdownItem
                                        onClick={() => {
                                            setIdDelete(item.id);
                                            openRemoveModal();
                                        }}
                                    >
                                        Xoá
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    );
                default:
                    return <div>{item[columnKey as keyof TCustomerDto]}</div>;
            }
        },
        [openRemoveModal, openUndeleteModal]
    );

    return (
        <Fragment>
            <div className="bg-white rounded-lg">
                {/* Display data table */}
                <Table
                    isHeaderSticky
                    aria-label="Customer data table"
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
                user?.permission.includes("7020")) && (
                <RemoveCustomerModal
                    isOpen={isOpenRemoveModal}
                    onClose={closeRemoveModal}
                    onSubmit={async () => {
                        await handleRemove(idDelete as number);
                    }}
                    loading={removeMutation.isLoading}
                />
            )}
            {(user?.permission.includes("1048576") ||
                user?.permission.includes("7000") ||
                user?.permission.includes("7020")) && (
                <UndeleteCustomerModal
                    isOpen={isOpenUndeleteModal}
                    onClose={closeUndeleteModal}
                    onSubmit={async () => {
                        await handleUndelete({
                            id: idDelete as number,
                            flagDel: false,
                            idUserDelete: null,
                            reasonForDelete: "",
                        });
                    }}
                    loading={undeleteMutation.isLoading}
                />
            )}
        </Fragment>
    );
};

export default CustomerDeleteTable;
