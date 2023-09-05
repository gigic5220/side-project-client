import {Control, useController} from "react-hook-form";
import {REGEX} from "@/util/regex";

type Inputs = {
    email: string;
    name: string;
    phone: string;
    password: string;
    passwordCheck: string;
};
export const useGetJoinForms = ({control}: { control: Control<Inputs> }) => {
    const {field: emailField} = useController({
        name: "email",
        control,
        rules: {
            required: {
                value: true,
                message: '이메일을 입력해 주세요'
            },
            validate: (value) => REGEX.EMAIL.test(value) || '이메일 형식을 확인해 주세요'
        }
    })

    const {field: nameField} = useController({
        name: "name",
        control,
        rules: {
            required: {
                value: true,
                message: '이름을 입력해 주세요'
            }
        }
    })

    const {field: phoneField} = useController({
        name: "phone",
        control,
        rules: {
            required: {
                value: true,
                message: '휴대폰번호를 입력해 주세요'
            },
            minLength: {
                value: 10,
                message: '휴대폰번호를 확인해 주세요'
            }
        }
    })

    const {field: passwordField} = useController({
        name: "password",
        control,
        rules: {
            required: {
                value: true,
                message: '비밀번호를 입력해 주세요'
            },
            validate: (value) => REGEX.PASSWORD.test(value) || '비밀번호 형식을 확인해 주세요'
        }
    })

    const {field: passwordCheckField} = useController({
        name: "passwordCheck",
        control,
        rules: {
            required: {
                value: true,
                message: '비밀번호를 입력해 주세요'
            },
            validate: (value) => REGEX.PASSWORD.test(value) || '비밀번호 형식을 확인해 주세요'
        }
    })

    return {emailField, nameField, phoneField, passwordField, passwordCheckField};
}