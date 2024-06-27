import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";

import { Select } from "@/components";
import { TCreateDepartmentRequest, TOfficeDto } from "@/types";

import { TCreateModalProps } from "../../types";

const CreateDepartmentModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "tạo phòng ban",
    size = "md",
    loading,
    data,
    setData,
    offices,
}: TCreateModalProps<TCreateDepartmentRequest> & {
    offices: TOfficeDto[] | [];
}) => {
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
                                    label="Tên VI"
                                    value={data.nameVI}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            nameVI: e.target.value,
                                        }))
                                    }
                                />
                                <Input
                                    label="Tên EN"
                                    value={data.nameEN}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            nameEN: e.target.value,
                                        }))
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
                                        setData((prev) => ({
                                            ...prev,
                                            idVanPhong:
                                                e.target.value !== ""
                                                    ? parseInt(e.target.value)
                                                    : undefined,
                                        }));
                                    }}
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

export default CreateDepartmentModal;
