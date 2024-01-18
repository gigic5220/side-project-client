import React, {FC, useState} from "react";
import {callCheckVerifyNumber, callPostVerifyNumber} from "@/query/userQueryFn";
import styled from "styled-components";
import {useMutation} from "@tanstack/react-query";
import CommonInputComponent from "@/components/common/CommonInputComponent";
import CommonButtonComponent from "@/components/common/CommonButtonComponent";
import {useAlert} from "@/hooks/useAlert";
import {callApi} from "@/api/CustomedAxios";

const BodyDiv = styled.div`
  padding: 24px;
`

const PageTitleP = styled.p`
  font-weight: 700;
  font-size: 24px;
  color: ${props => props.theme.fontColors.primary};
`

const PageSubTitleP = styled.p`
  font-weight: 500;
  font-size: 16px;
  color: ${props => props.theme.fontColors.secondary};
`

const PhoneInputGridDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 100px;
  gap: 20px;
`

const JoinItemTitleP = styled.p`
  margin-top: 60px;
  font-weight: 700;
  font-size: 14px;
  color: ${props => props.theme.fontColors.primary};
`

const FloatingButtonDiv = styled.div`
  position: fixed;
  bottom: 40px;
  left: 24px;
  right: 24px;
`

const PhoneVerifyInputGridDiv = styled(PhoneInputGridDiv)`
  margin-top: 20px;
`

const JoinStepBox = styled.div`
  padding: 24px;

`

const JoinInputAreaBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const JoinPhoneInputGridBox = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
  align-items: center;
  width: 100%;
`

const SendVerifyNumberButton = styled.button`
  margin-bottom: 17px;
  background-color: #6A4CC8;
  border-radius: 8px;
  height: 50px;
  font-size: 14px;
  color: #FFFFFF;
  border: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: end;
`

const PhoneVerifyTimerBox = styled.div`
  align-self: end;
`

const GenderTitleParagraph = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: #6749C4;
  white-space: pre-line;
  align-self: start;
`

const NextStepButtonBox = styled.div`
  width: 90%;
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
`

const GenderSelectBox = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`

