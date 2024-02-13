import React from 'react';
import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {dialogAtom} from "@/atom/commonAtom";
import {useDialog} from "@/hooks/useDialog";
import {IoMdClose} from "react-icons/io";
import {theme} from "@/styles/theme";

const BackgroundDimBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`

const DialogBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1010;
  background-color: ${({theme}) => theme.backgroundColors.primary};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 80%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`

const DialogHeaderDiv = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 12px;
`

const DialogBodyDiv = styled.div`
  display: flex;
  padding: 0 24px 24px 24px;
  justify-content: center;
`

const CommonDialogComponent = () => {

    const dialog = useRecoilValue(dialogAtom);

    const {closeDialog} = useDialog()

    const handleClickCloseDialog = () => {
        closeDialog()
    }

    const handleClickCloseButton = () => {
        if (!!dialog?.onClickClose) {
            dialog.onClickClose()
        }
    }

    if (!!dialog?.children) {
        return (
            <>
                <DialogBox>
                    <DialogHeaderDiv>
                        <IoMdClose
                            size={24}
                            onClick={handleClickCloseButton}
                            color={theme.colors.black}
                        />
                    </DialogHeaderDiv>
                    <DialogBodyDiv>
                        {dialog.children}
                    </DialogBodyDiv>
                </DialogBox>
                <BackgroundDimBox/>
            </>
        )
    } else {
        return <></>
    }
}

export default CommonDialogComponent