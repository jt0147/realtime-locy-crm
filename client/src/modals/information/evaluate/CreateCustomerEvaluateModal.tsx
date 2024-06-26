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
import { TCreateCustomerEvaluateRequest, TCustomerTypeDto } from "@/types";

import { TCreateModalProps } from "../../types";

const CreateCustomerEvaluateModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "tạo đánh giá",
    size = "sm",
    loading,
    data,
    setData,
    types,
}: TCreateModalProps<TCreateCustomerEvaluateRequest> & {
    types: TCustomerTypeDto[] | [];
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
                                        setData((prev) => ({
                                            ...prev,
                                            idCustomerType:
                                                e.target.value !== ""
                                                    ? parseInt(e.target.value)
                                                    : undefined,
                                        }));
                                    }}
                                />
                                <Input
                                    label="Ghi chú"
                                    value={data.ghiChu}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            ghiChu: e.target.value,
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

export default CreateCustomerEvaluateModal;
