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

import { getCitiesByIdCountry } from "@/api";
import { AutoComplete } from "@/components";
import { TCityDto, TCountryDto, TCreatePortRequest } from "@/types";

import { TCreateModalProps } from "../../types";

const CreatePortModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "tạo cảng",
    size = "5xl",
    loading,
    data,
    setData,
    countries,
}: TCreateModalProps<TCreatePortRequest> & {
    countries: TCountryDto[] | [];
}) => {
    const [cities, setCities] = useState<TCityDto[] | []>([]);

    const { data: citiesRes } = useQuery({
        queryKey: ["cities", data.idQuocGia],
        queryFn: () => getCitiesByIdCountry(data.idQuocGia as number),
        cacheTime: Infinity,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            data.idQuocGia !== undefined,
    });

    useEffect(() => {
        if (citiesRes && citiesRes.status) {
            setCities(citiesRes.data as unknown as TCityDto[]);
        }
    }, [citiesRes]);

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
                                        label="Mã"
                                        value={data.code}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                code: e.target.value,
                                            }))
                                        }
                                        required={true}
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
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Textarea
                                        label="Tên VI"
                                        value={data.nameVI}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                nameVI: e.target.value,
                                            }))
                                        }
                                    />
                                    <Textarea
                                        label="Tên EN"
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
                                    <Textarea
                                        label="Địa chỉ VI"
                                        value={data.addressVI}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                addressVI: e.target.value,
                                            }))
                                        }
                                    />
                                    <Textarea
                                        label="Địa chỉ EN"
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
                                        value={data.idQuocGia?.toString() || ""}
                                        onSelectionChange={(val) => {
                                            setData((prev) => ({
                                                ...prev,
                                                idQuocGia:
                                                    val !== ""
                                                        ? parseInt(
                                                              val as string
                                                          )
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
                                                        ? parseInt(
                                                              val as string
                                                          )
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
                                        label="Số FAX"
                                        value={data.fax}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                fax: e.target.value,
                                            }))
                                        }
                                    />
                                    <Input
                                        label="Email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                email: e.target.value,
                                            }))
                                        }
                                    />
                                    <Input
                                        label="Website"
                                        value={data.website}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                website: e.target.value,
                                            }))
                                        }
                                    />
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

export default CreatePortModal;
