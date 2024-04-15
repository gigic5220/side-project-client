import type {Meta, StoryObj} from '@storybook/react';
import {Group} from "@/type/group/type";
import {Swiper} from "swiper/types";
import MyGroupListSwiperComponent from "@/components/favor/MyGroupListSwiperComponent";

const meta: Meta<typeof MyGroupListSwiperComponent> = {
    component: MyGroupListSwiperComponent
};

export default meta;

type Story = StoryObj<typeof MyGroupListSwiperComponent>;

type MyGroupListSwiperComponentProps = {
    myGroupList: Group[] | undefined
    onSwiperSlideChange: (swiper: Swiper) => void
}

const defaultArgs: MyGroupListSwiperComponentProps = {
    myGroupList: [
        {
            id: 1,
            name: '테스트 이름1',
            code: 'code',
            createdAt: new Date(),
            updatedAt: new Date(),
            groupUserAssociations: [
                {
                    id: 1,
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    nickName: '테스트 닉네임1',
                    fileUrl: ''
                }
            ]
        },
        {
            id: 2,
            name: '테스트 이름2',
            code: 'code',
            createdAt: new Date(),
            updatedAt: new Date(),
            groupUserAssociations: [
                {
                    id: 1,
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    nickName: '테스트 닉네임1',
                    fileUrl: ''
                }
            ]
        }
    ],
    onSwiperSlideChange: () => {
    }
}

export const Default: Story = {
    args: {
        ...defaultArgs
    }
};
