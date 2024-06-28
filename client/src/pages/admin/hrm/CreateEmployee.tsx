import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

import {
    createEmployee,
    getAllDepartments,
    getAllOffices,
    getAllPositions,
} from "@/api";
import { MultiStep } from "@/components";
import {
    CreateEmployeeAccountSection,
    CreateEmployeeDetailSection,
} from "@/layouts";
import {
    TCreateEmployeeRequest,
    TDepartmentDto,
    TOfficeDto,
    TPositionDto,
} from "@/types";

const initEmployee: TCreateEmployeeRequest = {
    username: "",
    password: "",
    permission: "",

    idPosition: undefined,
    idDepartment: undefined,
    idOffice: undefined,
    employeeCode: "",
    fullNameVI: "",
    fullNameEN: "",
    birthDay: "",
    gender: undefined,
    email: "",
    homeTown: "",
    address: "",
    idNumber: "",
    placeForIDCard: "",
    dayForIDCard: "",
    note: "",
    numberOfManagedCustomers: 0,
    photoURL: "",
};

const CreateEmployee = () => {
    const [data, setData] = useState<TCreateEmployeeRequest>(initEmployee);
    const [positions, setPositions] = useState<TPositionDto[] | []>([]);
    const [departments, setDepartments] = useState<TDepartmentDto[] | []>([]);
    const [offices, setOffices] = useState<TOfficeDto[] | []>([]);

    const { data: positionRes } = useQuery({
        queryKey: "position",
        queryFn: getAllPositions,
        refetchOnWindowFocus: true,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    const { data: departmentsRes } = useQuery({
        queryKey: "departments",
        queryFn: getAllDepartments,
        refetchOnWindowFocus: true,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    const { data: officesRes } = useQuery({
        queryKey: "offices",
        queryFn: getAllOffices,
        refetchOnWindowFocus: true,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    const createMutation = useMutation({
        mutationFn: createEmployee,
    });

    /**
     * * Handle events
     */
    const handleSubmit = async (refresh: () => void) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await createMutation.mutateAsync(data);
        if (result.status) {
            setData(initEmployee);
            refresh();
        }
    };

    useEffect(() => {
        if (positionRes && positionRes.status) {
            setPositions(positionRes.data as unknown as TPositionDto[]);
        }
    }, [positionRes]);

    useEffect(() => {
        if (departmentsRes && departmentsRes.status) {
            setDepartments(departmentsRes.data as unknown as TDepartmentDto[]);
        }
    }, [departmentsRes]);

    useEffect(() => {
        if (officesRes && officesRes.status) {
            setOffices(officesRes.data as unknown as TOfficeDto[]);
        }
    }, [officesRes]);

    return (
        <div className="mt-4 p-4 bg-white rounded-lg space-y-4">
            <MultiStep
                as="form"
                steps={[
                    <CreateEmployeeDetailSection
                        data={data}
                        setData={setData}
                        departments={departments}
                        offices={offices}
                        positions={positions}
                    />,
                    <CreateEmployeeAccountSection
                        data={data}
                        setData={setData}
                    />,
                ]}
                title="thêm mới nhân viên"
                onLastStep={(refresh) => handleSubmit(refresh)}
                loading={createMutation.isLoading}
            />
        </div>
    );
};

export default CreateEmployee;
