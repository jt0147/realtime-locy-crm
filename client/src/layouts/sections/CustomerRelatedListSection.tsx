import { Tabs, Tab } from "@nextui-org/react";

import {
    CustomerClassifyTable,
    CustomerContactTable,
    CustomerEvaluateTable,
    CustomerImExTable,
    CustomerMajorTable,
    CustomerOperationalTable,
    CustomerRouteTable,
} from "../tables";

type TSectionProps = {
    id: number;
    isRefresh: boolean;
    onRefreshDone: () => void;
};

const CustomerRelatedListSection = ({
    id,
    isRefresh,
    onRefreshDone,
}: TSectionProps) => {
    return (
        <div className="min-h-[30vh] space-y-4 p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="sub-title">danh sách liên quan</h3>
            <div>
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
                        key="contacts"
                        title={
                            <p className="font-medium text-sm">
                                Danh sách người liên hệ
                            </p>
                        }
                    >
                        <CustomerContactTable
                            id={id}
                            isRefresh={isRefresh}
                            onRefreshDone={onRefreshDone}
                        />
                    </Tab>
                    <Tab
                        key="operationals"
                        title={
                            <p className="font-medium text-sm">
                                Danh sách tác nghiệp
                            </p>
                        }
                    >
                        <CustomerOperationalTable
                            id={id}
                            isRefresh={isRefresh}
                            onRefreshDone={onRefreshDone}
                        />
                    </Tab>
                    <Tab
                        key="majors"
                        title={
                            <p className="font-medium text-sm">
                                Danh sách nghiệp vụ
                            </p>
                        }
                    >
                        <CustomerMajorTable
                            id={id}
                            isRefresh={isRefresh}
                            onRefreshDone={onRefreshDone}
                        />
                    </Tab>
                    <Tab
                        key="classifies"
                        title={
                            <p className="font-medium text-sm">
                                Danh sách phân loại
                            </p>
                        }
                    >
                        <CustomerClassifyTable
                            id={id}
                            isRefresh={isRefresh}
                            onRefreshDone={onRefreshDone}
                        />
                    </Tab>
                    <Tab
                        key="evaluates"
                        title={
                            <p className="font-medium text-sm">
                                Danh sách đánh giá
                            </p>
                        }
                    >
                        <CustomerEvaluateTable
                            id={id}
                            isRefresh={isRefresh}
                            onRefreshDone={onRefreshDone}
                        />
                    </Tab>
                    <Tab
                        key="routes"
                        title={
                            <p className="font-medium text-sm">
                                Danh sách tuyến hàng
                            </p>
                        }
                    >
                        <CustomerRouteTable
                            id={id}
                            isRefresh={isRefresh}
                            onRefreshDone={onRefreshDone}
                        />
                    </Tab>
                    <Tab
                        key="imex"
                        title={
                            <p className="font-medium text-sm">
                                Danh sách xuất nhập khẩu
                            </p>
                        }
                    >
                        <CustomerImExTable
                            id={id}
                            isRefresh={isRefresh}
                            onRefreshDone={onRefreshDone}
                        />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default CustomerRelatedListSection;
