export type NotificationListCount = {
    count: number;
}

export interface Notification {
    id: number;
    userId: number;
    type: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
    parameterId: number;
    parameterText: string;
    parameterImage: string;
}

export interface UiNotification extends Notification {
    parameterTextList: string[];
    parameterImageList: string[];
}