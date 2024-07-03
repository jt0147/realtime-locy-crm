export type TNotificationDto = {
    id: number;
    senderId: number;
    receiverId: number;
    relatedId: number;
    isRead: boolean;
    createdAt: string;
    idMess: number;
    senderMessage: string;
    receiverMessage: string;
    relatedMessage: string;
};
