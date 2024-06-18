import { lazy } from "react";

export const Dashboard = lazy(() => import("./Dashboard"));
export const Report = lazy(() => import("./Report"));

export * from "./customer";
