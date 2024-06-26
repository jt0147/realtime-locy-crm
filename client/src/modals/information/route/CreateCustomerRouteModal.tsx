import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";

import { getPortsByIdCountry } from "@/api";
import { AutoComplete, Select } from "@/components";
import {
    TCountryDto,
    TCreateCustomerRouteRequest,
    TPortDto,
    TTransportationDto,
} from "@/types";

import { TCreateModalProps } from "../../types";

const CreateCustomerRouteModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "tạo tuyến hàng",
    size = "5xl",
    loading,
    data,
    setData,
    transportations,
    countries,
}: TCreateModalProps<TCreateCustomerRouteRequest> & {
    transportations: TTransportationDto[] | [];
    countries: TCountryDto[] | [];
}) => {
    const [portsFrom, setPortsFrom] = useState<TPortDto[] | []>([]);
    const [portsTo, setPortsTo] = useState<TPortDto[] | []>([]);

    const { data: portsFromRes } = useQuery({
        queryKey: ["portsFrom", data.idQuocGiaDi],
        queryFn: () => getPortsByIdCountry(data.idQuocGiaDi as number),
        cacheTime: Infinity,
        staleTime: Infinity,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            data.idQuocGiaDi !== undefined,
    });

    const { data: portsToRes } = useQuery({
        queryKey: ["portsTo", data.idQuocGiaDen],
        queryFn: () => getPortsByIdCountry(data.idQuocGiaDen as number),
        cacheTime: Infinity,
        staleTime: Infinity,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            data.idQuocGiaDen !== undefined,
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
                                <Select
                                    label="Loại hình vận chuyển"
                                    options={transportations}
                                    option={{
                                        label: "nameVI",
                                        key: "id",
                                    }}
                                    value={
                                        data.idLoaiHinhVanChuyen
                                            ? data.idLoaiHinhVanChuyen.toString()
                                            : undefined
                                    }
                                    onChange={(e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            idLoaiHinhVanChuyen:
                                                e.target.value !== ""
                                                    ? parseInt(e.target.value)
                                                    : undefined,
                                        }));
                                    }}
                                    required={true}
                                />
                                <div className="grid md:grid-cols-2 gap-4">
                                    <AutoComplete
                                        label="Quốc gia đi"
                                        options={countries}
                                        option={{
                                            label: "nameVI",
                                            key: "id",
                                        }}
                                        value={
                                            data.idQuocGiaDi?.toString() || ""
                                        }
                                        onSelectionChange={(val) => {
                                            setData((prev) => ({
                                                ...prev,
                                                idQuocGiaDi:
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
                                        value={data.idCangDi?.toString() || ""}
                                        onSelectionChange={(val) => {
                                            setData((prev) => ({
                                                ...prev,
                                                idCangDi:
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
                                            data.idQuocGiaDen?.toString() || ""
                                        }
                                        onSelectionChange={(val) => {
                                            setData((prev) => ({
                                                ...prev,
                                                idQuocGiaDen:
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
                                        value={data.idCangDen?.toString() || ""}
                                        onSelectionChange={(val) => {
                                            setData((prev) => ({
                                                ...prev,
                                                idCangDen:
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

export default CreateCustomerRouteModal;
