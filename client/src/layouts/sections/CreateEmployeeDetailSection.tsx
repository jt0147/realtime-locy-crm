import { Dispatch, SetStateAction } from "react";
import { Input, Textarea } from "@nextui-org/react";

import { Select } from "@/components";
import { gender } from "@/constants";
import {
    TCreateEmployeeRequest,
    TDepartmentDto,
    TOfficeDto,
    TPositionDto,
} from "@/types";

type TSection = {
    positions: TPositionDto[] | [];
    departments: TDepartmentDto[] | [];
    offices: TOfficeDto[] | [];

    data: TCreateEmployeeRequest;
    setData: Dispatch<SetStateAction<TCreateEmployeeRequest>>;
};

const CreateEmployeeDetailSection = ({
    data,
    setData,
    departments,
    offices,
    positions,
}: TSection) => {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="sub-title">thông tin nhân viên</div>
                <div className="grid md:grid-cols-3 gap-4">
                    <Input
                        label="Mã nhân viên"
                        value={data.employeeCode}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                employeeCode: e.target.value,
                            }))
                        }
                        required
                    />
                    <Input
                        label="Họ và tên (VI)"
                        value={data.fullNameVI}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                fullNameVI: e.target.value,
                            }))
                        }
                        required
                    />
                    <Input
                        label="Họ và tên (EN)"
                        value={data.fullNameEN}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                fullNameEN: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Input
                        label="Năm sinh"
                        type="date"
                        value={data.birthDay}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                birthDay: e.target.value,
                            }))
                        }
                        required
                    />
                    <Select
                        options={gender}
                        option={{ key: "id", label: "nameVI" }}
                        label="Giới tính"
                        value={data.gender?.toString()}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                gender:
                                    e.target.value !== ""
                                        ? parseInt(e.target.value)
                                        : undefined,
                            }))
                        }
                    />
                    <Input
                        label="Quê quán"
                        value={data.homeTown}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                homeTown: e.target.value,
                            }))
                        }
                    />
                    <Input
                        label="Địa chỉ"
                        value={data.address}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                address: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    <Input
                        label="Số chứng minh thư"
                        value={data.idNumber}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                idNumber: e.target.value,
                            }))
                        }
                    />
                    <Input
                        label="Nơi cấp chứng minh thư"
                        value={data.placeForIDCard}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                placeForIDCard: e.target.value,
                            }))
                        }
                    />
                    <Input
                        label="Ngày cấp chứng minh thư"
                        type="date"
                        value={data.dayForIDCard}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                dayForIDCard: e.target.value,
                            }))
                        }
                    />
                    <Textarea
                        label="Ghi chú"
                        value={data.note}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                note: e.target.value,
                            }))
                        }
                    />
                </div>
            </div>
            <div className="space-y-2">
                <div className="sub-title">thông tin việc làm</div>
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
                            setData((prev) => ({
                                ...prev,
                                idPosition:
                                    e.target.value !== ""
                                        ? parseInt(e.target.value)
                                        : undefined,
                            }));
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
                            setData((prev) => ({
                                ...prev,
                                idDepartment:
                                    e.target.value !== ""
                                        ? parseInt(e.target.value)
                                        : undefined,
                            }));
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
                            setData((prev) => ({
                                ...prev,
                                idOffice:
                                    e.target.value !== ""
                                        ? parseInt(e.target.value)
                                        : undefined,
                            }));
                        }}
                    />
                    <Input
                        label="Số lượng khách hàng"
                        type="number"
                        min="0"
                        value={data.numberOfManagedCustomers.toString()}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                numberOfManagedCustomers: parseInt(
                                    e.target.value
                                ),
                            }))
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateEmployeeDetailSection;
