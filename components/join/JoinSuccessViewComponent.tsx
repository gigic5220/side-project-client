import React from "react";
import styled from "styled-components";
import {useRouter} from "next/router";
import LogoComponent from "@/components/common/LogoComponent";

const JoinSuccessViewBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const LogoBox = styled.div`
  width: 300px;
`

const JoinSuccessMessageBox = styled.div`
  margin-top: 32px;
  text-align: center;
`

const JoinSuccessMessageParagraph = styled.p`
  font-weight: 700;
  font-size: 24px;
  color: #FFFFFF;
`

const BottomFixedButtonBox = styled.div`
  position: fixed;
  bottom: 50px;
`

const MovePageButton = styled.button`
  background-color: #6728FF;
  border: none;
  border-radius: 24px;
  color: #FFFFFF;
  height: 50px;
  width: 297px;
  font-size: 16px;
`


const JoinSuccessViewComponent = () => {

    const router = useRouter()

    const movePage = (path: string) => {
        router.push(path)
    }

    return (
        <JoinSuccessViewBox>
            <LogoBox>
                <LogoComponent
                    width={'300px'}
                    height={'130px'}
                    color={'white'}
                />
            </LogoBox>
            <JoinSuccessMessageBox>
                <JoinSuccessMessageParagraph>
                    가입이 완료되었습니다 🤘
                </JoinSuccessMessageParagraph>
            </JoinSuccessMessageBox>
            <BottomFixedButtonBox>
                <MovePageButton
                    onClick={() => movePage('/profile')}
                >
                    나이, 성별만 입력 후 QUEUE 매칭하기!
                </MovePageButton>
            </BottomFixedButtonBox>
        </JoinSuccessViewBox>
    )
}

export default JoinSuccessViewComponent