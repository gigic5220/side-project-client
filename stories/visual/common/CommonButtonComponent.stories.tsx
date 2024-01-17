import type {Meta, StoryObj} from '@storybook/react';
import CommonButtonComponent from "@/components/common/CommonButtonComponent";

const meta: Meta<typeof CommonButtonComponent> = {
    component: CommonButtonComponent,
    argTypes: {
        text: {control: 'string'},
        onClicked: {action: 'onClicked'}, // 로깅을 위한 액션 추가
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
        isDisabled: true
    }
};

export const OnLoading: Story = {
    args: {
        ...defaultArgs,
        isLoading: true
    }
};