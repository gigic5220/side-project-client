import type {Meta, StoryObj} from '@storybook/react';
import NextStepButtonComponent from '@/components/join/NextStepButtonComponent';

const meta: Meta<typeof NextStepButtonComponent> = {
    component: NextStepButtonComponent,
    argTypes: {
        isShowLoadingSpinner: {
            control: {
                type: 'boolean'
            }
        },
        onClick: {
            control: {
                type: 'function'
            }
        },
    }
};

export default meta;
type Story = StoryObj<typeof NextStepButtonComponent>;

type DefaultArgsType = {
    isShowLoadingSpinner: boolean;
    onClick: () => void;
};

const defaultArgs: DefaultArgsType = {
    isShowLoadingSpinner: false,
    onClick: () => {
    }
}

export const Default: Story = {};

export const OnLoading: Story = {
    args: {
        ...defaultArgs,
        isShowLoadingSpinner: true
    }
};
