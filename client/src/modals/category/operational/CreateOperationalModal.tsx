import { ChangeEvent } from "react";
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

import { TCreateOperationalRequest } from "@/types";
import { hexToRgb, rgbToHex } from "@/utilities";

import { TCreateModalProps } from "../../types";

const CreateOperationalModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "tạo tác nghiệp",
    size = "sm",
    loading,
    data,
    setData,
}: TCreateModalProps<TCreateOperationalRequest>) => {
    const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
        const hexColor = e.target.value;

        const rgbColor = hexToRgb(hexColor);

        if (rgbColor) {
            setData((prev) => ({
                ...prev,
                r: rgbColor.r,
                g: rgbColor.g,
                b: rgbColor.b,
            }));
        }
    };

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
                                        setData((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                />
                                <Input
                                    label="Ngày tự trả khách"
                                    type="number"
                                    min="0"
                                    value={data.ngayTuTraKhach.toString()}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            ngayTuTraKhach: parseInt(
                                                e.target.value
                                            ),
                                        }))
                                    }
                                />
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

export default CreateOperationalModal;
