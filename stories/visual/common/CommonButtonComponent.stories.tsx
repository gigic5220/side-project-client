import type {Meta, StoryObj} from '@storybook/react';
import CommonButtonComponent from "@/components/common/CommonButtonComponent";

const meta: Meta<typeof CommonButtonComponent> = {
    component: CommonButtonComponent,
    argTypes: {
        content: {control: 'string'},
        onClicked: {action: 'onClicked'},
    }
};

export default meta;
type Story = StoryObj<typeof CommonButtonComponent>;

type CommonButtonComponentProps = {
    text: string;
    onClicked: () => void;
    isLoading?: boolean;
    isDisabled?: boolean;
}

const defaultArgs: CommonButtonComponentProps = {
    text: 'test 버튼 text',
    onClicked: () => {
    },
}

export const Enable: Story = {
    args: {
        ...defaultArgs,
    }
};

export const Disable: Story = {
    args: {
        ...defaultArgs,
        disabled: true
    }
};

export const OnLoading: Story = {
    args: {
        ...defaultArgs,
        isLoading: true
    }
};