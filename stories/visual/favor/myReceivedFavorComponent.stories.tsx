import type {Meta, StoryObj} from '@storybook/react';
import ReceivedFavorCardComponent from "@/components/favor/ReceivedFavorCardComponent";

const meta: Meta<typeof ReceivedFavorCardComponent> = {
    component: ReceivedFavorCardComponent
};

export default meta;

type Story = StoryObj<typeof ReceivedFavorCardComponent>;

type FavorCardComponentProps = {
    requesterName: string;
    requesterImageUrl: string;
    favorTitle: string;
    favorDetail: string;
    isImportant: boolean;
    isComplete: boolean;
    onClickComplete: (id: number, isComplete: boolean) => void;
    favorUserAssociationId: number;
}

const defaultArgs: FavorCardComponentProps = {
    requesterName: '테스트 이름',
    requesterImageUrl: '',
    favorTitle: '테스트 제목',
    favorDetail: '테스트 상세',
    isImportant: false,
    isComplete: false,
    onClickComplete: () => {
    },
    favorUserAssociationId: 1
}

export const Default: Story = {
    args: {
        ...defaultArgs,
    }
};

export const isImportant: Story = {
    args: {
        ...defaultArgs,
        isImportant: true
    }
};

export const isComplete: Story = {
    args: {
        ...defaultArgs,
        isComplete: true
    }
};