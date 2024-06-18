import {
    Autocomplete as AutoCompleteNext,
    AutocompleteItem,
} from "@nextui-org/react";

import { TObject } from "@/types";

import { TAutoCompleteProps } from "./types";

const AutoComplete = <T extends TObject>({
    label = "Select option",
    options,
    option,
    ...props
}: TAutoCompleteProps<T>) => {
    return (
        <AutoCompleteNext {...props} label={label}>
            {options.map((opt) => (
                <AutocompleteItem key={opt[option.key]} value={opt[option.key]}>
                    {opt[option.label]}
                </AutocompleteItem>
            ))}
        </AutoCompleteNext>
    );
};

export default AutoComplete;
