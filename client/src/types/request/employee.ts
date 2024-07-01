export type TCreateEmployeeRequest = {
    // Thông tin tài khoản
    username: string;
    password: string;
    permission: string;

    // Thông tin cá nhân
    idPosition: number | undefined;
    idDepartment: number | undefined;
    idOffice: number | undefined;
    employeeCode: string;
    fullNameVI: string;
    fullNameEN: string;
    birthDay: string;
    gender: number | undefined;
    homeTown: string;
    address: string;
    email: string;
    idNumber: string;
    placeForIDCard: string;
    dayForIDCard: string;
    photoURL: string;
    note: string;
    numberOfManagedCustomers: number;
};

export type TUpdateEmployeeRequest = {
    // Thông tin tài khoản
    id: number;
    username: string;
    password: string;
    active: boolean;
    permission: string;

    // Thông tin cá nhân
    idEmployee: number;
    idPosition: number | undefined;
    idDepartment: number | undefined;
    idOffice: number | undefined;
    employeeCode: string;
    fullNameVI: string;
    fullNameEN: string;
    birthDay: string;
    gender: number | undefined;
    homeTown: string;
    address: string;
    email: string;
    idNumber: string;
    placeForIDCard: string;
    dayForIDCard: string;
    photoURL: string;
    note: string;
    numberOfManagedCustomers: number;
};

export type TDeleteEmployeeRequest = {
    idEmployee: number;
    flagDelete: boolean;
    idUserDelete: number | null;
};
