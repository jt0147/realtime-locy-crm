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
import { TOfficeDto, TUpdateDepartmentRequest } from "@/types";
import { notification } from "@/utilities";

import { TUpdateModalProps } from "../../types";

const UpdateDepartmentModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "cập nhật phòng ban",
    size = "md",
    loading,
    item,
    offices,
}: TUpdateModalProps<TUpdateDepartmentRequest> & {
    offices: TOfficeDto[] | [];
}) => {
    const [data, setData] = useState<TUpdateDepartmentRequest | null>(null);

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
                                    <Input
                                        label="Tên VI"
                                        value={data.nameVI}
                                        onChange={(e) =>
                                            setData((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          nameVI: e.target
                                                              .value,
                                                      }
                                                    : null
                                            )
                                        }
                                    />
                                    <Input
                                        label="Tên EN"
                                        value={data.nameEN}
                                        onChange={(e) =>
                                            setData((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          nameEN: e.target
                                                              .value,
                                                      }
                                                    : null
                                            )
                                        }
                                    />
                                    <Select
                                        label="Văn phòng"
                                        options={offices}
                                        option={{
                                            label: "nameVI",
                                            key: "id",
                                        }}
                                        value={data.idVanPhong?.toString()}
                                        onChange={(e) => {
                                            setData((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          idVanPhong:
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

export default UpdateDepartmentModal;
