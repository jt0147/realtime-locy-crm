import { AutocompleteProps } from "@nextui-org/react";

import { TObject } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TAutoCompleteProps<T extends TObject> = Omit<
    AutocompleteProps,
    "children"
> & {
    options: T[];
    option: {
        key: keyof T;
        label: keyof T;
    };
};
