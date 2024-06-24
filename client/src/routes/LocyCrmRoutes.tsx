import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Loading } from "@/components";
import { MainWrapper, NotFound } from "@/layouts";
import {
    CreateCustomer,
    Customer,
    CustomerDetail,
    Dashboard,
    ForgotPassword,
    Report,
    SignIn,
} from "@/pages";

import { AuthRoutes, ProtectedRoutes } from "./AdvanceRoutes";

const LocyCrmRoutes = () => {
    return (
        <Suspense
            fallback={
                <div className="w-screen h-screen flex justify-center items-center">
                    <Loading size="3xl" />
                </div>
            }
        >
            <Routes>
                {/* Authentication routes */}
                <Route element={<AuthRoutes />}>
                    <Route path="/auth/signin" element={<SignIn />} />
                    <Route
                        path="/auth/forgot-password"
                        element={<ForgotPassword />}
                    />
                </Route>
                {/* Main routes */}
                <Route element={<ProtectedRoutes />}>
                    <Route element={<MainWrapper />}>
                        <Route path="/" element={<Dashboard />} />

                        <Route
                            path="/settings"
                            element={
                                <>
                                    <p>Setting</p>
                                </>
                            }
                        />

                        <Route
                            path="/employee"
                            element={
                                <>
                                    <p>Employee</p>
                                </>
                            }
                        />
                        <Route
                            path="/employee/new"
                            element={
                                <>
                                    <p>Create Employee</p>
                                </>
                            }
                        />

                        <Route path="/customer" element={<Customer />} />
                        <Route
                            path="/customer/new"
                            element={<CreateCustomer />}
                        />
                        <Route
                            path="/customer/:id"
                            element={<CustomerDetail />}
                        />

                        <Route
                            path="/category"
                            element={
                                <>
                                    <p>Category</p>
                                </>
                            }
                        />

                        <Route path="/report" element={<Report />} />
                    </Route>
                </Route>
                {/* Routes not found */}
                <Route
                    path="*"
                    element={
                        <div className="w-full h-screen">
                            <NotFound />
                        </div>
                    }
                />
            </Routes>
        </Suspense>
    );
};

export default LocyCrmRoutes;
