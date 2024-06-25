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

import { Select } from "@/components";
import {
    TCreateCustomerOperationalRequest,
    TCustomerContactDto,
    TOperationalDto,
} from "@/types";

import { TCreateModalProps } from "../../types";

const CreateCustomerOperationalModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "tạo tác nghiệp",
    size = "4xl",
    loading,
    data,
    setData,
    contacts,
    operationals,
}: TCreateModalProps<TCreateCustomerOperationalRequest> & {
    contacts: TCustomerContactDto[] | [];
    operationals: TOperationalDto[] | [];
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
                                <div className="grid gap-4">
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <Select
                                            label="Loại tác nghiệp"
                                            options={operationals}
                                            option={{
                                                label: "name",
                                                key: "id",
                                            }}
                                            value={
                                                data.idLoaiTacNghiep
                                                    ? data.idLoaiTacNghiep.toString()
                                                    : undefined
                                            }
                                            onChange={(e) => {
                                                setData((prev) => ({
                                                    ...prev,
                                                    idLoaiTacNghiep:
                                                        e.target.value !== ""
                                                            ? parseInt(
                                                                  e.target.value
                                                              )
                                                            : undefined,
                                                }));
                                            }}
                                        />
                                        <Select
                                            label="Người liên hệ"
                                            options={contacts}
                                            option={{
                                                label: "nameVI",
                                                key: "id",
                                            }}
                                            value={
                                                data.idNguoiLienHe
                                                    ? data.idNguoiLienHe.toString()
                                                    : undefined
                                            }
                                            onChange={(e) => {
                                                setData((prev) => ({
                                                    ...prev,
                                                    idNguoiLienHe:
                                                        e.target.value !== ""
                                                            ? parseInt(
                                                                  e.target.value
                                                              )
                                                            : undefined,
                                                }));
                                            }}
                                        />
                                        <Input
                                            type="date"
                                            label="Thời gian thực hiện"
                                            value={data.thoiGianThucHien}
                                            onChange={(e) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    thoiGianThucHien:
                                                        e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                    <Textarea
                                        label="Nội dung"
                                        value={data.noiDung}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                noiDung: e.target.value,
                                            }))
                                        }
                                    />
                                    <Textarea
                                        label="Khách hàng phản hồi"
                                        value={data.khachHangPhanHoi}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                khachHangPhanHoi:
                                                    e.target.value,
                                            }))
                                        }
                                    />
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <Input
                                            type="date"
                                            label="Ngày phản hồi"
                                            value={data.ngayPhanHoi}
                                            onChange={(e) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    ngayPhanHoi: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
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

export default CreateCustomerOperationalModal;
