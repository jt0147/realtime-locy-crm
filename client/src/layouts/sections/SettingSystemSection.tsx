import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Button, Input } from "@nextui-org/react";
import { isEqual } from "lodash";

import { getSys, updateSys } from "@/api";
import { TSysRequest } from "@/types";
import { notification } from "@/utilities";

const SettingSystemSection = () => {
    const [payload, setPayload] = useState<TSysRequest>({
        numberOfManagedCustomers: 0,
        dayForReceiveCustomer: 0,
    });

    const { data: sysRes, refetch } = useQuery({
        queryKey: ["sys"],
        queryFn: getSys,
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        enabled:
            localStorage.getItem("token") !== null &&
            localStorage.getItem("token") !== "",
    });

    const settingSysMutation = useMutation({
        mutationFn: updateSys,
    });

    /**
     * * Handle events
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (isEqual(sysRes?.data, payload)) {
            notification(false, "Thông tin chưa thay đổi!");
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res: any = await settingSysMutation.mutateAsync(payload);

        if (res.status) {
            refetch();
        }
    };

    useEffect(() => {
        if (sysRes && sysRes.status) {
            setPayload(sysRes.data as TSysRequest);
        }
    }, [sysRes]);

    return (
        <section>
            <form
                className="w-full max-w-[28rem] p-8 mx-auto space-y-4"
                onSubmit={handleSubmit}
            >
                <div className="space-y-2">
                    <Input
                        label="Số lượng khách hàng"
                        type="number"
                        min="0"
                        value={payload.numberOfManagedCustomers.toString()}
                        onChange={(e) =>
                            setPayload((prev) => ({
                                ...prev,
                                numberOfManagedCustomers: e.target.value
                                    ? parseInt(e.target.value)
                                    : 0,
                            }))
                        }
                    />
                    <Input
                        label="Số ngày nhận"
                        type="number"
                        min="0"
                        value={payload.dayForReceiveCustomer.toString()}
                        onChange={(e) =>
                            setPayload((prev) => ({
                                ...prev,
                                numberOfManagedCustomers: e.target.value
                                    ? parseInt(e.target.value)
                                    : 0,
                            }))
                        }
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full text-white"
                    color="success"
                    isLoading={settingSysMutation.isLoading}
                    disabled={settingSysMutation.isLoading}
                >
                    {settingSysMutation.isLoading ? "Đang cài đặt" : "Cài đặt"}
                </Button>
            </form>
        </section>
    );
};

export default SettingSystemSection;
