import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../ui";

const MainWrapper = () => {
    return (
        <main className="flex flex-col-reverse md:flex-row h-screen overflow-hidden md:p-3 md:gap-8">
            <Sidebar />
            <div className="flex-1 flex-shrink-0 overflow-x-hidden overflow-y-auto no-scrollbar relative">
                <Header />
                <div className="space-y-4">
                    <Outlet />
                </div>
            </div>
        </main>
    );
};

export default MainWrapper;
