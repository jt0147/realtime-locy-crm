import { Dispatch, SetStateAction } from "react";
import { Input } from "@nextui-org/react";

import { TCreateEmployeeRequest } from "@/types";

type TSection = {
    data: TCreateEmployeeRequest;
    setData: Dispatch<SetStateAction<TCreateEmployeeRequest>>;
};

const CreateEmployeeAccountSection = ({ data, setData }: TSection) => {
    return (
        <div className="space-y-4">
            <div className="sub-title">thông tin tài khoản</div>
            <Input
                label="Tên đăng nhập"
                value={data.username}
                onChange={(e) =>
                    setData((prev) => ({
                        ...prev,
                        username: e.target.value,
                    }))
                }
                required
            />
            <Input
                label="Mật khẩu"
                type="password"
                value={data.password}
                onChange={(e) =>
                    setData((prev) => ({
                        ...prev,
                        password: e.target.value,
                    }))
                }
                required
            />
        </div>
    );
};

export default CreateEmployeeAccountSection;
