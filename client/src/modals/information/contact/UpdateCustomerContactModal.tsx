import { useEffect, useState } from "react";
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
import { isEqual } from "lodash";

import { Select } from "@/components";
import { gender } from "@/constants";
import { TUpdateCustomerContactRequest } from "@/types";
import { notification } from "@/utilities";

import { TUpdateModalProps } from "../../types";

const UpdateCustomerContactModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "cập nhật người liên hệ",
    size = "5xl",
    loading,
    item,
}: TUpdateModalProps<TUpdateCustomerContactRequest>) => {
    const [data, setData] = useState<TUpdateCustomerContactRequest | null>(
        null
    );

    /**
     * * Handle events
     */
    const handleSubmit = async () => {
        if (isEqual(data, item)) {
            notification(false, "Thông tin không thay đổi");
            return;
        }

        if (data) {
            await onSubmit(data);
        }
    };

    useEffect(() => {
        setData(item);
    }, [item]);

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
                            {data && (
                                <div className="grid gap-4">
                                    <div className="grid gap-4">
                                        <div className="grid md:grid-cols-5 gap-4">
                                            <div className="col-span-2">
                                                <Input
                                                    label="Họ và tên (VI)"
                                                    required={true}
                                                    value={data.nameVI}
                                                    onChange={(e) =>
                                                        setData((prev) =>
                                                            prev
                                                                ? {
                                                                      ...prev,
                                                                      nameVI: e
                                                                          .target
                                                                          .value,
                                                                  }
                                                                : null
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <Input
                                                    label="Họ và tên (EN)"
                                                    value={data.nameEN}
                                                    onChange={(e) =>
                                                        setData((prev) =>
                                                            prev
                                                                ? {
                                                                      ...prev,
                                                                      nameEN: e
                                                                          .target
                                                                          .value,
                                                                  }
                                                                : null
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="flex items-center gap-2 leading-none cursor-pointer">
                                                <Switch
                                                    defaultSelected={
                                                        data.flagDaiDien
                                                    }
                                                    onValueChange={(
                                                        isSelected
                                                    ) =>
                                                        setData((prev) =>
                                                            prev
                                                                ? {
                                                                      ...prev,
                                                                      flagDaiDien:
                                                                          isSelected,
                                                                  }
                                                                : null
                                                        )
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
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  addressVI:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                            <Textarea
                                                label="Địa chỉ (EN)"
                                                value={data.addressEN}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  addressEN:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
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
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  enumGioiTinh:
                                                                      e.target
                                                                          .value !==
                                                                      ""
                                                                          ? parseInt(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                          : undefined,
                                                              }
                                                            : null
                                                    );
                                                }}
                                            />
                                            <Input
                                                label="Số điện thoại"
                                                value={data.handPhone}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  handPhone:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                            <Input
                                                label="Chức vụ"
                                                value={data.chucVu}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  chucVu: e
                                                                      .target
                                                                      .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-3">
                                            <Input
                                                label="Số điện thoại bàn"
                                                value={data.homePhone}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  homePhone:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                            <Input
                                                label="Thư điện tử"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  email: e
                                                                      .target
                                                                      .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                            <Input
                                                label="Chat"
                                                value={data.chat}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  chat: e.target
                                                                      .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-3">
                                            <Input
                                                label="Số tài khoản ngân hàng"
                                                value={data.bankAccountNumber}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  bankAccountNumber:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                            <Input
                                                label="Tên ngân hàng"
                                                value={data.bankBranchName}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  bankBranchName:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                            <Input
                                                label="Địa chỉ ngân hàng"
                                                value={data.bankAddress}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  bankAddress:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                        </div>
                                        <Textarea
                                            label="Ghi chú"
                                            value={data.note}
                                            onChange={(e) =>
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              note: e.target
                                                                  .value,
                                                          }
                                                        : null
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            )}
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
                                onPress={handleSubmit}
                                isLoading={loading}
                                disabled={loading}
                            >
                                {loading ? "Đang cập nhật..." : "Cập nhật"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default UpdateCustomerContactModal;
