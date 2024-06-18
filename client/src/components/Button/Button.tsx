import { Button as ButtonNext } from "@nextui-org/react";

import Spinner from "../Spinner";
import { TButtonProps } from "./types";

const Button = ({
    label = "button",
    isLoading,
    textLoading = "loading",
    color = "success",
    ...props
}: TButtonProps) => {
    return (
        <ButtonNext
            {...props}
            color={color}
            disabled={isLoading}
            spinner={<Spinner />}
        >
            <span className="inline-block first-letter:uppercase text-white">
                {isLoading ? `${textLoading}...` : label}
            </span>
        </ButtonNext>
    );
};

export default Button;
