import { Tabs, Tab } from "@nextui-org/react";

import { useAuth } from "@/contexts";
import { ChangePasswordSection, SettingSystemSection } from "@/layouts";
import { TAuthContextProps } from "@/types";

const Setting = () => {
    const { user }: TAuthContextProps = useAuth();

    return (
        <>
            <div className="bg-white p-4 rounded-lg mt-4">
                <h2 className="title">cài đặt</h2>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
                <Tabs
                    aria-label="Options"
                    color="primary"
                    variant="underlined"
                    classNames={{
                        tabList:
                            "gap-0 w-full relative rounded-none p-0 border-b border-divider flex-wrap",
                        cursor: "w-full bg-[#70BC41]",
                        tab: "max-w-fit px-[6px] h-12",
                        tabContent: "group-data-[selected=true]:text-[#70BC41]",
                    }}
                >
                    {user?.permission.includes("1048576") && (
                        <Tab
                            key="system"
                            title={
                                <p className="font-medium text-sm">
                                    Cài đặt hệ thống
                                </p>
                            }
                        >
                            <SettingSystemSection />
                        </Tab>
                    )}
                    <Tab
                        key="password"
                        title={
                            <p className="font-medium text-sm">Đổi mật khẩu</p>
                        }
                    >
                        <ChangePasswordSection />
                    </Tab>
                </Tabs>
            </div>
        </>
    );
};

export default Setting;
