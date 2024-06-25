import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";

import { Select } from "@/components";
import { TCreateCustomerMajorRequest, TMajorDto } from "@/types";

import { TCreateModalProps } from "../../types";

const CreateCustomerMajorModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "tạo nghiệp vụ",
    size = "sm",
    loading,
    data,
    setData,
    majors,
}: TCreateModalProps<TCreateCustomerMajorRequest> & {
    majors: TMajorDto[] | [];
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
                                        setData((prev) => ({
                                            ...prev,
                                            idNghiepVu:
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

export default CreateCustomerMajorModal;
