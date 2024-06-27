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

import { TCreatePositionRequest } from "@/types";

import { TCreateModalProps } from "../../types";

const CreatePositionModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "tạo chức vụ",
    size = "md",
    loading,
    data,
    setData,
}: TCreateModalProps<TCreatePositionRequest>) => {
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
                                    label="Mã"
                                    value={data.code}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            code: e.target.value,
                                        }))
                                    }
                                    required={true}
                                />
                                <Textarea
                                    label="Tên VI"
                                    value={data.nameVI}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            nameVI: e.target.value,
                                        }))
                                    }
                                />
                                <Textarea
                                    label="Tên EN"
                                    value={data.nameEN}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            nameEN: e.target.value,
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

export default CreatePositionModal;
