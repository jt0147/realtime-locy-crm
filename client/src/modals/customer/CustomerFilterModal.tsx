import { Dispatch, useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
} from "@nextui-org/react";

import { Select } from "@/components";
import {
    TBusinessDto,
    TCountryDto,
    TCustomerTypeDto,
    TMajorDto,
    TOperationalDto,
    TPortDto,
    TTypeOfCustomerDto,
} from "@/types";

import { TModalProps } from "../types";
import {
    getAllBusinesses,
    getAllCountries,
    getAllCustomerTypes,
    getAllMajors,
    getAllOperationals,
    getAllTypeOfCustomers,
    getPortsByIdCountry,
} from "@/api";

type TQueryProps = {
    idTypeOfBusiness: number | undefined;
    idMajor: number | undefined;
    idClassifyCustomer: number | undefined;
    idEvaluate: number | undefined;
    idTypeOfOperational: number | undefined;
    name: string;
    taxCode: string;
    listType:
        | "all"
        | "assigned"
        | "delete"
        | "delivered"
        | "received"
        | "undelivered";

    idFromCountryRoute: number | undefined;
    idToCountryRoute: number | undefined;
    idFromPortRoute: number | undefined;
    idToPortRoute: number | undefined;

    idFromCountryImEx: number | undefined;
    idToCountryImEx: number | undefined;
    idFromPortImEx: number | undefined;
    idToPortImEx: number | undefined;
    term: string;
    hsCode: string;
    type: string;
};

type TCustomerFilter = {
    initQuery: TQueryProps;
    updateQuery: Dispatch<React.SetStateAction<TQueryProps>>;
};

