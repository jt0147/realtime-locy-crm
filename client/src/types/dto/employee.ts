export type TEmployeeDto = {
    id: number;
    idPosition: number;
    position: string;
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

export type TEmployeeGroupDto = {
    id: number;
    parentId: number;
    nameGroup: string;
    idNhanVien: number;
    nameVI: string;
    chucVu: string;
    flagViewAllGroup: boolean;
};
