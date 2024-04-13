import type {Meta, StoryObj} from '@storybook/react';
import CommonSelectBoxComponent, {SelectBoxItem} from "@/components/common/CommonSelectBoxComponent";

const meta: Meta<typeof CommonSelectBoxComponent> = {
    component: CommonSelectBoxComponent
};

export default meta;

type Story = StoryObj<typeof CommonSelectBoxComponent>;

type CommonSelectBoxComponentProps = {
    placeholder: string;
    selectedItemKey: string | null;
    itemList: SelectBoxItem[];
    onClickItem: (selectBoxItem: SelectBoxItem) => void;
}

const defaultArgs: CommonSelectBoxComponentProps = {
    placeholder: '테스트 플레이스홀더 입니다',
    selectedItemKey: null,
    itemList: [],
    onClickItem: () => {
    },
}

export const Default: Story = {
    args: {
        ...defaultArgs,
    }
};

export const DefaultWithItemList: Story = {
    args: {
        ...defaultArgs,
        itemList: [
            {key: '1', name: '테스트 아이템 1'},
            {key: '2', name: '테스트 아이템 2'},
            {key: '3', name: '테스트 아이템 3'},
            {key: '4', name: '테스트 아이템 4'},
        ]
    }
};

export const HasSelectedItem: Story = {
    args: {
        ...defaultArgs,
        itemList: [
            {key: '1', name: '테스트 아이템 1'},
            {key: '2', name: '테스트 아이템 2'},
            {key: '3', name: '테스트 아이템 3'},
            {key: '4', name: '테스트 아이템 4'},
        ],
        selectedItemKey: '2'
    }
};