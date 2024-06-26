import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";

import { Select } from "@/components";
import { TCreateCustomerClassifyRequest, TTypeOfCustomerDto } from "@/types";

import { TCreateModalProps } from "../../types";

const CreateCustomerClassifyModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "tạo phân loại khách hàng",
    size = "sm",
    loading,
    data,
    setData,
    types,
}: TCreateModalProps<TCreateCustomerClassifyRequest> & {
    types: TTypeOfCustomerDto[] | [];
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
                                    label="Phân loại khách hàng"
                                    options={types}
                                    option={{
                                        label: "nameVI",
                                        key: "id",
                                    }}
                                    value={
                                        data.idPhanLoaiKhachHang
                                            ? data.idPhanLoaiKhachHang.toString()
                                            : undefined
                                    }
                                    onChange={(e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            idPhanLoaiKhachHang:
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

export default CreateCustomerClassifyModal;
