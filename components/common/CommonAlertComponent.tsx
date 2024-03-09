import React from 'react';
import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {alertAtom} from "@/atom/commonAtom";
import {useAlert} from "@/hooks/useAlert";
import CommonButtonComponent from "@/components/common/CommonButtonComponent";
import {theme} from "@/styles/theme";

const BackgroundDimDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
`

const AlertDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1010;
  padding: 20px;
  background-color: ${({theme}) => theme.backgroundColors.primary};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 70%;
  height: 150px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const AlertTitleDiv = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: ${({theme}) => theme.fontColors.primary};
`

const AlertMessageDiv = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.fontColors.primary};
`

const ConfirmButtonBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  justify-content: space-between;
`

const CommonAlertComponent = () => {

    const alert = useRecoilValue(alertAtom);

    const {closeAlert} = useAlert()

    const handleClickCloseButton = () => {
        if (!!alert?.onClickClose) {
            alert.onClickClose()
        } else {
            closeAlert()
        }
    }

    const handleClickConfirmButton = () => {
        if (!!alert?.onClickConfirm) {
            alert.onClickConfirm()
        }
        closeAlert()
    }

    if (!!alert?.message) {
        return <AlertComponent
            type={alert.type}
            title={alert.title}
            message={alert.message}
            handleClickCloseButton={handleClickCloseButton}
            handleClickConfirmButton={handleClickConfirmButton}
        />
    } else {
        return <></>
    }
}

type AlertComponentProps = {
    type: 'alert' | 'confirm';
    title: string | React.ReactNode;
    message: string | React.ReactNode;
    handleClickCloseButton: () => void;
    handleClickConfirmButton: () => void;
}

export const AlertComponent =
    ({
         type,
         title,
         message,
         handleClickCloseButton,
         handleClickConfirmButton
     }: AlertComponentProps) => {
        return (
            <>
                <AlertDiv>
                    <AlertTitleDiv>
                        {title}
                    </AlertTitleDiv>
                    <AlertMessageDiv>
                        {
                            message
                        }
                    </AlertMessageDiv>
                    {
                        type === 'alert' ? (
                            <CommonButtonComponent
                                content={'확인'}
                                onClicked={handleClickConfirmButton}
                            />
                        ) : (
                            <ConfirmButtonBox>
                                <CommonButtonComponent
                                    backgroundColor={theme.disabledColors.primary}
                                    content={'취소'}
                                    onClicked={handleClickCloseButton}
                                />
                                <CommonButtonComponent
                                    content={'확인'}
                                    onClicked={handleClickConfirmButton}
                                />
                            </ConfirmButtonBox>
                        )
                    }
                </AlertDiv>
                <BackgroundDimDiv/>
            </>
        )
    }

export default CommonAlertComponent