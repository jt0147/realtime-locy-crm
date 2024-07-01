import { useEffect, useState } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Switch,
} from "@nextui-org/react";
import { isEqual } from "lodash";

import { permissionAccount } from "@/constants";
import { TUpdateEmployeeRequest } from "@/types";
import { notification } from "@/utilities";

import { TUpdateModalProps } from "../types";

const ChangePermissionModal = ({
    isOpen,
    onClose: onCloseProp,
    onSubmit,
    title = "cập nhật quyền tài khoản nhân viên",
    size = "3xl",
    loading,
    item,
}: TUpdateModalProps<TUpdateEmployeeRequest>) => {
    const [data, setData] = useState<TUpdateEmployeeRequest | null>(null);
    const [isPermissionCheckAll, setIsPermissionCheckAll] =
        useState<boolean>(false);

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

    const handlePermissionCheckAll = (checked: boolean) => {
        if (checked) {
            const rs = permissionAccount.map((e) => e.value);
            const permissionStr = `;${rs.join(";")}`;
            setData((prev) => {
                if (prev) return { ...prev, permission: permissionStr };
                return null;
            });
        } else {
            setData((prev) => {
                if (prev) return { ...prev, permission: "" };
                return null;
            });
        }
    };

    const handlePermissionChange = (checked: boolean, value: string) => {
        let permissionsArr = data?.permission?.split(";") || [];
        permissionsArr?.shift();

        if (checked) {
            permissionsArr.push(value);
        }

        if (!checked) {
            permissionsArr = permissionsArr.filter((e) => e !== value);
        }

        const permissionStr =
            permissionsArr.length > 0 ? `;${permissionsArr.join(";")}` : "";

        setData((prev) => {
            if (prev) return { ...prev, permission: permissionStr };
            return null;
        });
    };

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
                                <div className="space-y-4">
                                    <div className="flex justify-end">
                                        <div
                                            className="flex items-center gap-2 cursor-pointer"
                                            onClick={() => {
                                                handlePermissionCheckAll(
                                                    !isPermissionCheckAll
                                                );
                                                setIsPermissionCheckAll(
                                                    (prev) => !prev
                                                );
                                            }}
                                        >
                                            <input
                                                checked={isPermissionCheckAll}
                                                readOnly
                                                id="isCheckAll"
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <span className="first-letter:uppercase">
                                                chọn tất cả
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {permissionAccount.map(
                                            (item, index) => (
                                                <div key={index}>
                                                    <Switch
                                                        isSelected={data.permission.includes(
                                                            item.value
                                                        )}
                                                        onValueChange={(
                                                            isSelected
                                                        ) =>
                                                            handlePermissionChange(
                                                                isSelected,
                                                                item.value
                                                            )
                                                        }
                                                        size="sm"
                                                    >
                                                        <p className="text-sm first-letter:uppercase">
                                                            {item.label}
                                                        </p>
                                                    </Switch>
                                                </div>
                                            )
                                        )}
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

export default ChangePermissionModal;
