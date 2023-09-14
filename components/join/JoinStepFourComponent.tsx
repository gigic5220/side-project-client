import React from "react";
import styled from "styled-components";
import {useRouter} from "next/router";
import LogoComponent from "@/components/common/LogoComponent";

const JoinStepFourBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`


const JoinStepFourTitleBox = styled.div`
  text-align: center;
`

const JoinStepFourTitleParagraph = styled.p`
  font-weight: 700;
  font-size: 24px;
  color: #FFFFFF;
`

const JoinStepFourButtonBox = styled.div`
  position: fixed;
  bottom: 50px;
`

const JoinStepFourButton = styled.button`
  background-color: #FF0000;
  border: none;
  border-radius: 24px;
  color: #FFFFFF;
  height: 50px;
  width: 297px;
  font-size: 16px;
`

const JoinStepFourLogoBox = styled.div`
  width: 297px;
`

const LogoBox = styled.div`
  position: relative;
  width: 297px;
  height: 200px;
`

const JoinStepFourComponent = () => {

    const router = useRouter()

    const movePage = (path: string) => {
        router.push(path)
    }

    return (
        <JoinStepFourBox>
            <JoinStepFourLogoBox>
                <LogoComponent
                    width={'300px'}
                    height={'200px'}
                />
            </JoinStepFourLogoBox>
            <JoinStepFourTitleBox>
                <JoinStepFourTitleParagraph>
                    가입이 완료되었습니다 🤘
                </JoinStepFourTitleParagraph>
            </JoinStepFourTitleBox>
            <JoinStepFourButtonBox>
                <JoinStepFourButton
                    onClick={() => movePage('/profile')}
                >
                    나이, 성별만 입력 후 QUEUE 매칭하기!
                </JoinStepFourButton>
            </JoinStepFourButtonBox>
        </JoinStepFourBox>
    )
}

export default JoinStepFourComponent