interface Group {
    id: number;
    name: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
    groupUserAssociations: GroupUserAssociation[];
}

type GroupUserAssociation = {
    id: number;
    userId: number;
    nickName: string;
    fileUrl: string;
    createdAt: Date;
    updatedAt: Date;
}