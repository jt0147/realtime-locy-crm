import { TCustomerOperationalDto } from "./customer";
import { TNotificationDto } from "./notification";

export type TDashboardDataDto = {
    totalEmployee: number;
    totalCustomer: number;
    mostRecentActivities: TNotificationDto[] | [];
    operationalHistory: TCustomerOperationalDto[] | [];
};

export type TDashboardEmployeeDto = {
    idDepartment: number;
    department: string;
    totalEmployee: number;
};

export type TDashboardDataEmployeeDto = TDashboardEmployeeDto[] | [];
