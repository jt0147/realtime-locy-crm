import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Button, Input, Textarea } from "@nextui-org/react";

import {
    createCustomer,
    getAllBusinesses,
    getAllCountries,
    getCitiesByIdCountry,
} from "@/api";
import { AutoComplete, Select } from "@/components";
import { useAuth } from "@/contexts";
import {
    TAuthContextProps,
    TBusinessDto,
    TCityDto,
    TCountryDto,
    TCreateCustomerRequest,
} from "@/types";

const initCustomer: TCreateCustomerRequest = {
    idTypeOfBusiness: undefined,
    idCountry: undefined,
    idCity: undefined,
    code: "",
    nameVI: "",
    nameEN: "",
    addressVI: "",
    addressEN: "",
    taxCode: "",
    phone: "",
    fax: "",
    email: "",
    website: "",
    note: "",
    idUserCreate: undefined,
};

const CreateCustomer = () => {
    const [data, setData] = useState<TCreateCustomerRequest>(initCustomer);
    const [countries, setCountries] = useState<TCountryDto[] | []>([]);
    const [cities, setCities] = useState<TCityDto[] | []>([]);
    const [businesses, setBusinesses] = useState<TBusinessDto[] | []>([]);

    const { user }: TAuthContextProps = useAuth();

    const { data: countriesRes } = useQuery({
        queryKey: "countries",
        queryFn: getAllCountries,
        refetchOnWindowFocus: false,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    const { data: citiesRes } = useQuery({
        queryKey: ["cities", data.idCountry],
        queryFn: () => getCitiesByIdCountry(data.idCountry as number),
        keepPreviousData: true,
        refetchOnWindowFocus: true,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            data.idCountry !== undefined,
    });

    const { data: businessesRes } = useQuery({
        queryKey: ["businesses"],
        queryFn: getAllBusinesses,
        keepPreviousData: true,
        refetchOnWindowFocus: true,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    const createMutation = useMutation({
        mutationFn: createCustomer,
    });

    /**
     * * Handle events
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        data.idUserCreate = user?.id as number;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await createMutation.mutateAsync(data);
        if (result.status) {
            setData(initCustomer);
            setCities([]);
        }
    };

    useEffect(() => {
        if (countriesRes && countriesRes.status) {
            setCountries(countriesRes.data as unknown as TCountryDto[]);
        }
    }, [countriesRes]);

    useEffect(() => {
        if (citiesRes && citiesRes.status) {
            setCities(citiesRes.data as unknown as TCityDto[]);
        }
    }, [citiesRes]);

    useEffect(() => {
        if (businessesRes && businessesRes.status) {
            setBusinesses(businessesRes.data as unknown as TBusinessDto[]);
        }
    }, [businessesRes]);

    return (
        <div className="mt-4 p-4 bg-white rounded-lg space-y-4">
            <h2 className="title">thêm mới khách hàng</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                        <Input
                            label="Mã"
                            required
                            value={data.code}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    code: e.target.value,
                                }))
                            }
                        />
                        <Input
                            label="Mã số thuế"
                            value={data.taxCode}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    taxCode: e.target.value,
                                }))
                            }
                        />
                        <Select
                            label="Loại doanh nghiệp"
                            options={businesses}
                            option={{
                                label: "nameVI",
                                key: "id",
                            }}
                            value={data.idTypeOfBusiness?.toString()}
                            onChange={(e) => {
                                setData((prev) => ({
                                    ...prev,
                                    idTypeOfBusiness:
                                        e.target.value !== ""
                                            ? parseInt(e.target.value)
                                            : undefined,
                                }));
                            }}
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Input
                            label="Tên (VI)"
                            required
                            value={data.nameVI}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    nameVI: e.target.value,
                                }))
                            }
                        />
                        <Input
                            label="Tên (EN)"
                            value={data.nameEN}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    nameEN: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Input
                            label="Địa chỉ (VI)"
                            required
                            value={data.addressVI}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    addressVI: e.target.value,
                                }))
                            }
                        />
                        <Input
                            label="Địa chỉ (EN)"
                            value={data.addressEN}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    addressEN: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <AutoComplete
                            label="Quốc gia"
                            options={countries}
                            option={{
                                label: "nameVI",
                                key: "id",
                            }}
                            value={data.idCountry?.toString() || ""}
                            onSelectionChange={(val) => {
                                setData((prev) => ({
                                    ...prev,
                                    idCountry:
                                        val !== ""
                                            ? parseInt(val as string)
                                            : undefined,
                                }));
                            }}
                        />
                        <AutoComplete
                            label="Thành phố"
                            options={cities}
                            option={{
                                label: "nameVI",
                                key: "id",
                            }}
                            value={data.idCity?.toString() || ""}
                            onSelectionChange={(val) => {
                                setData((prev) => ({
                                    ...prev,
                                    idCity:
                                        val !== ""
                                            ? parseInt(val as string)
                                            : undefined,
                                }));
                            }}
                        />
                    </div>
                    <div className="grid md:grid-cols-4 gap-4">
                        <Input
                            label="Số điện thoại"
                            value={data.phone}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    phone: e.target.value,
                                }))
                            }
                        />
                        <Input
                            label="FAX"
                            value={data.fax}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    fax: e.target.value,
                                }))
                            }
                        />
                        <Input
                            label="Thư điện tử"
                            value={data.email}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                        />
                        <Input
                            label="Trang web"
                            value={data.website}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    website: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <Textarea
                        label="Ghi chú"
                        value={data.note}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                note: e.target.value,
                            }))
                        }
                    />
                </div>
                <Button
                    className="text-white"
                    color="success"
                    type="submit"
                    disabled={createMutation.isLoading}
                    isLoading={createMutation.isLoading}
                >
                    {createMutation.isLoading ? "Đang tạo..." : "Tạo"}
                </Button>
            </form>
        </div>
    );
};

export default CreateCustomer;
