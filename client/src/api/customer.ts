import { privateInstance } from "@/configs";
import {
    TAcceptCustomerRequest,
    TChooseCustomerRequest,
    TCreateCustomerRequest,
    TDeleteCustomerRequest,
    TDeliveryCustomerRequest,
    TDenyCustomerRequest,
    TReturnCustomerRequest,
    TUndeliveryCustomerRequest,
    TUpdateCustomerRequest,
} from "@/types";

type TGetParams = {
    start: number;
    size: number;

    idTypeOfBusiness: number;
    idMajor: number;
    idClassifyCustomer: number;
    idEvaluate: number;
    idTypeOfOperational: number;
    name: string;
    taxCode: string;
    listType: string;

    idFromCountryRoute: number;
    idToCountryRoute: number;
    idFromPortRoute: number;
    idToPortRoute: number;

    idFromCountryImEx: number;
    idToCountryImEx: number;
    idFromPortImEx: number;
    idToPortImEx: number;
    term: string;
    hsCode: string;
    type: string;
};

// Manage data
export const getCustomers = (params: TGetParams) => {
    return privateInstance.get("/customer", {
        params,
    });
};

export const createCustomer = (payload: TCreateCustomerRequest) => {
    return privateInstance.post("customer", payload);
};

export const updateCustomer = (payload: TUpdateCustomerRequest) => {
    return privateInstance.put(`/customer/${payload.id}`, payload);
};

export const deleteCustomer = (payload: TDeleteCustomerRequest) => {
    return privateInstance.put(`/customer/${payload.id}/delete`, payload);
};

export const removeCustomer = (id: number) => {
    return privateInstance.delete(`/customer/${id}`);
};

// Export
export const exportCustomerData = async () => {
    return privateInstance.get("/export/customer");
};

export const exportCustomerReceivedData = async () => {
    return privateInstance.get("/export/customer/received");
};

// Job
export const chooseCustomer = (payload: TChooseCustomerRequest) => {
    return privateInstance.put("/customer/choose", payload);
};

export const deliveryCustomer = (payload: TDeliveryCustomerRequest) => {
    return privateInstance.put("/customer/delivery", payload);
};

export const undeliveryCustomer = (payload: TUndeliveryCustomerRequest) => {
    return privateInstance.put("/customer/undelivery", payload);
};

export const acceptCustomer = (payload: TAcceptCustomerRequest) => {
    return privateInstance.put("/customer/accept", payload);
};

export const denyCustomer = (payload: TDenyCustomerRequest) => {
    return privateInstance.put("/customer/deny", payload);
};

export const returnCustomer = (payload: TReturnCustomerRequest) => {
    return privateInstance.put("/customer/return", payload);
};