const AgeSelectButtonBox = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`

export type JoinInputs = {
    userId: string;
    phone: string;
    phoneVerifyNumber: string;
    password: string;
    passwordCheck: string;
};


enum JoinSteps {
    Phone = 1,
    PhoneCertificate = 2,
    AdditionalInfo = 3,
}

const Join: FC = () => {

    const [phone, setPhone] = useState<string>('');
    const [phoneVerifyCode, setPhoneVerifyCode] = useState<string>('');
    const [isVerifyNumberSent, setIsVerifyNumberSent] = useState<boolean>(false);
    const [isVerifyNumberChecked, setIsVerifyNumberChecked] = useState<boolean>(false);

    /*const {
        formState: {errors: formFieldErrors},
        getValues,
        control,
        trigger
    } = useForm<JoinInputs>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })*/

    /*const {field: userIdField} = useController({
        name: "userId",
        control,
        rules: {
            required: {
                value: true,
                message: '아이디를 입력해 주세요'
            },
            validate: async (value) => {
                if (REGEX.USER_ID.test(value)) {
                    const queryResponse = await fetchData(refetchGetUserIdDuplication)
                    return queryResponse?.isDuplicated === false || '이미 가입 되어있는 아이디입니다'
                } else {
                    return '아이디 형식을 확인해 주세요'
                }
            }
        }
    })

    const {field: passwordField} = useController({
        name: "password",
        control,
        rules: {
            validate: (value) => REGEX.PASSWORD.test(value) || '비밀번호 형식을 확인해 주세요'
        }
    })

    const {field: passwordCheckField} = useController({
        name: "passwordCheck",
        control,
        rules: {
            validate: (value) => {
                if (REGEX.PASSWORD.test(value)) {
                    return value === getValues('password') || '비밀번호가 일치하지 않습니다'
                } else {
                    return '비밀번호 형식을 확인해 주세요'
                }
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
            },
            validate: async (value) => {
                if (REGEX.PHONE.test(value)) {
                    const queryResponse = await fetchData(refetchGetPhoneDuplication)
                    return queryResponse?.isDuplicated === false || '이미 가입 되어있는 휴대폰번호 입니다'
                } else {
                    return '휴대폰번호를 확인해 주세요'
                }
            }
        }
    })

    const {field: phoneVerifyNumberField} = useController({
        name: "phoneVerifyNumber",
        control,
        rules: {
            required: {
                value: true,
                message: '이름을 입력해 주세요'
            },
            validate: (value) => {
                if (REGEX.PHONE_VERIFY_NUMBER.test(value)) {
                    return isPhoneVerifyNumberSent || '먼저 인증번호를 발송해 주세요'
                } else {
                    return '6자리 숫자를 입력해 주세요'
                }
            }
        }
    })*/


    /*const {
        refetch: refetchGetPhoneDuplication,
        isLoading: isGetPhoneDuplicationLoading
    } = useQuery({
        queryKey: ['getPhoneDuplication', phone],
        queryFn: () => callGetPhoneDuplication(phone),
        enabled: false
    })*/

    /*const {
        refetch: refetchSendVerifyNumber,
        isLoading: isSendVerifyNumberLoading
    } = useQuery({
        queryKey: ['sendVerifyNumber', phone],
        queryFn: () => callGetVerifyNumber(phone),
        enabled: false
    })*/

    /*const {
        refetch: refetchGetUserIdDuplication,
        isLoading: isGetUserIdDuplicationLoading
    } = useQuery({
        queryKey: ['getUserIdDuplication', getValues('userId')],
        queryFn: () => callGetUserIdDuplication(getValues('userId')),
        enabled: false
    })*/

    const {
        mutateAsync: postVerifyNumber,
        isPending: postVerifyNumberLoading
    } = useMutation({
        mutationFn: () => callPostVerifyNumber(phone),
        onError: () => {
            console.log('error');
        },
        onSuccess: () => {
            console.log('success');
            setIsVerifyNumberSent(true)
        }
    });

    const {
        mutateAsync: postCheckVerifyNumber,
        isPending: postCheckVerifyNumberLoading
    } = useMutation({
        mutationFn: () => callCheckVerifyNumber(phone, phoneVerifyCode),
        onError: () => {
            console.log('error');
        },
        onSuccess: () => {
            setIsVerifyNumberChecked(true)
            openAlert({
                type: 'alert',
                message: '휴대폰번호 인증이 완료되었어요'
            })
        }
    });

    const {
        mutateAsync: postJoin,
        isPending: postJoinLoading
    } = useMutation({
        mutationFn: () => callApi('post', '/user', {phone}),
        onSuccess: () => {
            setIsVerifyNumberChecked(true)
            openAlert({
                type: 'alert',
                message: '회원가입이 완료되었어요'
            })
        }
    });

    /*const handleClickGetVerifyNumberButton = async () => {
        await validateFormField('phone')

        if (!!formFieldErrors.phone?.message) return

        setIsPhoneVerifyNumberSent(false)

        const sendVerifyNumberQueryResponse = await fetchData(refetchSendVerifyNumber)
        const isSentSuccessful = sendVerifyNumberQueryResponse?.status === 'pending'
        setIsPhoneVerifyNumberSent(isSentSuccessful)
    }*/

    /*const validateFormField = async (formFieldName: keyof JoinInputs) => {
        await trigger(formFieldName)
    }*/

    const validateCurrentJoinStepInfo = async () => {
        /*if (currentJoinProgressStep === JoinSteps.Phone) {
            await validateFormField('userId')
            if (formFieldErrors.userId?.message) {
                return false
            }
            const queryResponse = await fetchData(refetchGetUserIdDuplication)
            return queryResponse?.isDuplicated === false
        } else if (currentJoinProgressStep === JoinSteps.Password) {
            await validateFormField('password')
            await validateFormField('passwordCheck')
            if (formFieldErrors.password?.message || formFieldErrors.passwordCheck?.message) {
                return false
            }
            return true
        } else if (currentJoinProgressStep === JoinSteps.Phone) {
            await validateFormField('phone')
            await validateFormField('phoneVerifyNumber')
            if (formFieldErrors.phone?.message || formFieldErrors.phoneVerifyNumber?.message) {
                return false
            }
            const queryResponse = await fetchData(refetchCheckVerifyNumber)
            return queryResponse?.status === 'approved'
        } else {
            return false
        }*/
    }


    const handleClickNextStepButton = async () => {
        /*const isJoinInfoValidate = await validateCurrentJoinStepInfo()
        if (isJoinInfoValidate) {
            if (currentJoinProgressStep === JoinSteps.Phone) {
                const response = await joinMutation()
                if (response?.status !== 201) {
                    return
                }
            }
            //moveToNextStep()
        }*/
    }

    /*const moveToNextStep = () => {
        setCurrentJoinProgressStep(prevStep => {
            switch (prevStep) {
                case JoinSteps.Phone:
                    return JoinSteps.Password;
                case JoinSteps.Password:
                    return JoinSteps.Phone;
                case JoinSteps.Phone:
                    return JoinSteps.Success;
                default:
                    return JoinSteps.UserId;
            }
        });
    }*/

    const checkFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    const {openAlert, closeAlert} = useAlert();

    const changePhone = (value: string) => {
        setPhone(value);
    }

    const changePhoneVerifyCode = (value: string) => {
        setPhoneVerifyCode(value);
    }

    return (
        <BodyDiv>
            <PageTitleP>
                회원가입을 진행할게요
            </PageTitleP>
            <PageSubTitleP>
                간단한 휴대폰본인인증이 진행됩니다
            </PageSubTitleP>
            <JoinItemTitleP>
                휴대폰번호를 입력해 주세요
            </JoinItemTitleP>
            <PhoneInputGridDiv>
                <CommonInputComponent
                    disabled={isVerifyNumberChecked}
                    value={phone}
                    onChange={changePhone}
                    maxLength={11}
                    placeholder={'01012341234'}
                />
                <CommonButtonComponent
                    borderRadius={'14px'}
                    fontSize={'15px'}
                    disabled={phone.length < 10 || isVerifyNumberChecked}
                    isLoading={postVerifyNumberLoading}
                    onClicked={postVerifyNumber}
                    text={isVerifyNumberSent ? '재전송' : '인증번호 전송'}
                />
            </PhoneInputGridDiv>
            <PhoneVerifyInputGridDiv>
                <CommonInputComponent
                    disabled={!isVerifyNumberSent || isVerifyNumberChecked}
                    value={phoneVerifyCode}
                    onChange={changePhoneVerifyCode}
                    maxLength={11}
                    placeholder={'6자리 인증번호'}
                />
                <CommonButtonComponent
                    borderRadius={'14px'}
                    disabled={!isVerifyNumberSent || isVerifyNumberChecked}
                    isLoading={postCheckVerifyNumberLoading}
                    onClicked={postCheckVerifyNumber}
                    text={'인증'}
                />
            </PhoneVerifyInputGridDiv>
            <FloatingButtonDiv>
                <CommonButtonComponent
                    disabled={!isVerifyNumberChecked}
                    onClicked={postJoin}
                    isLoading={postJoinLoading}
                    text={'가입하기'}
                />
            </FloatingButtonDiv>
        </BodyDiv>
        /*<JoinStepBox>
            {/!*{
                currentJoinProgressStep !== JoinSteps.Success &&
                <JoinProgressBarComponent
                    currentJoinProgressStep={currentJoinProgressStep}
                />
            }*!/}
            <form
                onKeyDown={(e) => checkFormKeyDown(e)}
            >
                <JoinInputAreaBox>
                    <JoinPhoneInputGridBox>
                        <JoinInputComponent
                            title={'휴대폰 번호를 입력해주세요\n간단한 본인인증을 진행합니다'}
                            value={phoneField.value}
                            onChange={(value: string) => phoneField.onChange(value.replace(/[^0-9]/g, ''))}
                            errorMessage={formFieldErrors.phone?.message}
                            maxLength={11}
                            placeholder={'숫자만 입력'}
                        />
                        <SendVerifyNumberButton
                            type={'button'}
                            onClick={handleClickGetVerifyNumberButton}
                        >
                            {
                                (isGetPhoneDuplicationLoading || isSendVerifyNumberLoading) ?
                                    <LoadingSpinnerComponent/>
                                    : <>
                                        {
                                            isPhoneVerifyNumberSent ? (
                                                '재전송'
                                            ) : (
                                                '인증'
                                            )
                                        }
                                    </>
                            }
                        </SendVerifyNumberButton>
                    </JoinPhoneInputGridBox>
                    {
                        isPhoneVerifyNumberSent &&
                        <>
                            <JoinInputComponent
                                title={'인증번호를 입력해 주세요'}
                                value={phoneVerifyNumberField.value}
                                onChange={(value: string) => phoneVerifyNumberField.onChange(value.replace(/[^0-9]/g, ''))}
                                maxLength={6}
                                placeholder={'6자리의 숫자만 입력'}
                                errorMessage={formFieldErrors.phoneVerifyNumber?.message}
                            />
                            <PhoneVerifyTimerBox>
                                {
                                    isPhoneVerifyNumberSent &&
                                    <TimerComponent/>
                                }
                            </PhoneVerifyTimerBox>
                        </>
                    }
                    <GenderTitleParagraph>
                        성별을 선택해 주세요
                    </GenderTitleParagraph>
                    <GenderSelectBox>
                        <ProfileRadioSelectButtonComponent
                            text={'남자'}
                            isSelected={gender === 'male'}
                            onClick={() => setGender('male')}
                        />
                        <ProfileRadioSelectButtonComponent
                            text={'여자'}
                            isSelected={gender === 'female'}
                            onClick={() => setGender('female')}
                        />
                    </GenderSelectBox>
                    <GenderTitleParagraph>
                        나이를 선택해 주세요
                    </GenderTitleParagraph>
                    <AgeSelectButtonBox>
                        <ProfileRadioSelectButtonComponent
                            text={'20대'}
                            isSelected={age === '20'}
                            onClick={() => setAge('20')}
                        />
                        <ProfileRadioSelectButtonComponent
                            text={'30대'}
                            isSelected={age === '30'}
                            onClick={() => setAge('30')}
                        />
                        <ProfileRadioSelectButtonComponent
                            text={'40대'}
                            isSelected={age === '40'}
                            onClick={() => setAge('40')}
                        />
                    </AgeSelectButtonBox>
                    {/!*{
                        currentJoinProgressStep === JoinSteps.UserId &&
                        <JoinInputComponent
                            title={'휴대폰 번호를 입력해주세요'}
                            value={phoneField.value}
                            onChange={(value: string) => phoneField.onChange(value.replace(/[^0-9]/g, ''))}
                            errorMessage={formFieldErrors.phone?.message}
                            maxLength={11}
                            placeholder={'010-1234-1234'}
                        />
                    }
                    {
                        currentJoinProgressStep === JoinSteps.Password &&
                        <>
                            <JoinInputComponent
                                type={'password'}
                                title={'로그인에 사용하실\n비밀번호를 입력해 주세요'}
                                value={passwordField.value}
                                onChange={passwordField.onChange}
                                errorMessage={formFieldErrors.password?.message}
                                maxLength={16}
                                placeholder={'영문, 숫자 포함 8자리 이상'}
                            />
                            <JoinInputComponent
                                type={'password'}
                                title={'한번 더 입력해 주세요'}
                                value={passwordCheckField.value}
                                onChange={passwordCheckField.onChange}
                                errorMessage={formFieldErrors.passwordCheck?.message}
                                maxLength={16}
                                placeholder={'영문, 숫자 포함 8자리 이상'}
                            />
                        </>
                    }
                    {
                        currentJoinProgressStep === JoinSteps.Phone &&
                        <>
                            <JoinPhoneInputGridBox>
                                <JoinInputComponent
                                    title={'휴대폰 번호를 입력해주세요\n간단한 본인인증을 진행합니다'}
                                    value={phoneField.value}
                                    onChange={(value: string) => phoneField.onChange(value.replace(/[^0-9]/g, ''))}
                                    errorMessage={formFieldErrors.phone?.message}
                                    maxLength={11}
                                    placeholder={'숫자만 입력'}
                                />
                                <SendVerifyNumberButton
                                    type={'button'}
                                    onClick={handleClickGetVerifyNumberButton}
                                >
                                    {
                                        (isGetPhoneDuplicationLoading || isSendVerifyNumberLoading) ?
                                            <LoadingSpinnerComponent/>
                                            : <>
                                                {
                                                    isPhoneVerifyNumberSent ? (
                                                        '재전송'
                                                    ) : (
                                                        '인증'
                                                    )
                                                }
                                            </>
                                    }
                                </SendVerifyNumberButton>
                            </JoinPhoneInputGridBox>
                            <JoinInputComponent
                                title={'인증번호를 입력해 주세요'}
                                value={phoneVerifyNumberField.value}
                                onChange={(value: string) => phoneVerifyNumberField.onChange(value.replace(/[^0-9]/g, ''))}
                                maxLength={6}
                                placeholder={'6자리의 숫자만 입력'}
                                errorMessage={formFieldErrors.phoneVerifyNumber?.message}
                            />
                            <PhoneVerifyTimerBox>
                                {
                                    isPhoneVerifyNumberSent &&
                                    <TimerComponent/>
                                }
                            </PhoneVerifyTimerBox>
                        </>

                    }
                    {
                        currentJoinProgressStep === JoinSteps.Success &&
                        <JoinSuccessViewComponent/>
                    }*!/}
                </JoinInputAreaBox>
                {/!*{
                    currentJoinProgressStep < JoinSteps.Success &&
                    <NextStepButtonBox>
                        <NextStepButtonComponent
                            onClick={handleClickNextStepButton}
                            isShowLoadingSpinner={(isGetUserIdDuplicationLoading || isCheckVerifyNumberLoading || isJoinMutationLoading)}
                        />
                    </NextStepButtonBox>
                }*!/}
            </form>
        </JoinStepBox>*/
    );
};

export default Join;


