export type NotificationListCount = {
    count: number;
}

export type Notification = {
    userId: number;
    message: string;
    type: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
    parameterId: number;
    parameterText: string;
}