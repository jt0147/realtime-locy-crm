import { useEffect, useState } from "react";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
} from "@nextui-org/react";
import { isEqual } from "lodash";

import { Select } from "@/components";
import {
    TCustomerContactDto,
    TOperationalDto,
    TUpdateCustomerOperationalRequest,
} from "@/types";
import { notification } from "@/utilities";

import { TUpdateModalProps } from "../../types";

const UpdateCustomerOperationalModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "cập nhật tác nghiệp",
    size = "4xl",
    loading,
    item,
    contacts,
    operationals,
}: TUpdateModalProps<TUpdateCustomerOperationalRequest> & {
    contacts: TCustomerContactDto[] | [];
    operationals: TOperationalDto[] | [];
}) => {
    const [data, setData] = useState<TUpdateCustomerOperationalRequest | null>(
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
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <Select
                                                label="Loại tác nghiệp"
                                                options={operationals}
                                                option={{
                                                    label: "name",
                                                    key: "id",
                                                }}
                                                value={
                                                    data.idLoaiTacNghiep
                                                        ? data.idLoaiTacNghiep.toString()
                                                        : undefined
                                                }
                                                onChange={(e) => {
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  idLoaiTacNghiep:
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
                                            <Select
                                                label="Người liên hệ"
                                                options={contacts}
                                                option={{
                                                    label: "nameVI",
                                                    key: "id",
                                                }}
                                                value={
                                                    data.idNguoiLienHe
                                                        ? data.idNguoiLienHe.toString()
                                                        : undefined
                                                }
                                                onChange={(e) => {
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  idNguoiLienHe:
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
                                                type="date"
                                                label="Thời gian thực hiện"
                                                value={data.thoiGianThucHien}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  thoiGianThucHien:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                        </div>
                                        <Textarea
                                            label="Nội dung"
                                            value={data.noiDung}
                                            onChange={(e) =>
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              noiDung:
                                                                  e.target
                                                                      .value,
                                                          }
                                                        : null
                                                )
                                            }
                                        />
                                        <Textarea
                                            label="Khách hàng phản hồi"
                                            value={data.khachHangPhanHoi}
                                            onChange={(e) =>
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              khachHangPhanHoi:
                                                                  e.target
                                                                      .value,
                                                          }
                                                        : null
                                                )
                                            }
                                        />
                                        <div className="grid gap-4 md:grid-cols-3">
                                            <Input
                                                type="date"
                                                label="Ngày phản hồi"
                                                value={data.ngayPhanHoi}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  ngayPhanHoi:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                        </div>
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

export default UpdateCustomerOperationalModal;
