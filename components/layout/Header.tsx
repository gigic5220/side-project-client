import styled from "styled-components";
import React from "react";
import LogoComponent from "@/components/common/LogoComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";

const HeaderDiv = styled.div`
  height: 25px;
  display: flex;
  align-items: center;
  padding: 24px;
  justify-content: space-between;
`

const AlarmButtonDiv = styled.div`
  position: relative;
    /*background-color: ${props => props.theme.colors.primary};
  color: #FFFFFF;
  height: 20px;
  width: 50px;
  border-radius: 20px 0 0 20px;
  padding: 10px 0 10px 10px;
  display: flex;
  align-items: center;*/
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
  right: -15px;
`

const AlarmCountParagraph = styled.p`
  position: absolute;
  margin: 0;
  color: #FFFFFF;
  font-size: 10px;
  font-weight: 700;
`

const Header = () => {
    return (
        <HeaderDiv>
            <div>
                <LogoComponent width={80}/>
            </div>
            <AlarmButtonDiv>
                <FontAwesomeIcon
                    icon={
                        icon({name: 'bell'})
                    }
                    style={{
                        width: '22px',
                        height: '22px',
                        marginBottom: '2px'
                    }}
                    color={'#ffa360'}
                />
                <AlarmCountDiv>
                    <AlarmCountParagraph>
                        12
                    </AlarmCountParagraph>
                </AlarmCountDiv>
            </AlarmButtonDiv>
        </HeaderDiv>
    )
}

export default Header