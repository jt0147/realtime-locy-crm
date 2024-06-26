import { useEffect, useState } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { isEqual } from "lodash";

import { Select } from "@/components";
import { TTypeOfCustomerDto, TUpdateCustomerClassifyRequest } from "@/types";
import { notification } from "@/utilities";

import { TUpdateModalProps } from "../../types";

const UpdateCustomerClassifyModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "cập nhật phân loại khách hàng",
    size = "sm",
    loading,
    item,
    types,
}: TUpdateModalProps<TUpdateCustomerClassifyRequest> & {
    types: TTypeOfCustomerDto[] | [];
}) => {
    const [data, setData] = useState<TUpdateCustomerClassifyRequest | null>(
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
                                    <Select
                                        label="Nghiệp vụ"
                                        options={types}
                                        option={{
                                            label: "nameVI",
                                            key: "id",
                                        }}
                                        value={
                                            data.idPhanLoaiKhachHang
                                                ? data.idPhanLoaiKhachHang.toString()
                                                : undefined
                                        }
                                        onChange={(e) => {
                                            setData((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          idPhanLoaiKhachHang:
                                                              e.target.value !==
                                                              ""
                                                                  ? parseInt(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                  : undefined,
                                                      }
                                                    : null
                                            );
                                        }}
                                    />
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

export default UpdateCustomerClassifyModal;
