import styled from "styled-components";
import React from "react";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const HeaderBox = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: end;
  justify-content: end;
`

const AlarmButtonBox = styled.div`
  position: relative;
  background-color: #262626;
  color: #FFFFFF;
  height: 30px;
  width: 50px;
  border-radius: 20px 0 0 20px;
  padding: 10px 0 10px 10px;
  display: flex;
  align-items: center;
`

const AlarmCountBox = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 16px;
  background-color: #C07B49;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 7px;
  left: 25px;
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
        <HeaderBox>
            <AlarmButtonBox>
                <FontAwesomeIcon
                    icon={
                        icon({name: 'bell'})
                    }
                    style={{
                        width: '25px',
                        height: '25px',
                    }}
                    color={'#FFFFFF'}
                />
                <AlarmCountBox>
                    <AlarmCountParagraph>
                        12
                    </AlarmCountParagraph>
                </AlarmCountBox>
            </AlarmButtonBox>
        </HeaderBox>
    )
}

export default Header