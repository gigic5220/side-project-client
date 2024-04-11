import type {Meta, StoryObj} from '@storybook/react';
import SentFavorCardComponent from "@/components/favor/SentFavorCardComponent";
import {FavorUserAssociation} from "@/type/favor/type";

const meta: Meta<typeof SentFavorCardComponent> = {
    component: SentFavorCardComponent
};

export default meta;

type Story = StoryObj<typeof SentFavorCardComponent>;

type FavorCardComponentProps = {
    favorUserAssociationList: FavorUserAssociation[];
    favorTitle: string;
    favorDetail: string;
    isImportant: boolean;
}

const defaultArgs: FavorCardComponentProps = {
    favorUserAssociationList: [
        {
            id: 1,
            userId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            isComplete: false,
            nickName: '테스트 닉네임',
            fileUrl: ''
        }
    ],
    favorTitle: '테스트 제목',
    favorDetail: '테스트 상세',
    isImportant: false,
}

export const Default: Story = {
    args: {
        ...defaultArgs,
    }
};

export const IsComplete: Story = {
    args: {
        ...defaultArgs,
        favorUserAssociationList: [
            {
                id: 1,
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                isComplete: true,
                nickName: '테스트 닉네임',
                fileUrl: ''
            }
        ]
    }
};

export const TargetingMoreMembers: Story = {
    args: {
        ...defaultArgs,
        favorUserAssociationList: [
            {
                id: 1,
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                isComplete: true,
                nickName: '테스트 닉네임1',
                fileUrl: ''
            },
            {
                id: 2,
                userId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
                isComplete: false,
                nickName: '테스트 닉네임2',
                fileUrl: ''
            }
        ]
    }
};