export type TEmployeeDto = {
    id: number;
    iDPosition: number;
    Position: string;
    idDepartment: number;
    department: string;
    idOffice: number;
    office: string;

    employeeCode: string;
    fullNameVI: string;
    fullNameEN: string;
    birthDay: string;
    gender: number;
    homeTown: string;
    address: string;
    idNumber: string;
    placeForIDCard: string;
    dayForIDCard: string;
    phone: string;
    email: string;
    photoURL: string;
    note: string;
    numberOfManagedCustomers: number;

    flagDelete: boolean;
    idUserDelete: number;
    dateDelete: string;

    idAccount: number;
    username: string;
    active: boolean;
    permission: string;
};

export type TEmployeeJobDto = {
    id: number;
    idEmployee: number;
    username: string;
    fullNameVI: string;
    fullNameEN: string;
};