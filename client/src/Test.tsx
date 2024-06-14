import { publicInstance } from "@/configs";
import { useNotification } from "@/contexts";
import { TNotificationProps } from "@/types";

const Test = () => {
    const { connection }: TNotificationProps = useNotification();

    const testAssignJobNotification = async () => {
        const response = await publicInstance.post("test", {
            senderName: "admin",
            receiverName: "abc",
            numberJob: 3,
        });

        if (response.status) {
            console.log("Job assigned successfully");

            try {
                const jobData = {
                    senderName: "admin",
                    receiverName: "abc",
                    numberJob: 3,
                    time: new Date().toLocaleDateString("en-US"),
                };
                await connection.invoke("NotifyJobAssignment", jobData);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <button onClick={testAssignJobNotification}>Assign Job</button>
        </div>
    );
};

export default Test;
