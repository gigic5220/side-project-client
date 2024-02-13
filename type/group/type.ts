interface Group {
    id: number;
    name: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
    groupUserAssociations: GroupUserAssociation[];
}

interface UiGroup {
    id: number;
    name: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
    groupUserAssociations: GroupUserAssociation[];
    me: GroupUserAssociation | undefined;
}

type GroupUserAssociation = {
    id: number;
    userId: number;
    nickName: string;
    fileUrl: string;
    createdAt: Date;
    updatedAt: Date;
}