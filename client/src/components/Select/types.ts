import { SelectProps } from "@nextui-org/react";

import { TObject } from "@/types";

export type TSelectProps<T extends TObject> = Omit<SelectProps, "children"> & {
    options: T[];
    option: {
        key: keyof T;
        label: keyof T;
    };
};
