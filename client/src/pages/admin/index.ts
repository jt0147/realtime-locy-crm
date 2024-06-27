import { lazy } from "react";

export const Dashboard = lazy(() => import("./Dashboard"));
export const Report = lazy(() => import("./Report"));
export const Setting = lazy(() => import("./Setting"));

export * from "./customer";
