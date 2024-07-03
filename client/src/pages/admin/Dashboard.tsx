import { Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Cell,
} from "recharts";

import {
    getAllOffices,
    getDataDashboard,
    getDataEmployeeDashboard,
} from "@/api";
import { Loading, Select } from "@/components";
import { useAuth } from "@/contexts";
import {
    TAuthContextProps,
    TDashboardDataDto,
    TDashboardDataEmployeeDto,
    TOfficeDto,
} from "@/types";

const COLORS = [
    "#519DE9",
    "#7CC674",
    "#73C5C5",
    "#8481DD",
    "#F6D173",
    "#EF9234",
    "#A30000",
];

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState<TDashboardDataDto>();
    const [dashboardEmployeeData, setDashboardEmployeeData] =
        useState<TDashboardDataEmployeeDto>([]);
    const [offices, setOffices] = useState<TOfficeDto[] | []>([]);
    const [idOffice, setIdOffice] = useState<number | undefined>(undefined);

    const { user }: TAuthContextProps = useAuth();

    const { data: dashboardDataRes, isLoading: isLoadingDashboardData } =
        useQuery({
            queryKey: "dashboardData",
            queryFn: getDataDashboard,
            refetchOnWindowFocus: false,
            enabled:
                localStorage.getItem("token") != null &&
                localStorage.getItem("token") != "",
        });

    const {
        data: dashboardDataEmployeeRes,
        isLoading: isLoadingDashboardDataEmployee,
    } = useQuery({
        queryKey: ["dashboardDataEmployee", idOffice],
        queryFn: () => getDataEmployeeDashboard(idOffice as number),
        refetchOnWindowFocus: false,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "" &&
            idOffice != undefined,
    });

    const { data: officesRes } = useQuery({
        queryKey: "offices",
        queryFn: getAllOffices,
        refetchOnWindowFocus: false,
        enabled:
            localStorage.getItem("token") != null &&
            localStorage.getItem("token") != "",
    });

    useEffect(() => {
        if (dashboardDataRes && dashboardDataRes.status) {
            setDashboardData(
                dashboardDataRes.data as unknown as TDashboardDataDto
            );
        }
    }, [dashboardDataRes]);

    useEffect(() => {
        if (dashboardDataEmployeeRes && dashboardDataEmployeeRes.status) {
            setDashboardEmployeeData(
                dashboardDataEmployeeRes.data as unknown as TDashboardDataEmployeeDto
            );
        }
    }, [dashboardDataEmployeeRes]);

    useEffect(() => {
        if (officesRes && officesRes.status) {
            setOffices(officesRes.data as unknown as TOfficeDto[]);
        }
    }, [officesRes]);

    useEffect(() => {
        if (offices.length > 0 && idOffice === undefined) {
            setIdOffice(offices[0].id);
        }
    }, [idOffice, offices]);

    if (isLoadingDashboardData || isLoadingDashboardDataEmployee) {
        return (
            <div className="p-4 bg-white rounded-lg mt-4">
                <Loading size="3xl" />
            </div>
        );
    }

    return (
        <Fragment>
            <div className="space-y-8">
                <div className="p-4 bg-white rounded-lg mt-4">
                    <h2 className="title">dashboard</h2>
                </div>
                <div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="max-w-96 flex-1 flex flex-col items-center gap-2 bg-green-600 text-white p-5 rounded-lg">
                            <p className="font-semibold first-letter:uppercase">
                                số lượng nhân viên
                            </p>
                            <p className="text-2xl font-semibold">
                                {dashboardData?.totalEmployee}
                            </p>
                        </div>
                        <div className="max-w-96 flex-1 flex flex-col items-center gap-2 bg-teal-600 text-white p-5 rounded-lg">
                            <p className="font-semibold first-letter:uppercase">
                                Số lượng khách hàng
                            </p>
                            <p className="text-2xl font-semibold">
                                {dashboardData?.totalCustomer}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex gap-5">
                        <div className="bg-white space-y-4 p-4 max-w-96 flex-1 rounded-lg">
                            <div className="text-lg font-semibold first-letter:uppercase text-gray-900">
                                hoạt động gần đây
                            </div>
                            <div className="grid gap-5">
                                {dashboardData?.mostRecentActivities?.map(
                                    (activity) => (
                                        <div
                                            className="space-y-2"
                                            key={activity.id}
                                        >
                                            {user?.id === activity.senderId && (
                                                <div className="text-sm font-medium">
                                                    {activity.senderMessage}
                                                </div>
                                            )}
                                            {user?.id ===
                                                activity.receiverId && (
                                                <div className="text-sm font-medium">
                                                    {activity.receiverMessage}
                                                </div>
                                            )}
                                            {user?.id ===
                                                activity.relatedId && (
                                                <div className="text-sm font-medium">
                                                    {activity.relatedMessage}
                                                </div>
                                            )}
                                            <div className="text-xs">
                                                {activity.createdAt}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="bg-white space-y-4 p-4 max-w-96 flex-1 rounded-lg">
                            <div className="text-lg font-semibold first-letter:uppercase text-gray-900">
                                lịch sử tác nghiệp
                            </div>
                            <div className="grid gap-5">
                                {dashboardData?.operationalHistory?.map(
                                    (operational) => (
                                        <div
                                            className="space-y-2"
                                            key={operational.id}
                                        >
                                            <div className="text-sm font-medium">
                                                {operational.noiDung}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="text-xs font-medium">
                                                    {operational.loaiTacNghiep}:
                                                </div>
                                                <div className="text-xs">
                                                    {operational.dateCreate}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2">
                    <div className="bg-white space-y-4 p-4 md:col-span-2">
                        <div className="flex justify-between items-center gap-2">
                            <div className="text-xl font-semibold first-letter:uppercase flex-shrink-0 text-gray-900">
                                biểu đồ nhân viên
                            </div>
                            {idOffice !== undefined && (
                                <div className="max-w-64 w-full">
                                    <Select
                                        label="Văn phòng"
                                        options={offices}
                                        option={{ label: "nameVI", key: "id" }}
                                        disallowEmptySelection
                                        value={idOffice?.toString()}
                                        onChange={(e) =>
                                            setIdOffice(
                                                parseInt(e.target.value)
                                            )
                                        }
                                    />
                                </div>
                            )}
                        </div>
                        <ResponsiveContainer className="w-full max-h-96 rounded-lg">
                            <BarChart
                                width={500}
                                height={300}
                                data={dashboardEmployeeData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <XAxis
                                    className="text-xs font-semibold"
                                    dataKey="department"
                                />
                                <YAxis
                                    className="text-xs"
                                    dataKey="totalEmployee"
                                />
                                <Bar
                                    dataKey="totalEmployee"
                                    label={{ position: "top" }}
                                >
                                    {dashboardEmployeeData.map(
                                        (item, index) => (
                                            <Cell
                                                key={`cell-${item.totalEmployee}`}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        )
                                    )}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;
