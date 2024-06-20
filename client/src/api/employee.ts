import { privateInstance } from "@/configs";
import {
    TCreateEmployeeRequest,
    TDeleteEmployeeRequest,
    TUpdateEmployeeRequest,
} from "@/types";

type TGetParams = {
    start: number;
    size: number;

    name: string;
    idPosition: number;
    idDepartment: number;
    idVanPhong: number;

    status: boolean;
};

export const getEmployees = (params: TGetParams) => {
    return privateInstance.get("/employee", {
        params,
    });
};

export const getEmployeesGroup = () => {
    return privateInstance.get("employee/group");
};

export const createEmployee = (payload: TCreateEmployeeRequest) => {
    return privateInstance.post("employee", payload);
};

export const updateEmployee = (payload: TUpdateEmployeeRequest) => {
    return privateInstance.put(`employee/${payload.idEmployee}`, payload);
};

export const deleteEmployee = (payload: TDeleteEmployeeRequest) => {
    return privateInstance.put(
        `employee/${payload.idNhanVien}/delete`,
        payload
    );
};
