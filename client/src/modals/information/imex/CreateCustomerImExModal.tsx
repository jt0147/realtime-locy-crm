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

import { getPortsByIdCountry } from "@/api";
import { AutoComplete } from "@/components";
import { TCountryDto, TCreateCustomerImExRequest, TPortDto } from "@/types";

import { TCreateModalProps } from "../../types";

const CreateCustomerImExModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "tạo xuất nhập khẩu",
    size = "5xl",
    loading,
    data,
    setData,
    countries,
}: TCreateModalProps<TCreateCustomerImExRequest> & {
    countries: TCountryDto[] | [];
}) => {
    const [portsFrom, setPortsFrom] = useState<TPortDto[] | []>([]);
    const [portsTo, setPortsTo] = useState<TPortDto[] | []>([]);

    const { data: portsFromRes } = useQuery({
        queryKey: ["portsFrom", data.idFromCountry],
        queryFn: () => getPortsByIdCountry(data.idFromCountry as number),
        cacheTime: Infinity,
        staleTime: Infinity,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            data.idFromCountry !== undefined,
    });

    const { data: portsToRes } = useQuery({
        queryKey: ["portsTo", data.idToCountry],
        queryFn: () => getPortsByIdCountry(data.idToCountry as number),
        cacheTime: Infinity,
        staleTime: Infinity,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            data.idToCountry !== undefined,
    });

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
                            <div className="grid gap-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        type="date"
                                        label="Ngày thực hiện"
                                        value={data.date}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                date: e.target.value,
                                            }))
                                        }
                                    />
                                    <Input
                                        label="Loại"
                                        value={data.type}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                type: e.target.value,
                                            }))
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
                                            data.idFromCountry?.toString() || ""
                                        }
                                        onSelectionChange={(val) => {
                                            setData((prev) => ({
                                                ...prev,
                                                idFromCountry:
                                                    val !== ""
                                                        ? parseInt(
                                                              val as string
                                                          )
                                                        : undefined,
                                            }));
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
                                            data.idFromPort?.toString() || ""
                                        }
                                        onSelectionChange={(val) => {
                                            setData((prev) => ({
                                                ...prev,
                                                idFromPort:
                                                    val !== ""
                                                        ? parseInt(
                                                              val as string
                                                          )
                                                        : undefined,
                                            }));
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
                                            data.idToCountry?.toString() || ""
                                        }
                                        onSelectionChange={(val) => {
                                            setData((prev) => ({
                                                ...prev,
                                                idToCountry:
                                                    val !== ""
                                                        ? parseInt(
                                                              val as string
                                                          )
                                                        : undefined,
                                            }));
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
                                        value={data.idToPort?.toString() || ""}
                                        onSelectionChange={(val) => {
                                            setData((prev) => ({
                                                ...prev,
                                                idToPort:
                                                    val !== ""
                                                        ? parseInt(
                                                              val as string
                                                          )
                                                        : undefined,
                                            }));
                                        }}
                                        required={true}
                                    />
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <Input
                                        label="HS Code"
                                        value={data.code}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                code: e.target.value,
                                            }))
                                        }
                                    />
                                    <Input
                                        label="Term"
                                        value={data.term}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                term: e.target.value,
                                            }))
                                        }
                                    />
                                    <Input
                                        label="Commd"
                                        value={data.commd}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                commd: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <Input
                                        label="Vessel"
                                        value={data.vessel}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                vessel: e.target.value,
                                            }))
                                        }
                                    />
                                    <Input
                                        label="Vol"
                                        value={data.vol}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                vol: e.target.value,
                                            }))
                                        }
                                    />
                                    <Input
                                        label="Unt"
                                        value={data.unt}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                unt: e.target.value,
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
                                onPress={onSubmit}
                                isLoading={loading}
                                disabled={loading}
                            >
                                {loading ? "Đang tạo..." : "Tạo"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default CreateCustomerImExModal;
