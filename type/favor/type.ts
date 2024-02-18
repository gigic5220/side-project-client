import {GroupUserAssociation} from "@/type/group/type";

export type Favor = {
    id: number;
    title: string;
    detail: string;
    groupId: number;
    creatorId: number;
    createdAt: Date;
    updatedAt: Date;
    favorUserAssociations: FavorUserAssociation[];
    groupUserAssociation: GroupUserAssociation;
}

export type FavorUserAssociation = {
    id: number;
    userId: number;
    nickName: string;
    fileUrl: string;
    createdAt: Date;
    updatedAt: Date;
}