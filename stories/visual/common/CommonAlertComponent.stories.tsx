import type {Meta, StoryObj} from '@storybook/react';
import {AlertComponent} from "@/components/common/CommonAlertComponent";

const meta: Meta<typeof AlertComponent> = {
    component: AlertComponent,
    argTypes: {
        type: {control: 'string'},
        message: {control: 'string'},
        handleClickCloseButton: {action: 'onClicked'},
        handleClickConfirmButton: {action: 'onClicked'}, // 로깅을 위한 액션 추가
    }
};

export default meta;
type Story = StoryObj<typeof AlertComponent>;

type AlertComponentProps = {
    type: 'alert' | 'confirm';
    message: string;
    handleClickCloseButton: () => void;
    handleClickConfirmButton: () => void;
}

const defaultArgs: AlertComponentProps = {
    type: 'alert',
    message: '테스트 메시지입니다.',
    handleClickCloseButton: () => {
    },
    handleClickConfirmButton: () => {
    },
}

export const AlertType: Story = {
    args: {
        ...defaultArgs,
    }
};

export const ConfirmType: Story = {
    args: {
        ...defaultArgs,
        type: 'confirm'
    }
};