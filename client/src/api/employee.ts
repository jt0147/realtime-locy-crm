import { privateInstance } from "@/configs";
import {
    TCreateEmployeeGroupRequest,
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
    idOffice: number;

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
        `employee/${payload.idEmployee}/delete`,
        payload
    );
};

export const getAllEmployeesNoGroup = () => {
    return privateInstance.get("employeegroup/nogroup");
};

export const getEmployeeGroups = () => {
    return privateInstance.get("employeegroup");
};

export const createEmployeeGroup = (payload: TCreateEmployeeGroupRequest) => {
    return privateInstance.post("employeegroup", payload);
};

export const deleteEmployeeOfGroup = (id: number) => {
    return privateInstance.delete(`employeegroup/${id}`);
};
