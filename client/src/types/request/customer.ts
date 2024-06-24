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

export type TCreateCustomerImExRequest = {
    date: string;
    type: string;
    vessel: string;
    term: string;
    code: string;
    commd: string;
    vol: string;
    unt: string;
    idUserCreate: number | undefined;
    idFromPort: number | undefined;
    idToPort: number | undefined;
    idFromCountry: number | undefined;
    idToCountry: number | undefined;
    idCustomer: number | undefined;
};

export type TUpdateCustomerImExRequest = Omit<
    TCreateCustomerImExRequest,
    "idUserCreate"
> & {
    id: number;
};

export type TCreateCustomerOperationalRequest = {
    idLoaiTacNghiep: number | undefined;
    noiDung: string;
    idUserCreate: number | undefined;
    idCustomer: number | undefined;
    thoiGianThucHien: string;
    idNguoiLienHe: number | undefined;
    khachHangPhanHoi: string;
    ngayPhanHoi: string;
};

export type TUpdateCustomerOperationalRequest = Omit<
    TCreateCustomerOperationalRequest,
    "idUserCreate"
> & {
    id: number;
};

export type TCreateCustomerContactRequest = {
    nameVI: string;
    nameEN: string;
    addressVI: string;
    addressEN: string;
    enumGioiTinh: number | undefined;
    handPhone: string;
    homePhone: string;
    email: string;
    note: string;
    idCustomer: number | undefined;
    bankAccountNumber: string;
    bankBranchName: string;
    bankAddress: string;
    chat: string;
    flagDaiDien: boolean;
    chucVu: string;
};

export type TUpdateCustomerContactRequest = TCreateCustomerContactRequest & {
    id: number;
};

export type TCreateCustomerEvaluateRequest = {
    idCustomer: number | undefined;
    idCustomerType: number | undefined;
    idUserCreate: number | undefined;
    ghiChu: string;
};

export type TUpdateCustomerEvaluateRequest = Omit<
    TCreateCustomerEvaluateRequest,
    "idUserCreate"
> & {
    id: number;
};

export type TCreateCustomerClassifyRequest = {
    idCustomer: number | undefined;
    idPhanLoaiKhachHang: number | undefined;
};

export type TUpdateCustomerClassifyRequest = TCreateCustomerClassifyRequest & {
    id: number;
};

export type TCreateCustomerMajorRequest = {
    idCustomer: number | undefined;
    idNghiepVu: number | undefined;
};

export type TUpdateCustomerMajorRequest = TCreateCustomerMajorRequest & {
    id: number;
};

export type TCreateCustomerRouteRequest = {
    idQuocGiaDi: number | undefined;
    idQuocGiaDen: number | undefined;
    idCangDi: number | undefined;
    idCangDen: number | undefined;
    idCustomer: number | undefined;
    idLoaiHinhVanChuyen: number | undefined;
};

export type TUpdateCustomerRouteRequest = TCreateCustomerRouteRequest & {
    id: number;
};
