/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Select as SelectNext, SelectItem } from "@nextui-org/react";

import { TSelectProps } from "./types";

const Select = <T extends Record<string, any>>({
    label = "Select option",
    options,
    option,
    ...props
}: TSelectProps<T>) => {
    const [initValue, setInitValue] = useState(
        props.value && typeof props.value === "string"
            ? new Set([props.value])
            : new Set([])
    );

    useEffect(() => {
        if (!props.value) {
            setInitValue(new Set([]));
        }
    }, [props.value]);

    return (
        <SelectNext
            {...props}
            label={label}
            selectedKeys={initValue}
            onSelectionChange={(key) => setInitValue(key as never)}
        >
            {options.map((opt) => (
                <SelectItem key={opt[option.key]}>
                    {opt[option.label]}
                </SelectItem>
            ))}
        </SelectNext>
    );
};

export default Select;
