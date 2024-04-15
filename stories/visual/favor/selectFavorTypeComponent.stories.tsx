import type {Meta, StoryObj} from '@storybook/react';
import SelectFavorTypeComponent from "@/components/favor/SelectFavorTypeComponent";

const meta: Meta<typeof SelectFavorTypeComponent> = {
    component: SelectFavorTypeComponent
};

export default meta;

type Story = StoryObj<typeof SelectFavorTypeComponent>;

type FavorTypeTabListComponentProps = {
    handleClickFavorTypeTab: (type: 'received' | 'sent') => void
    selectedFavorType: 'received' | 'sent'
}

const defaultArgs: FavorTypeTabListComponentProps = {
    handleClickFavorTypeTab: () => {
    },
    selectedFavorType: 'received'
}

export const Received: Story = {
    args: {
        ...defaultArgs
    }
};

export const Sent: Story = {
    args: {
        ...defaultArgs,
        selectedFavorType: 'sent'
    }
};