const CustomerFilterModal = ({
    isOpen,
    onClose: onCloseProp,
    title = "Tìm kiếm nâng cao",
    size = "full",
    initQuery,
    updateQuery,
}: Omit<TModalProps, "onSubmit" | "loading"> & TCustomerFilter) => {
    const [query, setQuery] = useState<TQueryProps>(initQuery);

    const [countries, setCountries] = useState<TCountryDto[] | []>([]);
    const [businesses, setBusinesses] = useState<TBusinessDto[] | []>([]);
    const [majors, setMajors] = useState<TMajorDto[] | []>([]);
    const [types, setTypes] = useState<TTypeOfCustomerDto[] | []>([]);
    const [customerTypes, setCustomerTypes] = useState<TCustomerTypeDto[] | []>(
        []
    );
    const [operationals, setOperationals] = useState<TOperationalDto[] | []>(
        []
    );
    const [portsRouteFrom, setPortsRouteFrom] = useState<TPortDto[] | []>([]);
    const [portsRouteTo, setPortsRouteTo] = useState<TPortDto[] | []>([]);
    const [portsImExFrom, setPortsImExFrom] = useState<TPortDto[] | []>([]);
    const [portsImExTo, setPortsImExTo] = useState<TPortDto[] | []>([]);

    // Thành phố
    const { data: countriesRes } = useQuery({
        queryKey: "countries",
        queryFn: getAllCountries,
        refetchOnWindowFocus: false,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    // Loại doanh nghiệp
    const { data: businessesRes } = useQuery({
        queryKey: ["businessesQuery"],
        queryFn: getAllBusinesses,
        refetchOnWindowFocus: true,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    // Nghiệp vụ
    const { data: majorsRes } = useQuery({
        queryKey: "majorsQuery",
        queryFn: getAllMajors,
        refetchOnWindowFocus: true,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    // Phân loại khách hàng
    const { data: typesRes } = useQuery({
        queryKey: "types",
        queryFn: getAllTypeOfCustomers,
        refetchOnWindowFocus: true,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    // Đánh giá
    const { data: customerTypesRes } = useQuery({
        queryKey: "customerTypesQuery",
        queryFn: getAllCustomerTypes,
        refetchOnWindowFocus: true,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    // Tác nghiệp
    const { data: operationalsRes } = useQuery({
        queryKey: "operationalsQuery",
        queryFn: getAllOperationals,
        refetchOnWindowFocus: true,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    // Xuất tuyến hàng
    const { data: portsFromRouteRes } = useQuery({
        queryKey: ["portsFromRouteQuery", query?.idFromCountryRoute],
        queryFn: () => getPortsByIdCountry(query?.idFromCountryRoute as number),
        cacheTime: Infinity,
        staleTime: Infinity,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            query.idFromCountryRoute !== undefined,
    });

    const { data: portsToRouteRes } = useQuery({
        queryKey: ["portsToRouteQuery", query?.idToCountryRoute],
        queryFn: () => getPortsByIdCountry(query?.idToCountryRoute as number),
        cacheTime: Infinity,
        staleTime: Infinity,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            query.idToCountryRoute !== undefined,
    });

    // Xuất nhập khẩu
    const { data: portsFromImExRes } = useQuery({
        queryKey: ["portsFromImExQuery", query?.idFromCountryImEx],
        queryFn: () => getPortsByIdCountry(query?.idFromCountryImEx as number),
        cacheTime: Infinity,
        staleTime: Infinity,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            query.idFromCountryImEx !== undefined,
    });

    const { data: portsToImExRes } = useQuery({
        queryKey: ["portsToImExQuery", query?.idToCountryImEx],
        queryFn: () => getPortsByIdCountry(query?.idToCountryImEx as number),
        cacheTime: Infinity,
        staleTime: Infinity,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            query.idToCountryImEx !== undefined,
    });

    /**
     * * Handle events
     */
    const handleSubmit = () => {
        updateQuery(query);
        onCloseProp();
    };

    const handleRefresh = () => {
        setQuery((prev) => ({
            ...prev,
            idTypeOfBusiness: undefined,
            idMajor: undefined,
            idClassifyCustomer: undefined,
            idEvaluate: undefined,
            idTypeOfOperational: undefined,
            idFromCountryRoute: undefined,
            idToCountryRoute: undefined,
            idFromPortRoute: undefined,
            idToPortRoute: undefined,
            idFromCountryImEx: undefined,
            idToCountryImEx: undefined,
            idFromPortImEx: undefined,
            idToPortImEx: undefined,
            term: "",
            hsCode: "",
            type: "",
        }));
    };

    useEffect(() => {
        if (countriesRes && countriesRes.status) {
            setCountries(countriesRes.data as unknown as TCountryDto[]);
        }
    }, [countriesRes]);

    useEffect(() => {
        if (businessesRes && businessesRes.status) {
            setBusinesses(businessesRes.data as unknown as TBusinessDto[]);
        }
    }, [businessesRes]);

    useEffect(() => {
        if (majorsRes && majorsRes.status) {
            setMajors(majorsRes.data as unknown as TMajorDto[]);
        }
    }, [majorsRes]);

    useEffect(() => {
        if (customerTypesRes && customerTypesRes.status) {
            setCustomerTypes(
                customerTypesRes.data as unknown as TCustomerTypeDto[]
            );
        }
    }, [customerTypesRes]);

    useEffect(() => {
        if (typesRes && typesRes.status) {
            setTypes(typesRes.data as unknown as TTypeOfCustomerDto[]);
        }
    }, [typesRes]);

    useEffect(() => {
        if (operationalsRes && operationalsRes.status) {
            setOperationals(
                operationalsRes.data as unknown as TOperationalDto[]
            );
        }
    }, [operationalsRes]);

    useEffect(() => {
        if (portsFromRouteRes && portsFromRouteRes.status) {
            setPortsRouteFrom(portsFromRouteRes.data as unknown as TPortDto[]);
        }
    }, [portsFromRouteRes]);

    useEffect(() => {
        if (portsToRouteRes && portsToRouteRes.status) {
            setPortsRouteTo(portsToRouteRes.data as unknown as TPortDto[]);
        }
    }, [portsToRouteRes]);

    useEffect(() => {
        if (portsFromImExRes && portsFromImExRes.status) {
            setPortsImExFrom(portsFromImExRes.data as unknown as TPortDto[]);
        }
    }, [portsFromImExRes]);

    useEffect(() => {
        if (portsToImExRes && portsToImExRes.status) {
            setPortsImExTo(portsToImExRes.data as unknown as TPortDto[]);
        }
    }, [portsToImExRes]);

    useEffect(() => {
        if (isOpen) {
            setQuery(initQuery);
        }
    }, [isOpen, initQuery, setQuery]);

    return (
        <Modal size={size} isOpen={isOpen} onClose={onCloseProp}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <div className="first-letter:uppercase font-semibold text-lg">
                                {title}
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <div className="grid gap-2">
                                {/* Thông tin khách hàng */}
                                <div className="space-y-2">
                                    <h4
                                        className="text-gray-900 dark:text-white text-base font-medium"
                                        role="title"
                                    >
                                        thông tin khách hàng
                                    </h4>
                                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                                        <Select
                                            label="Loại doanh nghiệp"
                                            options={businesses}
                                            option={{
                                                label: "nameVI",
                                                key: "id",
                                            }}
                                            value={query.idTypeOfBusiness?.toString()}
                                            onChange={(e) => {
                                                setQuery((prev) => ({
                                                    ...prev,
                                                    idTypeOfBusiness:
                                                        e.target.value !== ""
                                                            ? parseInt(
                                                                  e.target.value
                                                              )
                                                            : undefined,
                                                }));
                                            }}
                                        />
                                        <Select
                                            label="Nghiệp vụ"
                                            options={majors}
                                            option={{
                                                label: "nameVI",
                                                key: "id",
                                            }}
                                            value={query.idMajor?.toString()}
                                            onChange={(e) => {
                                                setQuery((prev) => ({
                                                    ...prev,
                                                    idMajor:
                                                        e.target.value !== ""
                                                            ? parseInt(
                                                                  e.target.value
                                                              )
                                                            : undefined,
                                                }));
                                            }}
                                        />
                                        <Select
                                            label="Phân loại khách hàng"
                                            options={types}
                                            option={{
                                                label: "nameVI",
                                                key: "id",
                                            }}
                                            value={query.idClassifyCustomer?.toString()}
                                            onChange={(e) => {
                                                setQuery((prev) => ({
                                                    ...prev,
                                                    idClassifyCustomer:
                                                        e.target.value !== ""
                                                            ? parseInt(
                                                                  e.target.value
                                                              )
                                                            : undefined,
                                                }));
                                            }}
                                        />
                                        <Select
                                            label="Đánh giá khách hàng"
                                            options={customerTypes}
                                            option={{
                                                label: "nameVI",
                                                key: "id",
                                            }}
                                            value={query.idEvaluate?.toString()}
                                            onChange={(e) => {
                                                setQuery((prev) => ({
                                                    ...prev,
                                                    idEvaluate:
                                                        e.target.value !== ""
                                                            ? parseInt(
                                                                  e.target.value
                                                              )
                                                            : undefined,
                                                }));
                                            }}
                                        />
                                        <Select
                                            label="Loại tác nghiệp"
                                            options={operationals}
                                            option={{
                                                label: "name",
                                                key: "id",
                                            }}
                                            value={query.idTypeOfOperational?.toString()}
                                            onChange={(e) => {
                                                setQuery((prev) => ({
                                                    ...prev,
                                                    idTypeOfOperational:
                                                        e.target.value !== ""
                                                            ? parseInt(
                                                                  e.target.value
                                                              )
                                                            : undefined,
                                                }));
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Thông tin tuyến hàng */}
                            <div className="space-y-2">
                                <h4
                                    className="text-gray-900 dark:text-white text-base font-medium"
                                    role="title"
                                >
                                    thông tin tuyến hàng
                                </h4>
                                <div className="grid md:grid-cols-4 gap-4">
                                    <Select
                                        label="Quốc gia đi"
                                        options={countries}
                                        option={{
                                            label: "nameVI",
                                            key: "id",
                                        }}
                                        value={
                                            query.idFromCountryRoute?.toString() ||
                                            ""
                                        }
                                        onChange={(e) => {
                                            setQuery((prev) => ({
                                                ...prev,
                                                idFromCountryRoute:
                                                    e.target.value !== ""
                                                        ? parseInt(
                                                              e.target.value
                                                          )
                                                        : undefined,
                                            }));
                                        }}
                                    />
                                    <Select
                                        label="Cảng đi"
                                        options={portsRouteTo}
                                        option={{
                                            label: "nameVI",
                                            key: "id",
                                        }}
                                        value={
                                            query.idFromPortRoute?.toString() ||
                                            ""
                                        }
                                        onChange={(e) => {
                                            setQuery((prev) => ({
                                                ...prev,
                                                idFromPortRoute:
                                                    e.target.value !== ""
                                                        ? parseInt(
                                                              e.target.value
                                                          )
                                                        : undefined,
                                            }));
                                        }}
                                    />
                                    <Select
                                        label="Quốc gia đến"
                                        options={countries}
                                        option={{
                                            label: "nameVI",
                                            key: "id",
                                        }}
                                        value={
                                            query.idToCountryRoute?.toString() ||
                                            ""
                                        }
                                        onChange={(e) => {
                                            setQuery((prev) => ({
                                                ...prev,
                                                idToCountryRoute:
                                                    e.target.value !== ""
                                                        ? parseInt(
                                                              e.target.value
                                                          )
                                                        : undefined,
                                            }));
                                        }}
                                    />
                                    <Select
                                        label="Cảng đến"
                                        options={portsRouteFrom}
                                        option={{
                                            label: "nameVI",
                                            key: "id",
                                        }}
                                        value={
                                            query.idToPortRoute?.toString() ||
                                            ""
                                        }
                                        onChange={(e) => {
                                            setQuery((prev) => ({
                                                ...prev,
                                                idToPortRoute:
                                                    e.target.value !== ""
                                                        ? parseInt(
                                                              e.target.value
                                                          )
                                                        : undefined,
                                            }));
                                        }}
                                    />
                                </div>
                            </div>
                            {/* Thông tin xuất nhập khẩu */}
                            <div className="space-y-2">
                                <h4
                                    className="text-gray-900 dark:text-white text-base font-medium"
                                    role="title"
                                >
                                    thông tin xuất nhập khẩu
                                </h4>
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <Select
                                        label="Quốc gia đi"
                                        options={countries}
                                        option={{
                                            label: "nameVI",
                                            key: "id",
                                        }}
                                        value={
                                            query.idFromCountryImEx?.toString() ||
                                            ""
                                        }
                                        onChange={(e) => {
                                            setQuery((prev) => ({
                                                ...prev,
                                                idFromCountryImEx:
                                                    e.target.value !== ""
                                                        ? parseInt(
                                                              e.target.value
                                                          )
                                                        : undefined,
                                            }));
                                        }}
                                    />
                                    <Select
                                        label="Cảng đi"
                                        options={portsImExFrom}
                                        option={{
                                            label: "nameVI",
                                            key: "id",
                                        }}
                                        value={
                                            query.idFromPortImEx?.toString() ||
                                            ""
                                        }
                                        onChange={(e) => {
                                            setQuery((prev) => ({
                                                ...prev,
                                                idFromPortImEx:
                                                    e.target.value !== ""
                                                        ? parseInt(
                                                              e.target.value
                                                          )
                                                        : undefined,
                                            }));
                                        }}
                                    />
                                    <Select
                                        label="Quốc gia đến"
                                        options={countries}
                                        option={{
                                            label: "nameVI",
                                            key: "id",
                                        }}
                                        value={
                                            query.idToCountryImEx?.toString() ||
                                            ""
                                        }
                                        onChange={(e) => {
                                            setQuery((prev) => ({
                                                ...prev,
                                                idToCountryImEx:
                                                    e.target.value !== ""
                                                        ? parseInt(
                                                              e.target.value
                                                          )
                                                        : undefined,
                                            }));
                                        }}
                                    />
                                    <Select
                                        label="Cảng đến"
                                        options={portsImExTo}
                                        option={{
                                            label: "nameVI",
                                            key: "id",
                                        }}
                                        value={query.idToPortImEx?.toString()}
                                        onChange={(e) => {
                                            setQuery((prev) => ({
                                                ...prev,
                                                idToPortImEx:
                                                    e.target.value !== ""
                                                        ? parseInt(
                                                              e.target.value
                                                          )
                                                        : undefined,
                                            }));
                                        }}
                                    />
                                    <Input
                                        label="Term"
                                        value={query.term}
                                        onChange={(e) =>
                                            setQuery((prev) => ({
                                                ...prev,
                                                term: e.target.value,
                                            }))
                                        }
                                    />
                                    <Input
                                        label="HS Code"
                                        value={query.hsCode}
                                        onChange={(e) =>
                                            setQuery((prev) => ({
                                                ...prev,
                                                hsCode: e.target.value,
                                            }))
                                        }
                                    />
                                    <Input
                                        label="Type"
                                        value={query.type}
                                        onChange={(e) =>
                                            setQuery((prev) => ({
                                                ...prev,
                                                type: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onClick={onClose}
                            >
                                Huỷ
                            </Button>
                            <Button
                                className="text-white"
                                color="success"
                                onPress={handleSubmit}
                            >
                                Lọc dữ liệu
                            </Button>
                            <Button
                                className="text-white"
                                color="primary"
                                onPress={handleRefresh}
                            >
                                Làm mới
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default CustomerFilterModal;
