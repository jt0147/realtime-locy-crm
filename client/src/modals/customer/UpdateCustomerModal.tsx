import { useEffect, useState } from "react";
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Textarea,
} from "@nextui-org/react";
import { useQuery } from "react-query";
import { isEqual } from "lodash";

import { getAllBusinesses, getAllCountries, getCitiesByIdCountry } from "@/api";
import { AutoComplete, Select } from "@/components";
import {
    TBusinessDto,
    TCityDto,
    TCountryDto,
    TUpdateCustomerRequest,
} from "@/types";

import { TUpdateModalProps } from "../types";
import { notification } from "@/utilities";

const UpdateCustomerModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "cập nhật thông tin khách",
    size = "5xl",
    loading,
    item,
}: TUpdateModalProps<TUpdateCustomerRequest>) => {
    const [data, setData] = useState<TUpdateCustomerRequest | null>(null);
    const [countries, setCountries] = useState<TCountryDto[] | []>([]);
    const [cities, setCities] = useState<TCityDto[] | []>([]);
    const [businesses, setBusinesses] = useState<TBusinessDto[] | []>([]);

    const { data: countriesRes } = useQuery({
        queryKey: "countries",
        queryFn: getAllCountries,
        refetchOnWindowFocus: false,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    const { data: citiesRes } = useQuery({
        queryKey: ["cities", data?.idCountry],
        queryFn: () => getCitiesByIdCountry(data?.idCountry as number),
        keepPreviousData: true,
        refetchOnWindowFocus: true,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            data != null &&
            data.idCountry !== null &&
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

    /**
     * * Handle events
     */
    const handleSubmit = async () => {
        if (isEqual(data, item)) {
            notification(false, "Thông tin không thay đổi");
            return;
        }

        if (data) {
            await onSubmit(data);
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

    useEffect(() => {
        setData(item);
    }, [item]);

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
                            {data && (
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <Input
                                                label="Mã"
                                                required
                                                value={data.code}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  code: e.target
                                                                      .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                            <Input
                                                label="Mã số thuế"
                                                value={data.taxCode}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  taxCode:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
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
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  idTypeOfBusiness:
                                                                      e.target
                                                                          .value !==
                                                                      ""
                                                                          ? parseInt(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                          : undefined,
                                                              }
                                                            : null
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <Input
                                                label="Tên (VI)"
                                                required
                                                value={data.nameVI}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  nameVI: e
                                                                      .target
                                                                      .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                            <Input
                                                label="Tên (EN)"
                                                value={data.nameEN}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  nameEN: e
                                                                      .target
                                                                      .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <Input
                                                label="Địa chỉ (VI)"
                                                required
                                                value={data.addressVI}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  addressVI:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                            <Input
                                                label="Địa chỉ (EN)"
                                                value={data.addressEN}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  addressEN:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
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
                                                value={
                                                    data.idCountry?.toString() ||
                                                    ""
                                                }
                                                onSelectionChange={(val) => {
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  idCountry:
                                                                      val !== ""
                                                                          ? parseInt(
                                                                                val as string
                                                                            )
                                                                          : undefined,
                                                              }
                                                            : null
                                                    );
                                                }}
                                            />
                                            <AutoComplete
                                                label="Thành phố"
                                                options={cities}
                                                option={{
                                                    label: "nameVI",
                                                    key: "id",
                                                }}
                                                value={
                                                    data.idCity?.toString() ||
                                                    ""
                                                }
                                                onSelectionChange={(val) => {
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  idCity:
                                                                      val !== ""
                                                                          ? parseInt(
                                                                                val as string
                                                                            )
                                                                          : undefined,
                                                              }
                                                            : null
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-4 gap-4">
                                            <Input
                                                label="Số điện thoại"
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  phone: e
                                                                      .target
                                                                      .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                            <Input
                                                label="FAX"
                                                value={data.fax}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  fax: e.target
                                                                      .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                            <Input
                                                label="Thư điện tử"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  email: e
                                                                      .target
                                                                      .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                            <Input
                                                label="Trang web"
                                                value={data.website}
                                                onChange={(e) =>
                                                    setData((prev) =>
                                                        prev
                                                            ? {
                                                                  ...prev,
                                                                  website:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : null
                                                    )
                                                }
                                            />
                                        </div>
                                        <Textarea
                                            label="Ghi chú"
                                            value={data.note}
                                            onChange={(e) =>
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              note: e.target
                                                                  .value,
                                                          }
                                                        : null
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            )}
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
                                isLoading={loading}
                                disabled={loading}
                            >
                                {loading ? "Đang cập nhật..." : "Cập nhật"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default UpdateCustomerModal;
