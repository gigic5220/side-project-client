import type {Meta, StoryObj} from '@storybook/react';
import {LoadingSpinnerComponent} from "@/components/common/LoadingSpinnerComponent";

const meta: Meta<typeof LoadingSpinnerComponent> = {
    component: LoadingSpinnerComponent
};

export default meta;
type Story = StoryObj<typeof LoadingSpinnerComponent>;

export const Default: Story = {};
