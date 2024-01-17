import type {Meta, StoryObj} from '@storybook/react';
import CommonInputComponent from '../../../components/common/CommonInputComponent';

const meta: Meta<typeof CommonInputComponent> = {
    component: CommonInputComponent,
    argTypes: {
        type: {control: 'string'},
        value: {control: 'string'},
        maxLength: {control: 'number'},
        placeholder: {control: 'string'},
        onChange: {action: 'changed'}, // 로깅을 위한 액션 추가
    }
};

export default meta;
type Story = StoryObj<typeof CommonInputComponent>;

type CommonInputComponentProps = {
    type?: string;
    value: string;
    onChange: (value: string) => void;
    maxLength: number;
    placeholder: string;
}

const defaultArgs: CommonInputComponentProps = {
    value: '',
    onChange: () => {
    },
    maxLength: 10,
    placeholder: '',
}

export const Value: Story = {
    args: {
        ...defaultArgs,
        value: '테스트 value입니다.',
    }
};

export const Placeholder: Story = {
    args: {
        ...defaultArgs,
        placeholder: '테스트 placeholder 입니다',
    }
};


