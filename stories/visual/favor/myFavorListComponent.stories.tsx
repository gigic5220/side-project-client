import type {Meta, StoryObj} from '@storybook/react';
import {Favor} from "@/type/favor/type";
import MyFavorListComponent from "@/components/favor/MyFavorListComponent";

const meta: Meta<typeof MyFavorListComponent> = {
    component: MyFavorListComponent
};

export default meta;

type Story = StoryObj<typeof MyFavorListComponent>;

type MyFavorListComponentProps = {
    myFavorList: Favor[] | undefined
    selectedFavorType: 'received' | 'sent'
    handleClickFavorCompleteStamp: (id: number, isComplete: boolean) => void
}

const defaultArgs: MyFavorListComponentProps = {
    myFavorList: [
        {
            id: 1,
            title: '테스트 제목',
            detail: '테스트 상세',
            isImportant: false,
            groupId: 1,
            creatorId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            favorUserAssociations: [
                {
                    id: 1,
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isComplete: false,
                    nickName: '테스트 닉네임',
                    fileUrl: ''
                }
            ]
        },
        {
            id: 2,
            title: '테스트 제목2',
            detail: '테스트 상세2',
            isImportant: true,
            groupId: 1,
            creatorId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            favorUserAssociations: [
                {
                    id: 2,
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isComplete: true,
                    nickName: '테스트 닉네임2',
                    fileUrl: ''
                }
            ]
        },
        {
            id: 3,
            title: '테스트 제목3',
            detail: '테스트 상세3',
            isImportant: false,
            groupId: 1,
            creatorId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            favorUserAssociations: [
                {
                    id: 3,
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isComplete: false,
                    nickName: '테스트 닉네임3',
                    fileUrl: ''
                }
            ]
        }
    ],
    selectedFavorType: 'received',
    handleClickFavorCompleteStamp: () => {
    }
}

export const Received: Story = {
    args: {
        ...defaultArgs,
        selectedFavorType: 'received'
    }
};

export const Sent: Story = {
    args: {
        ...defaultArgs,
        selectedFavorType: 'sent'
    }
};
