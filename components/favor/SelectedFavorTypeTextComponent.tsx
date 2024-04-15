import styled from "styled-components";
import React from "react";

const SelectedFavorTypeTextDiv = styled.div`
  height: 30px;
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.fontColors.primary};
  text-align: center;
`

const SelectedFavorTypeTextSpan = styled.span`
  font-weight: 700;
  color: ${({theme}) => theme.colors.primary};
`


type SelectedFavorTypeTextComponentProps = {
    selectedFavorType: 'received' | 'sent'
}

const SelectedFavorTypeTextComponent = (props: SelectedFavorTypeTextComponentProps) => {
    const {selectedFavorType} = props

    return (
        <SelectedFavorTypeTextDiv>
            내가
            <SelectedFavorTypeTextSpan>
                {selectedFavorType === 'received' ? ' 받은 ' : ' 보낸 '}
            </SelectedFavorTypeTextSpan>
            FAVOR 목록이에요
        </SelectedFavorTypeTextDiv>
    )
}

export default SelectedFavorTypeTextComponent

