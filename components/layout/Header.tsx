import styled from "styled-components";
import React from "react";
import LogoComponent from "@/components/common/LogoComponent";
import {FaBell} from "react-icons/fa";
import {IoChevronBack} from "react-icons/io5";
import {theme} from "@/styles/theme";


const HeaderDiv = styled.div`
  display: grid;
  height: 26px;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: 12px 24px 12px 24px;
`

const HeaderLeftDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
`

const HeaderCenterDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`

const HeaderRightDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
`

const AlarmButtonDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AlarmCountDiv = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 16px;
  background-color: #ff4444;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -10px;
  right: -10px;
`

const AlarmCountParagraph = styled.p`
  position: absolute;
  margin: 0;
  color: #FFFFFF;
  font-size: 10px;
  font-weight: 700;
`

type HeaderProps = {
    pageDepth: number;
    onClickedBackButton: () => void;
}

const Header = (props: HeaderProps) => {

    const {
        pageDepth,
        onClickedBackButton
    } = props;

    return (
        <HeaderDiv>
            <HeaderLeftDiv>
                {
                    (pageDepth === 0 || pageDepth === 1) ?
                        <LogoComponent width={60}/> :
                        <IoChevronBack
                            onClick={onClickedBackButton}
                            size={27}
                            color={theme.colors.primary}
                        />
                }
            </HeaderLeftDiv>
            <HeaderCenterDiv>
                {
                    (pageDepth === 0 || pageDepth === 1) ?
                        <></> :
                        <LogoComponent width={80}/>
                }
            </HeaderCenterDiv>
            <HeaderRightDiv>
                <AlarmButtonDiv>
                    <FaBell
                        size={22}
                        color={'#ffa360'}
                    />
                    <AlarmCountDiv>
                        <AlarmCountParagraph>
                            12
                        </AlarmCountParagraph>
                    </AlarmCountDiv>
                </AlarmButtonDiv>
            </HeaderRightDiv>
        </HeaderDiv>
    )
}

export default Header