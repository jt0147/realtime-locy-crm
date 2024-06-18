import { Link, NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaHouseUser } from "react-icons/fa";
import { BiSolidCategory, BiSolidReport } from "react-icons/bi";

import { VslLogoSvg } from "@/assets";

import { useAuth } from "@/contexts";
import { TAuthContextProps } from "@/types";

const Sidebar = () => {
    const { user }: TAuthContextProps = useAuth();

    return (
        <aside className="bg-white p-2 md:p-4 md:rounded-lg shadow-md md:w-[12rem] lg:w-[18rem] md:space-y-8">
            {/* Logo */}
            <Link className="hidden md:flex items-center gap-2" to="/">
                <img
                    className="w-9 aspect-square object-cover"
                    src={VslLogoSvg}
                    alt="Locy CRM Logo"
                />
                <h1 className="text-2xl font-medium uppercase">crm</h1>
            </Link>
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" end>
                            <FaTachometerAlt className="nav-icon" />
                            <span className="nav-label">dashboard</span>
                        </NavLink>
                    </li>
                    {(user?.permission.includes("1048576") ||
                        user?.permission.includes("5000") ||
                        user?.permission.includes("5020") ||
                        user?.permission.includes("5040")) && (
                        <li className="nav-item">
                            <NavLink to="/employee" className="nav-link" end>
                                <FaUsers className="nav-icon" />
                                <span className="nav-label">nhân viên</span>
                            </NavLink>
                        </li>
                    )}
                    <li className="nav-item">
                        <NavLink to="/customer" className="nav-link" end>
                            <FaHouseUser className="nav-icon" />
                            <span className="nav-label">khách hàng</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/report" className="nav-link" end>
                            <BiSolidReport className="nav-icon" />
                            <span className="nav-label">báo cáo</span>
                        </NavLink>
                    </li>
                    {(user?.permission.includes("1048576") ||
                        user?.permission.includes("6000") ||
                        user?.permission.includes("6020") ||
                        user?.permission.includes("6040")) && (
                        <li className="nav-item">
                            <NavLink to="/category" className="nav-link" end>
                                <BiSolidCategory className="nav-icon" />
                                <span className="nav-label">danh mục</span>
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
