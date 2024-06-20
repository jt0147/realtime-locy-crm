import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/react";

import { TModalProps } from "../types";

const ChooseCustomerModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "nhận khách",
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
                                bạn chắc chắn muốn nhận khách?
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
                                {loading ? "Đang nhận..." : "Nhận khách"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ChooseCustomerModal;
