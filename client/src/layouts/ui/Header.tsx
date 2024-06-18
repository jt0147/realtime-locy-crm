import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import { BiLogOut } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";

import { logOut } from "@/api";
import { useAuth } from "@/contexts";
import { LogOutModal } from "@/modals";
import { TAuthContextProps } from "@/types";

const Header = () => {
    const { user, updateData }: TAuthContextProps = useAuth();

    const [isOpenLogOutModal, setIsOpenLogOutModal] = useState<boolean>(false);

    const openLogOutModal = useCallback(() => {
        setIsOpenLogOutModal(true);
    }, []);

    const closeLogOutModal = useCallback(() => {
        setIsOpenLogOutModal(false);
    }, []);

    const handleLogOut = useCallback(async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await logOut();

        if (result.status) {
            localStorage.removeItem("token");
            updateData(null);
        }
    }, [updateData]);

    return (
        <>
            <header className="bg-gradient-to-r from-emerald-900 to-emerald-600 text-white p-4 md:rounded-lg shadow-md sticky top-0 left-0 w-full">
                <div className="flex justify-between items-center gap-2">
                    <div></div>
                    <div className="flex gap-1 items-center">
                        <Dropdown>
                            <DropdownTrigger>
                                <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
                                    <img
                                        className="w-full h-full"
                                        src={
                                            user?.photoURL ||
                                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                        }
                                        alt={user?.username.toLowerCase()}
                                    />
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="settings">
                                    <Link
                                        className="flex items-center gap-1 font-medium"
                                        to="/settings"
                                    >
                                        <IoMdSettings className="text-xl" />
                                        <span className="first-letter:uppercase">
                                            cài đặt
                                        </span>
                                    </Link>
                                </DropdownItem>
                                <DropdownItem key="logout">
                                    <button
                                        className="flex items-center gap-1 font-medium"
                                        onClick={openLogOutModal}
                                    >
                                        <BiLogOut className="text-lg" />
                                        <span className="first-letter:uppercase">
                                            đăng xuất
                                        </span>
                                    </button>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </header>
            <LogOutModal
                title="Đăng xuất"
                isOpen={isOpenLogOutModal}
                onClose={closeLogOutModal}
                onSubmit={handleLogOut}
            />
        </>
    );
};

export default Header;
