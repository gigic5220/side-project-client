import styled from "styled-components";
import React from "react";

const HeaderBox = styled.div`
  width: 100%;
  height: 70px;
  display: grid;
  grid-template-columns: 140px 1fr 120px 100px;
  align-items: center;
  justify-content: center;
  background-color: #534747;
`

const QueueMatchingButtonBox = styled.div`
  justify-self: end;
`

const LoginButtonBox = styled.div`
  padding: 20px;
  justify-self: end;
`

const QueueLogoBox = styled.div`
  text-align: center;
`

const QueueLogoTitleParagraph = styled.p`
  margin: 0;
  color: #FFFFFF;
  font-size: 30px;
  font-weight: 500;
`

const QueueLogoDotParagraph = styled.span`
  color: red;
  font-size: 30px;
`

const Header = () => {
    return (
        <HeaderBox>
            <QueueLogoBox>
                <QueueLogoTitleParagraph>
                    QUEUE<QueueLogoDotParagraph>.</QueueLogoDotParagraph>
                </QueueLogoTitleParagraph>
            </QueueLogoBox>
            <div/>
            <QueueMatchingButtonBox>
                QUEUE 매칭
            </QueueMatchingButtonBox>
            <LoginButtonBox>
                로그인
            </LoginButtonBox>
        </HeaderBox>
    )
}

export default Header