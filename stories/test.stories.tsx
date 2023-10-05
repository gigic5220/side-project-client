// Button.stories.ts|tsx

import type {Meta, StoryObj} from '@storybook/react';

import CommonInputComponent from '../components/common/CommonInputComponent';
import {useState} from "react";

const meta: Meta<typeof CommonInputComponent> = {
    component: CommonInputComponent,
};

export default meta;
type Story = StoryObj<typeof CommonInputComponent>;

const CommonInputComponentWithState = () => {
    const [value, setValue] = useState('');

    return (
        <CommonInputComponent
            type="text"
            value={value}
            onChange={(value) => setValue(value)}
            maxLength={10}
            placeholder="값을 입력해주세요"
        />
    )
}

export const Primary: Story = {
    render: () => <CommonInputComponentWithState/>,
};