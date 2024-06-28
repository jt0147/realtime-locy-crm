import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
} from "@nextui-org/react";
import { isEqual } from "lodash";

import { getCitiesByIdCountry } from "@/api";
import { AutoComplete } from "@/components";
import { TCityDto, TCountryDto, TUpdateOfficeRequest } from "@/types";
import { notification } from "@/utilities";

import { TUpdateModalProps } from "../../types";

const UpdateOfficeModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "cập nhật văn phòng",
    size = "5xl",
    loading,
    item,
    countries,
}: TUpdateModalProps<TUpdateOfficeRequest> & {
    countries: TCountryDto[] | [];
}) => {
    const [data, setData] = useState<TUpdateOfficeRequest | null>(null);
    const [cities, setCities] = useState<TCityDto[] | []>([]);

    const { data: citiesRes } = useQuery({
        queryKey: ["cities", data?.idCountry],
        queryFn: () => getCitiesByIdCountry(data?.idCountry as number),
        keepPreviousData: true,
        refetchOnWindowFocus: true,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            data !== null &&
            data.idCountry !== null &&
            data.idCountry !== undefined,
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
        if (citiesRes && citiesRes.status) {
            setCities(citiesRes.data as unknown as TCityDto[]);
        }
    }, [citiesRes]);

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
                                <div className="grid gap-4">
                                    <div className="grid md:grid-cols-4 gap-2">
                                        <Input
                                            label="Mã"
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
                                            required={true}
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
                                        <AutoComplete
                                            label="Quốc gia"
                                            options={countries}
                                            option={{
                                                label: "nameVI",
                                                key: "id",
                                            }}
                                            value={
                                                data.idCountry !== null
                                                    ? data.idCountry?.toString()
                                                    : ""
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
                                                data.idCity !== null
                                                    ? data.idCity?.toString()
                                                    : ""
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
                                    <div className="grid md:grid-cols-4 gap-2">
                                        <Textarea
                                            label="Tên VI"
                                            value={data.nameVI}
                                            onChange={(e) =>
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              nameVI: e.target
                                                                  .value,
                                                          }
                                                        : null
                                                )
                                            }
                                        />
                                        <Textarea
                                            label="Tên EN"
                                            value={data.nameEN}
                                            onChange={(e) =>
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              nameEN: e.target
                                                                  .value,
                                                          }
                                                        : null
                                                )
                                            }
                                        />
                                        <Textarea
                                            label="Địa chỉ VI"
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
                                        <Textarea
                                            label="Địa chỉ EN"
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
                                    <div className="grid md:grid-cols-4 gap-2">
                                        <Input
                                            label="Số điện thoại"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              phone: e.target
                                                                  .value,
                                                          }
                                                        : null
                                                )
                                            }
                                        />
                                        <Input
                                            label="Fax"
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
                                            label="Email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              email: e.target
                                                                  .value,
                                                          }
                                                        : null
                                                )
                                            }
                                        />
                                        <Input
                                            label="Website"
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
                                    <div className="grid md:grid-cols-4 gap-2">
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

export default UpdateOfficeModal;
