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

import { AutoComplete } from "@/components";
import { TCountryDto, TCreateCityRequest } from "@/types";

import { TCreateModalProps } from "../../types";

const CreateCityModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "tạo thành phố",
    size = "sm",
    loading,
    data,
    setData,
    countries,
}: TCreateModalProps<TCreateCityRequest> & {
    countries: TCountryDto[] | [];
}) => {
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
                                                    ? parseInt(val as string)
                                                    : undefined,
                                        }));
                                    }}
                                    required={true}
                                />
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

export default CreateCityModal;
