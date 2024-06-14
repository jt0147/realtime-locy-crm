export type TProfileDto = {
    id: number;
    username: string;
    permission: string;
    idEmployee: number;

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
    PlaceForIDCard: string;
    DayForIDCard: string;
    phone: string;
    email: string;
    photoURL: string;
    note: string;
    numberOfManagedCustomers: number;

    flagDelete: boolean;
    idUserDelete: number | null;
    dateDelete: string;
};
