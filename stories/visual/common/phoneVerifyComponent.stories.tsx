import type {Meta, StoryObj} from '@storybook/react';
import PhoneVerifyComponent from "@/components/join/PhoneVerifyComponent";
import React from "react";


const meta: Meta<typeof PhoneVerifyComponent> = {
    component: PhoneVerifyComponent,
    argTypes: {
        phone: {control: 'string'},
        changePhone: {action: 'onClicked'},
        phoneVerifyCode: {control: 'string'},
        changePhoneVerifyCode: {action: 'onClicked'},
        postSendVerifyNumberLoading: {control: 'boolean'},
        postSendVerifyNumberSuccess: {control: 'boolean'},
        postSendVerifyNumberErrorMessage: {control: 'boolean'},
        postCheckVerifyNumberLoading: {control: 'boolean'},
        postCheckVerifyNumberSuccess: {control: 'boolean'},
        postCheckVerifyNumberErrorMessage: {control: 'boolean'},
        postSendVerifyNumber: {action: 'onClicked'},
        postCheckVerifyNumber: {action: 'onClicked'},
    }
};

export default meta;
type Story = StoryObj<typeof PhoneVerifyComponent>;

type PhoneVerifyComponentProps = {
    phone: string;
    changePhone: (value: string) => void;
    phoneVerifyCode: string;
    changePhoneVerifyCode: (value: string) => void;
    postSendVerifyNumberLoading: boolean;
    postSendVerifyNumberSuccess: boolean;
    postSendVerifyNumberErrorMessage: string;
    postCheckVerifyNumberLoading: boolean;
    postCheckVerifyNumberSuccess: boolean;
    postCheckVerifyNumberErrorMessage: string;
    postSendVerifyNumber: () => void;
    postCheckVerifyNumber: () => void;
    isPhoneValid: (value: string) => boolean;
    isPhoneVerifyCodeValid: (value: string) => boolean;
    verifyButtonContent?: string | React.ReactNode;
    onClickedVerifyButton?: () => void;
}

const defaultArgs: PhoneVerifyComponentProps = {
    phone: '',
    changePhone: () => {
    },
    phoneVerifyCode: '',
    changePhoneVerifyCode: () => {
    },
    postSendVerifyNumberLoading: false,
    postSendVerifyNumberSuccess: false,
    postSendVerifyNumberErrorMessage: '',
    postCheckVerifyNumberLoading: false,
    postCheckVerifyNumberSuccess: false,
    postCheckVerifyNumberErrorMessage: '',
    postSendVerifyNumber: () => {
    },
    postCheckVerifyNumber: () => {
    },
    isPhoneValid: () => {
        return false;
    },
    isPhoneVerifyCodeValid: () => {
        return false;
    },
}

export const Default: Story = {
    args: {
        ...defaultArgs,
    }
};

export const PhoneValid: Story = {
    args: {
        ...defaultArgs,
        phone: '01012341234',
        isPhoneValid: () => true,
    }
};

export const PhoneSendVerifyNumberLoading: Story = {
    args: {
        ...defaultArgs,
        phone: '01012341234',
        isPhoneValid: () => true,
        postSendVerifyNumberLoading: true,
    }
};

export const PhoneSendVerifyNumberSuccess: Story = {
    args: {
        ...defaultArgs,
        phone: '01012341234',
        isPhoneValid: () => true,
        postSendVerifyNumberSuccess: true,
    }
};

export const PhoneSendVerifyNumberError: Story = {
    args: {
        ...defaultArgs,
        phone: '01012341234',
        isPhoneValid: () => true,
        postSendVerifyNumberErrorMessage: '에러 발생',
    }
};

export const VerifyNumberValid: Story = {
    args: {
        ...defaultArgs,
        phone: '01012341234',
        postSendVerifyNumberSuccess: true,
        phoneVerifyCode: '123456',
        isPhoneValid: () => true,
        isPhoneVerifyCodeValid: () => true,
    }
};

export const PhoneCheckVerifyNumberLoading: Story = {
    args: {
        ...defaultArgs,
        phone: '01012341234',
        postSendVerifyNumberSuccess: true,
        phoneVerifyCode: '123456',
        postCheckVerifyNumberLoading: true,
        isPhoneValid: () => true,
        isPhoneVerifyCodeValid: () => true,
    }
};

export const PhoneCheckVerifyNumberSuccess: Story = {
    args: {
        ...defaultArgs,
        phone: '01012341234',
        postSendVerifyNumberSuccess: true,
        phoneVerifyCode: '123456',
        postCheckVerifyNumberSuccess: true,
        isPhoneValid: () => true,
        isPhoneVerifyCodeValid: () => true,
    }
};

export const PhoneCheckVerifyNumberError: Story = {
    args: {
        ...defaultArgs,
        phone: '01012341234',
        postSendVerifyNumberSuccess: true,
        phoneVerifyCode: '123456',
        postCheckVerifyNumberErrorMessage: '에러 발생',
        isPhoneValid: () => true,
        isPhoneVerifyCodeValid: () => true,
    }
};

