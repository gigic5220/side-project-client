import {RiUserReceived2Line, RiUserShared2Line} from "react-icons/ri";
import {theme} from "@/styles/theme";
import React from "react";
import styled from "styled-components";

const SelectFavorTypeDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  justify-content: center;
  align-items: center;
  height: 30px;
`

const FavorTypeTabDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

type FavorTypeTabListComponentProps = {
    handleClickFavorTypeTab: (type: 'received' | 'sent') => void
    selectedFavorType: 'received' | 'sent'
}

const SelectFavorTypeComponent = (props: FavorTypeTabListComponentProps) => {

    const {
        handleClickFavorTypeTab,
        selectedFavorType
    } = props

    return (
        <SelectFavorTypeDiv>
            <FavorTypeTabDiv
                onClick={() => handleClickFavorTypeTab('received')}
            >
                <RiUserReceived2Line
                    size={selectedFavorType === 'received' ? 30 : 25}
                    color={selectedFavorType === 'received' ? theme.colors.primary : theme.colors.gray}
                />
            </FavorTypeTabDiv>
            <div
                style={{
                    width: 2,
                    height: 35,
                    backgroundColor: theme.colors.gray,
                }}
            />
            <FavorTypeTabDiv
                onClick={() => handleClickFavorTypeTab('sent')}
            >
                <RiUserShared2Line
                    size={selectedFavorType === 'sent' ? 30 : 25}
                    color={selectedFavorType === 'sent' ? theme.colors.primary : theme.colors.gray}
                />
            </FavorTypeTabDiv>
        </SelectFavorTypeDiv>
    )
}

export default SelectFavorTypeComponent