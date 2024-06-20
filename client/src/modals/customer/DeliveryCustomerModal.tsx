import { ReactNode } from "react";
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/react";

import { TModalProps } from "../types";

const DeliveryCustomerModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "giao khách",
    size = "md",
    loading,
    children,
}: TModalProps & { children: ReactNode }) => {
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
                        <ModalBody className="space-y-6">{children}</ModalBody>
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
                                {loading ? "Đang giao..." : "Giao khách"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default DeliveryCustomerModal;
