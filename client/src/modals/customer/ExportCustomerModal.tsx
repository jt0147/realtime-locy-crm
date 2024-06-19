import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/react";

import { TModalProps } from "../types";

const ExportCustomerModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "Export dữ liệu khách hàng",
    size = "md",
    loading,
}: TModalProps) => {
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
                            <p className="text-gray-900 first-letter:uppercase">
                                bạn chắc chắn muốn export dữ liệu khách hàng
                            </p>
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
                                {loading
                                    ? "Đang xuất dữ liệu..."
                                    : "Xuất dữ liệu"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ExportCustomerModal;
