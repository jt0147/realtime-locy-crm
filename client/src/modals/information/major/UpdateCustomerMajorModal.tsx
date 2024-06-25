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
import { TMajorDto, TUpdateCustomerMajorRequest } from "@/types";
import { notification } from "@/utilities";

import { TUpdateModalProps } from "../../types";

const UpdateCustomerMajorModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "cập nhật người liên hệ",
    size = "sm",
    loading,
    item,
    majors,
}: TUpdateModalProps<TUpdateCustomerMajorRequest> & {
    majors: TMajorDto[] | [];
}) => {
    const [data, setData] = useState<TUpdateCustomerMajorRequest | null>(null);

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
                                        options={majors}
                                        option={{
                                            label: "nameVI",
                                            key: "id",
                                        }}
                                        value={
                                            data.idNghiepVu
                                                ? data.idNghiepVu.toString()
                                                : undefined
                                        }
                                        onChange={(e) => {
                                            setData((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          idNghiepVu:
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

export default UpdateCustomerMajorModal;
