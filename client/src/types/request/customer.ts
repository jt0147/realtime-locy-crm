// Manage data
export type TCreateCustomerRequest = {
    idTypeOfBusiness: number | undefined;
    idCountry: number | undefined;
    idCity: number | undefined;
    code: string;
    nameVI: string;
    nameEN: string;
    addressVI: string;
    addressEN: string;
    taxCode: string;
    phone: string;
    fax: string;
    email: string;
    website: string;
    note: string;
    idUserCreate: number | undefined;
};

export type TUpdateCustomerRequest = {
    id: number;
    idCountry: number | null | undefined;
    idCity: number | null | undefined;
    idTypeOfBusiness: number | null | undefined;
    code: string;
    nameVI: string;
    nameEN: string;
    addressVI: string;
    addressEN: string;
    taxCode: string;
    phone: string;
    fax: string;
    email: string;
    website: string;
    note: string;
};

export type TDeleteCustomerRequest = {
    id: number;
    idUserDelete: number | null;
    flagDel: boolean;
    reasonForDelete: string;
};

// Job
export type TChooseCustomerRequest = {
    idUser: number;
    idEmployee: number;
    idCustomers: number[];
};

export type TDeliveryCustomerRequest = {
    idAccountEmployee: number;
    idEmployee: number;
    idUserAssign: number;
    idCustomers: number[];
    jobAssignmentInfo: string;
};

export type TUndeliveryCustomerRequest = {
    idCustomers: number[];
};

export type TAcceptCustomerRequest = {
    idUser: number;
    idEmployee: number;
    idCustomers: number[];
};

export type TDenyCustomerRequest = {
    idUser: number;
    idEmployee: number;
    idCustomers: number[];
    reasonForDeny: string;
};

export type TReturnCustomerRequest = {
    idUser: number;
    idCustomers: number[];
};
