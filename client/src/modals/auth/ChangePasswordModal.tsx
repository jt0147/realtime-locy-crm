import { useEffect, useRef, useState } from "react";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";

import { TUpdateEmployeeRequest } from "@/types";
import { notification } from "@/utilities";

import { TUpdateModalProps } from "../types";

const ChangePasswordModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "Đổi mật khẩu tài khoản nhân viên",
    size = "md",
    loading,
    item,
}: TUpdateModalProps<TUpdateEmployeeRequest>) => {
    const [data, setData] = useState<TUpdateEmployeeRequest | null>(null);

    const passwordRef = useRef<HTMLInputElement | null>(null);

    /**
     * * Handle events
     */
    const handleSubmit = async () => {
        const newPassword = passwordRef.current?.value ?? "";
        if (newPassword === "") {
            notification(false, "Bạn cần nhập mật khẩu mới!");
            return;
        }

        if (data) {
            await onSubmit({
                ...data,
                password: newPassword,
            });
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
                                <div className="space-y-4">
                                    <Input
                                        label="Mật khẩu mới"
                                        type="password"
                                        ref={passwordRef}
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
                                {loading ? "Đang đổi..." : "Đổi mật khẩu"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ChangePasswordModal;
