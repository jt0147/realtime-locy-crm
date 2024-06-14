import { privateInstance } from "@/configs";
import { TSysRequest } from "@/types";

export const getSys = () => {
    return privateInstance.get("/sys");
};

export const updateSys = (payload: TSysRequest) => {
    return privateInstance.put("/sys", payload);
};
