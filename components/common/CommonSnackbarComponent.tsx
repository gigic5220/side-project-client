import React from 'react';
import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {snackbarAtom} from "@/atom/commonAtom";

const SnackbarDiv = styled.div`
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  z-index: 1010;
  padding: 8px 12px 8px 12px;
  background-color: ${({theme}) => theme.colors.primary};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 80%;
  height: 20px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.white};
`

export const CommonSnackbarComponent = () => {

    const snackbar = useRecoilValue(snackbarAtom);

    if (!snackbar) return null

    return (
        <SnackbarDiv>
            {snackbar}
        </SnackbarDiv>
    )
}

export default CommonSnackbarComponent