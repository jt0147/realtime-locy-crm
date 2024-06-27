import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { Button, Input } from "@nextui-org/react";

import { changePassword } from "@/api";
import { useAuth } from "@/contexts";
import { TAuthContextProps, TChangePasswordRequest } from "@/types";
import { notification } from "@/utilities";

const ChangePasswordSection = () => {
    const { user }: TAuthContextProps = useAuth();

    const [payload, setPayload] = useState({
        password: "",
        newPassword: "",
        reNewPassword: "",
    });

    const changePasswordMutation = useMutation({
        mutationFn: changePassword,
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (
            payload.password === "" ||
            payload.newPassword === "" ||
            payload.reNewPassword === ""
        ) {
            notification(false, "Bạn cần nhập đủ thông tin!");
            return;
        }

        if (payload.newPassword !== payload.reNewPassword) {
            notification(false, "Mật khẩu mới không khớp!");
            return;
        }

        const payloadData: TChangePasswordRequest = {
            id: user?.id as number,
            password: payload.password,
            newPassword: payload.newPassword,
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res: any = await changePasswordMutation.mutateAsync(payloadData);

        if (res.status) {
            setPayload({ password: "", newPassword: "", reNewPassword: "" });
        }
    };

    return (
        <section>
            <form
                className="w-full max-w-[28rem] p-8 mx-auto space-y-4"
                onSubmit={handleSubmit}
            >
                <div className="space-y-2">
                    <Input
                        label="Nhập mật khẩu"
                        type="password"
                        value={payload.password}
                        onChange={(e) =>
                            setPayload((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                    />
                    <Input
                        label="Nhập mật khẩu mới"
                        type="password"
                        value={payload.newPassword}
                        onChange={(e) =>
                            setPayload((prev) => ({
                                ...prev,
                                newPassword: e.target.value,
                            }))
                        }
                    />
                    <Input
                        label="Nhập lại mật khẩu mới"
                        type="password"
                        value={payload.reNewPassword}
                        onChange={(e) =>
                            setPayload((prev) => ({
                                ...prev,
                                reNewPassword: e.target.value,
                            }))
                        }
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full text-white"
                    color="success"
                    isLoading={changePasswordMutation.isLoading}
                    disabled={changePasswordMutation.isLoading}
                >
                    {changePasswordMutation.isLoading
                        ? "Đang đổi mật khẩu"
                        : "Đổi mật khẩu"}
                </Button>
            </form>
        </section>
    );
};

export default ChangePasswordSection;
