import type {Meta, StoryObj} from '@storybook/react';
import JoinInputComponent from '../../../components/join/JoinInputComponent';

const meta: Meta<typeof JoinInputComponent> = {
    component: JoinInputComponent,
    argTypes: {
        title: {control: 'text'},
        type: {control: 'text'},
        value: {control: 'text'},
        errorMessage: {control: 'text'},
        maxLength: {control: 'number'},
        placeholder: {control: 'text'},
        onChange: {action: 'changed'}, // 로깅을 위한 액션 추가
    }
};

export default meta;
type Story = StoryObj<typeof JoinInputComponent>;

type DefaultArgsType = {
    title: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    errorMessage?: string;
    maxLength: number;
    placeholder: string;
};

const defaultArgs: DefaultArgsType = {
    title: '테스트 타이틀 입니다',
    placeholder: '테스트 플레이스 홀더 입니다',
    maxLength: 10,
    value: '',
    onChange: () => {
    }
}

export const Default: Story = {
    args: {
        ...defaultArgs,
    }
};

export const ErrorMessage: Story = {
    args: {
        ...defaultArgs,
        errorMessage: '테스트 에러 메시지 입니다',
    }
};
