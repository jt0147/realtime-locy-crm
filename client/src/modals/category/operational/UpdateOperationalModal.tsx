import { ChangeEvent, useEffect, useState } from "react";
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

import { TUpdateOperationalRequest } from "@/types";
import { hexToRgb, notification, rgbToHex } from "@/utilities";

import { TUpdateModalProps } from "../../types";

const UpdateOperationalModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "cập nhật tác nghiệp",
    size = "sm",
    loading,
    item,
}: TUpdateModalProps<TUpdateOperationalRequest>) => {
    const [data, setData] = useState<TUpdateOperationalRequest | null>(null);

    /**
     * * Handle events
     */
    const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
        const hexColor = e.target.value;

        const rgbColor = hexToRgb(hexColor);

        if (rgbColor) {
            setData((prev) =>
                prev
                    ? {
                          ...prev,
                          r: rgbColor.r,
                          g: rgbColor.g,
                          b: rgbColor.b,
                      }
                    : null
            );
        }
    };

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
                                        label="Màu"
                                        type="color"
                                        value={rgbToHex(data.r, data.g, data.b)}
                                        onChange={handleChangeColor}
                                        required={true}
                                    />
                                    <Textarea
                                        label="Tên"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          name: e.target.value,
                                                      }
                                                    : null
                                            )
                                        }
                                    />
                                    <Input
                                        label="Ngày tự trả khách"
                                        type="number"
                                        min="0"
                                        value={data.ngayTuTraKhach.toString()}
                                        onChange={(e) =>
                                            setData((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          ngayTuTraKhach:
                                                              parseInt(
                                                                  e.target.value
                                                              ),
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

export default UpdateOperationalModal;
