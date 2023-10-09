import type {Meta, StoryObj} from '@storybook/react';

import JoinProgressBarComponent from '../../../components/join/JoinProgressBarComponent';

const meta: Meta<typeof JoinProgressBarComponent> = {
    component: JoinProgressBarComponent,
    argTypes: {
        currentJoinProgressStep: {
            control: {
                type: 'number'
            }
        }
    }
};

export default meta;
type Story = StoryObj<typeof JoinProgressBarComponent>;

export const firstStep: Story = {
    args: {
        currentJoinProgressStep: 1
    }
};

export const secondStep: Story = {
    args: {
        currentJoinProgressStep: 2
    }
};

export const thirdStep: Story = {
    args: {
        currentJoinProgressStep: 3
    }
};