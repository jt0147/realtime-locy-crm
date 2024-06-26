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
} from "@nextui-org/react";
import { isEqual } from "lodash";

import { getPortsByIdCountry } from "@/api";
import { AutoComplete } from "@/components";
import { TCountryDto, TPortDto, TUpdateCustomerImExRequest } from "@/types";
import { notification } from "@/utilities";

import { TUpdateModalProps } from "../../types";

const UpdateCustomerImExModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "cập nhật tuyến hàng",
    size = "5xl",
    loading,
    item,
    countries,
}: TUpdateModalProps<TUpdateCustomerImExRequest> & {
    countries: TCountryDto[] | [];
}) => {
    const [data, setData] = useState<TUpdateCustomerImExRequest | null>(null);

    const [portsFrom, setPortsFrom] = useState<TPortDto[] | []>([]);
    const [portsTo, setPortsTo] = useState<TPortDto[] | []>([]);

    const { data: portsFromRes } = useQuery({
        queryKey: ["portsFrom", data?.idFromCountry],
        queryFn: () => getPortsByIdCountry(data?.idFromCountry as number),
        cacheTime: Infinity,
        staleTime: Infinity,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            data !== null &&
            data?.idFromCountry !== undefined,
    });

    const { data: portsToRes } = useQuery({
        queryKey: ["portsTo", data?.idToCountry],
        queryFn: () => getPortsByIdCountry(data?.idToCountry as number),
        cacheTime: Infinity,
        staleTime: Infinity,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            data !== null &&
            data?.idToCountry !== undefined,
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
        if (portsFromRes && portsFromRes.status) {
            setPortsFrom(portsFromRes.data as unknown as TPortDto[]);
        }
    }, [portsFromRes]);

    useEffect(() => {
        if (portsToRes && portsToRes.status) {
            setPortsTo(portsToRes.data as unknown as TPortDto[]);
        }
    }, [portsToRes]);

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
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <Input
                                            type="date"
                                            label="Ngày thực hiện"
                                            value={data.date}
                                            onChange={(e) =>
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              date: e.target
                                                                  .value,
                                                          }
                                                        : null
                                                )
                                            }
                                        />
                                        <Input
                                            label="Loại"
                                            value={data.type}
                                            onChange={(e) =>
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              type: e.target
                                                                  .value,
                                                          }
                                                        : null
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <AutoComplete
                                            label="Quốc gia đi"
                                            options={countries}
                                            option={{
                                                label: "nameVI",
                                                key: "id",
                                            }}
                                            value={
                                                data.idFromCountry?.toString() ||
                                                ""
                                            }
                                            onSelectionChange={(val) => {
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              idFromCountry:
                                                                  val !== ""
                                                                      ? parseInt(
                                                                            val as string
                                                                        )
                                                                      : undefined,
                                                          }
                                                        : null
                                                );
                                            }}
                                            required={true}
                                        />
                                        <AutoComplete
                                            label="Cảng đi"
                                            options={portsFrom}
                                            option={{
                                                label: "nameVI",
                                                key: "id",
                                            }}
                                            value={
                                                data.idFromPort?.toString() ||
                                                ""
                                            }
                                            onSelectionChange={(val) => {
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              idFromPort:
                                                                  val !== ""
                                                                      ? parseInt(
                                                                            val as string
                                                                        )
                                                                      : undefined,
                                                          }
                                                        : null
                                                );
                                            }}
                                            required={true}
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <AutoComplete
                                            label="Quốc gia đến"
                                            options={countries}
                                            option={{
                                                label: "nameVI",
                                                key: "id",
                                            }}
                                            value={
                                                data.idToCountry?.toString() ||
                                                ""
                                            }
                                            onSelectionChange={(val) => {
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              idToCountry:
                                                                  val !== ""
                                                                      ? parseInt(
                                                                            val as string
                                                                        )
                                                                      : undefined,
                                                          }
                                                        : null
                                                );
                                            }}
                                            required={true}
                                        />
                                        <AutoComplete
                                            label="Cảng đến"
                                            options={portsTo}
                                            option={{
                                                label: "nameVI",
                                                key: "id",
                                            }}
                                            value={
                                                data.idToPort?.toString() || ""
                                            }
                                            onSelectionChange={(val) => {
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              idToPort:
                                                                  val !== ""
                                                                      ? parseInt(
                                                                            val as string
                                                                        )
                                                                      : undefined,
                                                          }
                                                        : null
                                                );
                                            }}
                                            required={true}
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <Input
                                            label="HS Code"
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
                                            label="Term"
                                            value={data.term}
                                            onChange={(e) =>
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              term: e.target
                                                                  .value,
                                                          }
                                                        : null
                                                )
                                            }
                                        />
                                        <Input
                                            label="Commd"
                                            value={data.commd}
                                            onChange={(e) =>
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              commd: e.target
                                                                  .value,
                                                          }
                                                        : null
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <Input
                                            label="Vessel"
                                            value={data.vessel}
                                            onChange={(e) =>
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              vessel: e.target
                                                                  .value,
                                                          }
                                                        : null
                                                )
                                            }
                                        />
                                        <Input
                                            label="Vol"
                                            value={data.vol}
                                            onChange={(e) =>
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              vol: e.target
                                                                  .value,
                                                          }
                                                        : null
                                                )
                                            }
                                        />
                                        <Input
                                            label="Unt"
                                            value={data.unt}
                                            onChange={(e) =>
                                                setData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              unt: e.target
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

export default UpdateCustomerImExModal;
