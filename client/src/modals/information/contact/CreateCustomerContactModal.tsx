import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Switch,
    Textarea,
} from "@nextui-org/react";

import { Select } from "@/components";
import { gender } from "@/constants";
import { TCreateCustomerContactRequest } from "@/types";

import { TCreateModalProps } from "../../types";

const CreateCustomerContactModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "tạo người liên hệ",
    size = "5xl",
    loading,
    data,
    setData,
}: TCreateModalProps<TCreateCustomerContactRequest>) => {
    return (
        <Modal size={size} isOpen={isOpen} onClose={onCloseProp}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <div className="first-letter:uppercase font-semibold text-lg">
                                {title}
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <div className="grid gap-4">
                                <div className="grid gap-4">
                                    <div className="grid md:grid-cols-5 gap-4">
                                        <div className="col-span-2">
                                            <Input
                                                label="Họ và tên (VI)"
                                                required={true}
                                                value={data.nameVI}
                                                onChange={(e) =>
                                                    setData((prev) => ({
                                                        ...prev,
                                                        nameVI: e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <Input
                                                label="Họ và tên (EN)"
                                                value={data.nameEN}
                                                onChange={(e) =>
                                                    setData((prev) => ({
                                                        ...prev,
                                                        nameEN: e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 leading-none cursor-pointer">
                                            <Switch
                                                defaultSelected={
                                                    data.flagDaiDien
                                                }
                                                onValueChange={(isSelected) =>
                                                    setData((prev) => ({
                                                        ...prev,
                                                        flagDaiDien: isSelected,
                                                    }))
                                                }
                                                size="sm"
                                            >
                                                <p className="text-sm first-letter:uppercase">
                                                    người đại diện
                                                </p>
                                            </Switch>
                                        </div>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <Textarea
                                            label="Địa chỉ (VI)"
                                            value={data.addressVI}
                                            onChange={(e) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    addressVI: e.target.value,
                                                }))
                                            }
                                        />
                                        <Textarea
                                            label="Địa chỉ (EN)"
                                            value={data.addressEN}
                                            onChange={(e) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    addressEN: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <Select
                                            label="Giới tính"
                                            options={gender}
                                            option={{
                                                label: "nameVI",
                                                key: "id",
                                            }}
                                            value={
                                                data.enumGioiTinh
                                                    ? data.enumGioiTinh.toString()
                                                    : undefined
                                            }
                                            onChange={(e) => {
                                                setData((prev) => ({
                                                    ...prev,
                                                    enumGioiTinh:
                                                        e.target.value !== ""
                                                            ? parseInt(
                                                                  e.target.value
                                                              )
                                                            : undefined,
                                                }));
                                            }}
                                        />
                                        <Input
                                            label="Số điện thoại"
                                            value={data.handPhone}
                                            onChange={(e) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    handPhone: e.target.value,
                                                }))
                                            }
                                        />
                                        <Input
                                            label="Chức vụ"
                                            value={data.chucVu}
                                            onChange={(e) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    chucVu: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <Input
                                            label="Số điện thoại bàn"
                                            value={data.homePhone}
                                            onChange={(e) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    homePhone: e.target.value,
                                                }))
                                            }
                                        />
                                        <Input
                                            label="Thư điện tử"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    email: e.target.value,
                                                }))
                                            }
                                        />
                                        <Input
                                            label="Chat"
                                            value={data.chat}
                                            onChange={(e) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    chat: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <Input
                                            label="Số tài khoản ngân hàng"
                                            value={data.bankAccountNumber}
                                            onChange={(e) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    bankAccountNumber:
                                                        e.target.value,
                                                }))
                                            }
                                        />
                                        <Input
                                            label="Tên ngân hàng"
                                            value={data.bankBranchName}
                                            onChange={(e) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    bankBranchName:
                                                        e.target.value,
                                                }))
                                            }
                                        />
                                        <Input
                                            label="Địa chỉ ngân hàng"
                                            value={data.bankAddress}
                                            onChange={(e) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    bankAddress: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                    <Textarea
                                        label="Ghi chú"
                                        value={data.note}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                note: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onClick={onClose}
                            >
                                Huỷ
                            </Button>
                            <Button
                                className="text-white"
                                color="success"
                                onPress={onSubmit}
                                isLoading={loading}
                                disabled={loading}
                            >
                                {loading ? "Đang tạo..." : "Tạo"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default CreateCustomerContactModal;
