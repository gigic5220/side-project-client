import styled from "styled-components";
import React from "react";
import LogoComponent from "@/components/common/LogoComponent";
import {FaBell} from "react-icons/fa";
import {IoChevronBack} from "react-icons/io5";
import {theme} from "@/styles/theme";
import SpacerComponent from "@/components/common/SpacerComponent";

type HeaderDivProps = {
    $boxShadow?: string;
    $pageDepth: number;
}

const HeaderDiv = styled.div<HeaderDivProps>`
  position: fixed;
  display: grid;
  grid-template-columns: ${({$pageDepth}) => ($pageDepth === 0 || $pageDepth === 1) ? '84px  1fr 54px' : '54px  1fr 54px'};
  width: 100%;
  top: 0;
  left: 0;
  box-shadow: ${({$boxShadow}) => $boxShadow};
  background-color: ${({theme}) => theme.colors.white};
  z-index: 1000;
  padding-top: 12px;
  padding-bottom: 12px;
`

const HeaderLeftDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeaderCenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeaderRightDiv = styled.div`
  display: flex;
  justify-content: center;
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
    boxShadow?: string;
    notificationCount?: number;
}

const Header = (props: HeaderProps) => {

    const {
        pageDepth,
        onClickedBackButton,
        boxShadow,
        notificationCount
    } = props;

    return (
        <>
            <HeaderDiv
                $boxShadow={boxShadow}
                $pageDepth={pageDepth}
            >
                <HeaderLeftDiv>
                    <SpacerComponent width={24}/>
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
                        {
                            !!notificationCount &&
                            <AlarmCountDiv>
                                <AlarmCountParagraph>
                                    {notificationCount}
                                </AlarmCountParagraph>
                            </AlarmCountDiv>
                        }
                    </AlarmButtonDiv>
                    <SpacerComponent width={24}/>
                </HeaderRightDiv>
            </HeaderDiv>
            <SpacerComponent height={50}/>
        </>
    )
}

export default Header