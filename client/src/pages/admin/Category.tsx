import { Tabs, Tab } from "@nextui-org/react";

import {
    BusinessTable,
    CityTable,
    CountryTable,
    CustomerTypeTable,
    DepartmentTable,
    MajorTable,
    OfficeTable,
    OperationalTable,
    PortTable,
    PositionTable,
    TransportationTable,
    TypeOfCustomerTable,
} from "@/layouts";

const categories = [
    { label: "chức vụ", key: "position", children: <PositionTable /> },
    { label: "phòng ban", key: "department", children: <DepartmentTable /> },
    { label: "văn phòng", key: "office", children: <OfficeTable /> },
    { label: "thành phố", key: "city", children: <CityTable /> },
    { label: "quốc gia", key: "country", children: <CountryTable /> },
    { label: "cảng", key: "port", children: <PortTable /> },
    {
        label: "loại doanh nghiệp",
        key: "business",
        children: <BusinessTable />,
    },
    {
        label: "loại hình vận chuyển",
        key: "transportation",
        children: <TransportationTable />,
    },
    {
        label: "loại hình tác nghiệp",
        key: "operational",
        children: <OperationalTable />,
    },
    { label: "nghiệp vụ", key: "major", children: <MajorTable /> },
    {
        label: "phân loại khách hàng",
        key: "type",
        children: <TypeOfCustomerTable />,
    },
    {
        label: "đánh giá khách hàng",
        key: "evaluate",
        children: <CustomerTypeTable />,
    },
];

const Category = () => {
    return (
        <>
            <div className="bg-white p-4 rounded-lg mt-4">
                <h2 className="title">quản lý danh mục</h2>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
                <Tabs
                    aria-label="Options"
                    color="primary"
                    variant="underlined"
                    classNames={{
                        base: "w-full",
                        tabList:
                            "gap-0 w-full relative rounded-none p-0 border-b border-divider flex-wrap",
                        cursor: "w-full bg-[#70BC41]",
                        tab: "max-w-fit px-2 h-12",
                        tabContent: "group-data-[selected=true]:text-[#70BC41]",
                    }}
                >
                    {categories.map((category) => (
                        <Tab
                            key={category.key}
                            title={
                                <p className="font-medium text-sm first-letter:uppercase">
                                    {category.label}
                                </p>
                            }
                        >
                            {category.children}
                        </Tab>
                    ))}
                </Tabs>
            </div>
        </>
    );
};

export default Category;
