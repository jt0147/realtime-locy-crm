import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const Employee = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center p-4 bg-white rounded-lg mt-4">
            <h2 className="title">quản lý nhân viên</h2>
            <div className="flex gap-2 items-center">
                <Button
                    className="inline-block first-letter:uppercase text-white"
                    color="success"
                    onClick={() => navigate("/employee/new")}
                >
                    tạo mới
                </Button>
            </div>
        </div>
    );
};

export default Employee;
