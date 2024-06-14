import { FormEvent, useRef, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

import { checkOtp, forgotPassword, resetPassword } from "@/api";
import { VslLogo } from "@/assets";
import { Spinner } from "@/components";
import { notification } from "@/utilities";

const ForgotPassword = () => {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const otpRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const [email, setEmail] = useState<string | null>(null);
    const [otp, setOtp] = useState<string | null>(null);

    const navigate = useNavigate();

    const emailMutation = useMutation({
        mutationFn: forgotPassword,
    });

    const otpMutation = useMutation({
        mutationFn: checkOtp,
    });

    const resetMutation = useMutation({
        mutationFn: resetPassword,
    });

    /**
     * * Handle events
     */
    const handleEmailSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (emailRef.current?.value === "") {
            notification(false, "Bạn cần nhập email để lấy lại mật khẩu!");
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res: any = await emailMutation.mutateAsync({
            email: emailRef.current?.value.trim() ?? "",
        });

        if (res.status) {
            setEmail(emailRef.current?.value.trim() ?? "");
        }
    };

    const handleOtpSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (otpRef.current?.value === "") {
            notification(false, "Bạn cần nhập otp để lấy lại mật khẩu!");
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res: any = await otpMutation.mutateAsync({
            email: email?.trim() ?? "",
            otp: otpRef.current?.value.trim() ?? "",
        });

        if (res.status) {
            setOtp(otpRef.current?.value.trim() ?? "");
        }
    };

    const handleChangePassword = async (e: FormEvent) => {
        e.preventDefault();

        if (passwordRef.current?.value === "") {
            notification(false, "Bạn cần nhập mật khẩu để cài lại mật khẩu!");
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res: any = await resetMutation.mutateAsync({
            email: email?.trim() ?? "",
            password: passwordRef.current?.value.trim() ?? "",
        });

        if (res.status) {
            setEmail(null);
            setOtp(null);

            navigate("/auth/signin");
        }
    };

    return (
        <>
            <section className="h-screen flex justify-center items-center">
                {email === null && otp === null && (
                    <form
                        className="w-full max-w-[28rem] rounded-lg bg-white space-y-6 p-8 border border-gray-300 shadow-md"
                        onSubmit={handleEmailSubmit}
                    >
                        <div className="space-y-2">
                            <div className="w-full">
                                <img
                                    className="w-full h-auto object-cover"
                                    src={VslLogo}
                                    alt="Vsl Logo"
                                />
                            </div>
                            <p className="first-letter:uppercase font-medium text-center">
                                nhập email của bạn để lấy lại mật khẩu.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Input
                                label="Nhập email"
                                required={true}
                                ref={emailRef}
                            />
                            <div className="flex justify-end">
                                <Link
                                    to="/auth/signin"
                                    className="text-sm text-green-600 first-letter:uppercase hover:underline font-medium"
                                >
                                    quay lại trang đăng nhập
                                </Link>
                            </div>
                        </div>
                        <Button
                            className="w-full flex items-center text-white text-base font-medium leading-none"
                            isLoading={emailMutation.isLoading}
                            spinner={<Spinner />}
                            color="success"
                        >
                            {emailMutation.isLoading
                                ? "Đang tìm kiếm"
                                : "Tìm kiếm"}
                        </Button>
                    </form>
                )}
                {email !== null && otp === null && (
                    <form
                        className="w-full max-w-[28rem] rounded-lg bg-white space-y-6 p-8 border border-gray-300 shadow-md"
                        onSubmit={handleOtpSubmit}
                    >
                        <div className="space-y-2">
                            <div className="w-full">
                                <img
                                    className="w-full h-auto object-cover"
                                    src={VslLogo}
                                    alt="Vsl Logo"
                                />
                            </div>
                            <p className="first-letter:uppercase font-medium text-center">
                                mã otp đã gửi vào email của bạn. Vui lòng kiểm
                                tra lại rồi nhập mã để xác nhận.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Input
                                label="Nhập mã otp"
                                required={true}
                                ref={otpRef}
                            />
                        </div>
                        <Button
                            className="w-full flex items-center text-white text-base font-medium leading-none"
                            isLoading={otpMutation.isLoading}
                            spinner={<Spinner />}
                            color="success"
                        >
                            {otpMutation.isLoading
                                ? "Đang kiểm tra"
                                : "Kiểm tra"}
                        </Button>
                    </form>
                )}
                {email !== null && otp !== null && (
                    <form
                        className="w-full max-w-[28rem] rounded-lg bg-white space-y-6 p-8 border border-gray-300 shadow-md"
                        onSubmit={handleChangePassword}
                    >
                        <div className="space-y-2">
                            <div className="w-full">
                                <img
                                    className="w-full h-auto object-cover"
                                    src={VslLogo}
                                    alt="Vsl Logo"
                                />
                            </div>
                            <p className="first-letter:uppercase font-medium text-center">
                                Nhập mật khẩu mới
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                label="Nhập mật khẩu mới"
                                required={true}
                                autoComplete="off"
                                ref={passwordRef}
                            />
                        </div>
                        <Button
                            className="w-full flex items-center text-white text-base font-medium leading-none"
                            isLoading={resetMutation.isLoading}
                            spinner={<Spinner />}
                            color="success"
                        >
                            {resetMutation.isLoading
                                ? "Đang đổi mật khẩu"
                                : "Đổi mật khẩu"}
                        </Button>
                    </form>
                )}
            </section>
        </>
    );
};

export default ForgotPassword;
