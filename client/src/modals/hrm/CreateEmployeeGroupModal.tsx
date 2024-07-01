import { useEffect, useState } from "react";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";

import { TCreateEmployeeGroupRequest, TEmployeeJobDto } from "@/types";

import { TCreateModalProps } from "../types";
import { getAllEmployeesNoGroup } from "@/api";
import { useQuery } from "react-query";

const CreateEmployeeGroupModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "tạo nhóm nhân viên",
    size = "5xl",
    loading,
    data,
    setData,
}: TCreateModalProps<TCreateEmployeeGroupRequest>) => {
    const [employees, setEmployees] = useState<TEmployeeJobDto[] | []>([]);

    const { data: employeesRes, refetch } = useQuery({
        queryKey: "employeesGroup",
        queryFn: getAllEmployeesNoGroup,
        refetchOnWindowFocus: false,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    useEffect(() => {
        if (employeesRes && employeesRes.status) {
            setEmployees(employeesRes.data as unknown as TEmployeeJobDto[]);
        }
    }, [employeesRes]);

    useEffect(() => {
        if (isOpen) {
            refetch();
        }
    }, [isOpen, refetch]);

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
                            <div className="space-y-4">
                                <Input
                                    label="Tên nhóm"
                                    value={data.nameGroup}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            nameGroup: e.target.value,
                                        }))
                                    }
                                />
                                <div className="space-y-2">
                                    <div className="first-letter:uppercase">
                                        chọn nhân viên
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {employees.length > 0 &&
                                            employees.map((employee, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 leading-none cursor-pointer"
                                                    onClick={() =>
                                                        setData((prev) => {
                                                            const filterData =
                                                                prev.idNhanVien.includes(
                                                                    employee.idEmployee as never
                                                                )
                                                                    ? prev.idNhanVien.filter(
                                                                          (i) =>
                                                                              i !==
                                                                              employee.idEmployee
                                                                      )
                                                                    : [
                                                                          ...prev.idNhanVien,
                                                                          employee.idEmployee,
                                                                      ];
                                                            return {
                                                                ...prev,
                                                                idNhanVien:
                                                                    filterData,
                                                            };
                                                        })
                                                    }
                                                >
                                                    <input
                                                        type="checkbox"
                                                        value={employee.id}
                                                        checked={data.idNhanVien.includes(
                                                            employee.idEmployee as never
                                                        )}
                                                        readOnly
                                                    />
                                                    <p className="text-sm first-letter:uppercase">
                                                        {employee.fullNameVI}
                                                    </p>
                                                </div>
                                            ))}
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

export default CreateEmployeeGroupModal;
