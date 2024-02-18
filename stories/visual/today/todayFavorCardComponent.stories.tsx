import type {Meta, StoryObj} from '@storybook/react';
import TodayFavorCardComponent from "@/components/favor/TodayFavorCard";

const meta: Meta<typeof TodayFavorCardComponent> = {
    component: TodayFavorCardComponent
};

export default meta;

type Story = StoryObj<typeof TodayFavorCardComponent>;

type TodayFavorCardComponentProps = {
    favorCardPrimaryColor: string;
    favorCardSecondaryColor: string;
    isOpened: boolean;
    changeIsOpened: () => void;
    requesterName: string;
    favorTitle: string;
    favorDetail: string;
    requesterConfirmedStampImageUrl?: string;
    accepterCompletedStampImageUrl?: string;
}


const defaultArgs: TodayFavorCardComponentProps = {
    favorCardPrimaryColor: '#ff8d8d',
    favorCardSecondaryColor: '#ff9e9e',
    isOpened: false,
    changeIsOpened: () => {
    },
    requesterName: '요청자',
    favorTitle: '타이틀',
    favorDetail: '내용',
    requesterConfirmedStampImageUrl: '',
    accepterCompletedStampImageUrl: '',
}

export const Default: Story = {
    args: {
        ...defaultArgs,
    }
};

export const Opened: Story = {
    args: {
        ...defaultArgs,
        isOpened: true,
    }
};
