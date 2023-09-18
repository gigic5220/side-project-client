import React from 'react';
import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {alertAtom} from "@/atom/commonAtom";
import {useAlert} from "@/hooks/useAlert";

const BackgroundDimBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`

const AlertBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1010;
  padding: 20px;
  background-color: #3E314D;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 80%;
  height: 150px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const AlertInfoParagraph = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
`

const AlertInfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  text-align: center;
`

const AlertButtonBox = styled.div`

`

const AlertButton = styled.button`
  position: relative;
  width: 100%;
  height: 52px;
  background-color: #7B4DEE;
  color: #FFFFFF;
  border: 3px solid transparent;
  font-size: 20px;
  font-weight: 500;
  border-radius: 8px;
`

const ConfirmButtonBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  justify-content: space-between;
`

const CloseButton = styled.button`
  position: relative;
  width: 100%;
  height: 52px;
  background-color: #4a4656;
  color: #FFFFFF;
  border: 3px solid transparent;
  font-size: 20px;
  font-weight: 500;
  border-radius: 8px;
`

const ConfirmButton = styled.button`
  position: relative;
  width: 100%;
  height: 52px;
  background-color: #7B4DEE;
  color: #FFFFFF;
  border: 3px solid transparent;
  font-size: 20px;
  font-weight: 500;
  border-radius: 8px;
`

const AlertComponent = () => {

    const alert = useRecoilValue(alertAtom);

    const {closeAlert} = useAlert()

    const handleClickCloseAlert = () => {
        closeAlert()
    }

    const handleClickCloseButton = () => {
        if (!!alert?.onClickClose) {
            alert.onClickClose()
        }
    }

    const handleClickConfirmButton = () => {
        if (!!alert?.onClickConfirm) {
            alert.onClickConfirm()
        }
    }

    if (!!alert?.message) {
        return (
            <>
                <AlertBox>
                    <AlertInfoBox>
                        <AlertInfoParagraph
                            dangerouslySetInnerHTML={{__html: alert.message}}
                        />
                    </AlertInfoBox>
                    {
                        alert.type === 'alert' ? (
                            <AlertButtonBox>
                                <AlertButton
                                    onClick={handleClickCloseAlert}
                                >
                                    확인
                                </AlertButton>
                            </AlertButtonBox>
                        ) : (
                            <ConfirmButtonBox>
                                <CloseButton
                                    onClick={handleClickCloseButton}
                                >
                                    취소
                                </CloseButton>

                                <ConfirmButton
                                    onClick={handleClickConfirmButton}
                                >
                                    확인
                                </ConfirmButton>
                            </ConfirmButtonBox>
                        )
                    }
                </AlertBox>
                <BackgroundDimBox/>
            </>
        )
    } else {
        return <></>
    }
}

export default AlertComponent