import { Select as SelectNext, SelectItem } from "@nextui-org/react";

import { TObject } from "@/types";

import { TSelectProps } from "./types";

const Select = <T extends TObject>({
    label = "Select option",
    options,
    option,
    ...props
}: TSelectProps<T>) => {
    return (
        <SelectNext {...props} label={label}>
            {options.map((opt) => (
                <SelectItem key={opt[option.key]}>
                    {opt[option.label]}
                </SelectItem>
            ))}
        </SelectNext>
    );
};

export default Select;
