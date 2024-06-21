/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
    Autocomplete as AutoCompleteNext,
    AutocompleteItem,
} from "@nextui-org/react";

import { TAutoCompleteProps } from "./types";

const AutoComplete = <T extends Record<string, any>>({
    label = "Select option",
    options,
    option,
    ...props
}: TAutoCompleteProps<T>) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        if (!props.value) {
            setValue("");
        } else {
            setValue(props.value as string);
        }
    }, [props.value, value]);

    return (
        <AutoCompleteNext
            {...props}
            label={label}
            selectedKey={value}
            onSelectionChange={(key) => {
                props.onSelectionChange?.(typeof key === "object" ? "" : key);
                setValue(key as string);
            }}
        >
            {options.map((opt) => (
                <AutocompleteItem key={opt[option.key]} value={opt[option.key]}>
                    {opt[option.label]}
                </AutocompleteItem>
            ))}
        </AutoCompleteNext>
    );
};

export default AutoComplete;
