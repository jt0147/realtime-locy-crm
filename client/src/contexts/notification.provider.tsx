import { useEffect, useMemo } from "react";
import {
    HubConnectionBuilder,
    HubConnectionState,
    LogLevel,
} from "@microsoft/signalr";

import { privateInstance } from "@/configs";
import { TAuthContextProps, TNotificationProps } from "@/types";

import { useAuth } from "./auth.context";
import { NotificationContext } from "./notification.context";
import { TProviderProps } from "./types";

const NotificationProvider = ({ children }: TProviderProps) => {
    const { user }: TAuthContextProps = useAuth();

    const connection = useMemo(() => {
        const baseUrl = privateInstance.defaults.baseURL;

        const newConnection = new HubConnectionBuilder()
            .withUrl(`${baseUrl}/job?username=${user?.username}`)
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        return newConnection;
    }, [user]);

    const value: TNotificationProps = useMemo(() => {
        return {
            connection: connection,
        };
    }, [connection]);

    useEffect(() => {
        const connectToSignalR = async () => {
            if (
                user &&
                connection &&
                connection.state === HubConnectionState.Disconnected
            ) {
                try {
                    await connection.start();

                    // Check connectionId after start
                    if (connection.connectionId) {
                        connection.on("JobAssigned", function (message) {
                            console.log(message);
                        });

                        connection.on("NewJob", function (message) {
                            console.log(message);
                        });
                    }

                    console.log("Connected to SignalR");
                } catch (e) {
                    console.log("Connection failed: ", e);
                }
            }
        };

        connectToSignalR();

        return () => {
            if (connection.state === HubConnectionState.Connected) {
                connection.stop();
            }
        };
    }, [connection, user]);

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;
