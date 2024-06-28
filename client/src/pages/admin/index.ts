import { lazy } from "react";

export const Category = lazy(() => import("./Category"));
export const Dashboard = lazy(() => import("./Dashboard"));
export const Report = lazy(() => import("./Report"));
export const Setting = lazy(() => import("./Setting"));

export * from "./customer";
export * from "./hrm";
