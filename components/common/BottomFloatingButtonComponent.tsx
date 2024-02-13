import React from 'react';
import styled from "styled-components";
import CommonButtonComponent from "@/components/common/CommonButtonComponent";

const BottomFloatingButtonDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
`

type BottomFloatingButtonComponentProps = {
    $borderRadius: string;
    disabled: boolean;
    content: string;
    onClicked: () => void;
    isLoading: boolean;
}

const BottomFloatingButtonComponent = (props: BottomFloatingButtonComponentProps) => {

    return (
        <BottomFloatingButtonDiv>
            <CommonButtonComponent
                {...props}
            />
        </BottomFloatingButtonDiv>
    )
}

export default BottomFloatingButtonComponent