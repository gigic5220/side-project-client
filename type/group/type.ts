export type Group = {
    id: number;
    name: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
    groupUserAssociations: GroupUserAssociation[];
}

export type GroupUserAssociation = {
    id: number;
    userId: number;
    nickName: string;
    fileUrl: string;
    createdAt: Date;
    updatedAt: Date;
}