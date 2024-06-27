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

import { TUpdateMajorRequest } from "@/types";
import { notification } from "@/utilities";

import { TUpdateModalProps } from "../../types";

const UpdateMajorModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "cập nhật nghiệp vụ",
    size = "md",
    loading,
    item,
}: TUpdateModalProps<TUpdateMajorRequest>) => {
    const [data, setData] = useState<TUpdateMajorRequest | null>(null);

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
                                        label="Mã"
                                        value={data.code}
                                        onChange={(e) =>
                                            setData((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          code: e.target.value,
                                                      }
                                                    : null
                                            )
                                        }
                                        required={true}
                                    />
                                    <Textarea
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
                                    <Textarea
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

export default UpdateMajorModal;
