import { useEffect, useState } from "react";
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
import { isEqual } from "lodash";

import { Select } from "@/components";
import { gender } from "@/constants";
import {
    TDepartmentDto,
    TOfficeDto,
    TPositionDto,
    TUpdateEmployeeRequest,
} from "@/types";
import { notification } from "@/utilities";

import { TUpdateModalProps } from "../types";

const UpdateEmployeeModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "cập nhật thông tin nhân viên",
    size = "5xl",
    loading,
    item,
    positions,
    departments,
    offices,
}: TUpdateModalProps<TUpdateEmployeeRequest> & {
    positions: TPositionDto[] | [];
    departments: TDepartmentDto[] | [];
    offices: TOfficeDto[] | [];
}) => {
    const [data, setData] = useState<TUpdateEmployeeRequest | null>(null);

    /**
     * * Handle events
     */
    const handleSubmit = async () => {
        if (isEqual(data, item)) {
            notification(false, "Thông tin không thay đổi");
            return;
        }

        if (data) {
            await onSubmit(data);
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
                                    <div className="space-y-2">
                                        <div className="sub-title">
                                            thông tin nhân viên
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <Input
                                                label="Mã nhân viên"
                                                value={data.employeeCode}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  employeeCode:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                                required
                                            />
                                            <Input
                                                label="Họ và tên (VI)"
                                                value={data.fullNameVI}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  fullNameVI:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                                required
                                            />
                                            <Input
                                                label="Họ và tên (EN)"
                                                value={data.fullNameEN}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  fullNameEN:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <Input
                                                label="Năm sinh"
                                                type="date"
                                                value={data.birthDay}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  birthDay:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                                required
                                            />
                                            <Select
                                                options={gender}
                                                option={{
                                                    key: "id",
                                                    label: "nameVI",
                                                }}
                                                label="Giới tính"
                                                value={data.gender?.toString()}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  gender:
                                                                      e.target
                                                                          .value !==
                                                                      ""
                                                                          ? parseInt(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                          : undefined,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                            <Input
                                                label="Quê quán"
                                                value={data.homeTown}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  homeTown:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                            <Input
                                                label="Địa chỉ"
                                                value={data.address}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  address:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <Input
                                                label="Số chứng minh thư"
                                                value={data.idNumber}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  idNumber:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                            <Input
                                                label="Nơi cấp chứng minh thư"
                                                value={data.placeForIDCard}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  placeForIDCard:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                            <Input
                                                label="Ngày cấp chứng minh thư"
                                                type="date"
                                                value={data.dayForIDCard}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  dayForIDCard:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                            <Textarea
                                                label="Ghi chú"
                                                value={data.note}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  note: e.target
                                                                      .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="sub-title">
                                            thông tin việc làm
                                        </div>
                                        <div className="grid md:grid-cols-4">
                                            <Select
                                                label="Chức vụ"
                                                options={positions}
                                                option={{
                                                    label: "nameVI",
                                                    key: "id",
                                                }}
                                                value={data.idPosition?.toString()}
                                                onChange={(e) => {
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  idPosition:
                                                                      e.target
                                                                          .value !==
                                                                      ""
                                                                          ? parseInt(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                          : undefined,
                                                              }
                                                            : null
                                                    );
                                                }}
                                            />
                                            <Select
                                                label="Phòng ban"
                                                options={departments}
                                                option={{
                                                    label: "nameVI",
                                                    key: "id",
                                                }}
                                                value={data.idDepartment?.toString()}
                                                onChange={(e) => {
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  idDepartment:
                                                                      e.target
                                                                          .value !==
                                                                      ""
                                                                          ? parseInt(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                          : undefined,
                                                              }
                                                            : null
                                                    );
                                                }}
                                            />
                                            <Select
                                                label="Văn phòng"
                                                options={offices}
                                                option={{
                                                    label: "nameVI",
                                                    key: "id",
                                                }}
                                                value={data.idOffice?.toString()}
                                                onChange={(e) => {
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  idOffice:
                                                                      e.target
                                                                          .value !==
                                                                      ""
                                                                          ? parseInt(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                          : undefined,
                                                              }
                                                            : null
                                                    );
                                                }}
                                            />
                                            <Input
                                                label="Số lượng khách hàng"
                                                type="number"
                                                min="0"
                                                value={data.numberOfManagedCustomers.toString()}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  numberOfManagedCustomers:
                                                                      parseInt(
                                                                          e
                                                                              .target
                                                                              .value
                                                                      ),
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
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
                                {loading ? "Đang cập nhật..." : "Cập nhật"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default UpdateEmployeeModal;
