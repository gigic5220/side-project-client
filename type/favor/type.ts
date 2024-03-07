export type Favor = {
    id: number;
    title: string;
    detail: string;
    isImportant: boolean;
    groupId: number;
    creatorId: number;
    createdAt: Date;
    updatedAt: Date;
    favorUserAssociations: FavorUserAssociation[];
}

export type FavorUserAssociation = {
    id: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    isComplete: boolean;
    nickName: string;
    fileUrl: string;
}
