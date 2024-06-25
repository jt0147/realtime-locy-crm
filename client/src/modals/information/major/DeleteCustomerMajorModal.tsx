import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";

import { TModalProps } from "../../types";

const DeleteCustomerContactModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "xoá nghiệp vụ",
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
                                bạn chắc chắn muốn xoá nghiệp vụ?
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
                                {loading ? "Đang xoá..." : "Xoá"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default DeleteCustomerContactModal;
