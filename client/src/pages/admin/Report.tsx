import { Tabs, Tab } from "@nextui-org/react";

import { ReportWorkTable } from "@/layouts";

const Report = () => {
    return (
        <>
            <div className="bg-white p-4 rounded-lg mt-4">
                <h2 className="title">báo cáo</h2>
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
                    <Tab
                        key="operationals"
                        title={
                            <p className="font-medium text-sm">
                                Công việc thực hiện
                            </p>
                        }
                    >
                        <ReportWorkTable />
                    </Tab>
                </Tabs>
            </div>
        </>
    );
};

export default Report;
