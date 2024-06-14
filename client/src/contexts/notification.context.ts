import React, { useContext } from "react";

import { TNotificationProps } from "@/types";

export const NotificationContext = React.createContext<TNotificationProps>(
    {} as TNotificationProps
);

export const useNotification = () => {
    return useContext(NotificationContext);
};
