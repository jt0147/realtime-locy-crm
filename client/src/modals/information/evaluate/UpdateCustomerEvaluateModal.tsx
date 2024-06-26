import { useEffect, useState } from "react";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { isEqual } from "lodash";

import { Select } from "@/components";
import { TCustomerTypeDto, TUpdateCustomerEvaluateRequest } from "@/types";
import { notification } from "@/utilities";

import { TUpdateModalProps } from "../../types";

const UpdateCustomerEvaluateModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "cập nhật đánh giá",
    size = "sm",
    loading,
    item,
    types,
}: TUpdateModalProps<TUpdateCustomerEvaluateRequest> & {
    types: TCustomerTypeDto[] | [];
}) => {
    const [data, setData] = useState<TUpdateCustomerEvaluateRequest | null>(
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
                                        label="Đánh giá"
                                        options={types}
                                        option={{
                                            label: "nameVI",
                                            key: "id",
                                        }}
                                        value={
                                            data.idCustomerType
                                                ? data.idCustomerType.toString()
                                                : undefined
                                        }
                                        onChange={(e) => {
                                            setData((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          idCustomerType:
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
                                    <Input
                                        label="Ghi chú"
                                        value={data.ghiChu}
                                        onChange={(e) =>
                                            setData((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          ghiChu: e.target
                                                              .value,
                                                      }
                                                    : null
                                            )
                                        }
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

export default UpdateCustomerEvaluateModal;
