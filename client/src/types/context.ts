import { HubConnection } from "@microsoft/signalr";
import { TProfileDto } from "./dto";

export type TAuthContextProps = {
    user: TProfileDto | null;
    updateData: (payload: TProfileDto | null) => void;
};

export type TNotificationProps = {
    connection: HubConnection;
};
