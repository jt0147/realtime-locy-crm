export type TCustomerDto = {
    id: number;
    idCountry: number | null | undefined;
    country: string;
    idCity: number | null | undefined;
    city: string;
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
    idEmployee: number | null | undefined;
    employee: string;
    idUserCreate: number | null | undefined;
    userCreate: string;
    dateCreate: string;
    flagDel: boolean;
    enumTypeCustomer: number; // Enum loại khách hàng
    idTypeOfBusiness: number | null | undefined; // Id loại doanh nghiệp
    typeOfBusiness: string; // Loại doanh nghiệp
    idUserDelete: number | null | undefined;
    userDelete: string;
    dateDelete: string;
    reasonForDelete: string; // Lý do xoá
    interactiveDay: string; // Ngày tương tác
    customerSelectionDay: string; // Ngày chọn khách
    returnDay: string; // Ngày trả khách
    closingDay: string; // Ngày chốt khách
    snMaxOperational: number; // Stt max tác nghiệp
    dayForOperational: string; // Ngày tác nghiệp
    enumDelivery: number; // Enum giao nhận
    deliveryDay: string; // Ngày giao
    receivedDay: string; // Ngày nhận
    idUserAssign: number | null | undefined; // id người giao việc
    jobAssigner: string; // Người giao việc
    idUserReturn: number | null | undefined; // id người trả khách
    userReturn: string; // Người trả khách
    receiptEndDate: string; // Ngày kết thúc nhận
    listOperationalText: string; // danh sách tác nghiệp text
    listRouteText: string; // danh sách tuyến hàng text
    listResponseText: string; // danh sách phản hồi text
    selfCheckoutDay: string; // Ngày tự trả khách
    jobAssignmentInfo: string; // Thông tin giao việc
    reasonForDeny: string; // Lý do từ chối
    idEndOperational: number | null | undefined; // id tác nghiệp cuối
    colorEndOperational: string; // Màu tác nghiệp cuối
};
