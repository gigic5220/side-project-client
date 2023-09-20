import React from 'react';
import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {dialogAtom} from "@/atom/commonAtom";
import {useAlert} from "@/hooks/useAlert";

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
  padding: 20px;
  background-color: #262626;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 80%;
  height: 150px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const DialogInfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  text-align: center;
`

const DialogComponent = () => {

    const dialog = useRecoilValue(dialogAtom);

    const {closeAlert} = useAlert()

    const handleClickCloseAlert = () => {
        closeAlert()
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
                    <DialogInfoBox>
                        {dialog.children}
                    </DialogInfoBox>
                </DialogBox>
                <BackgroundDimBox/>
            </>
        )
    } else {
        return <></>
    }
}

export default DialogComponent