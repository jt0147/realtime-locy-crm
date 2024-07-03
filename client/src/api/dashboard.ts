import { privateInstance } from "@/configs";

export const getDataDashboard = () => {
    return privateInstance.get("/dashboard");
};

export const getDataEmployeeDashboard = (id: number) => {
    return privateInstance.get(`/dashboard/employee-office/${id}`);
};
