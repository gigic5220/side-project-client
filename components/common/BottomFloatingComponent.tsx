import React from 'react';
import styled from "styled-components";

const FloatingButtonDiv = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`

type FloatingButtonComponentProps = {
    child: React.ReactNode
}

const FloatingButtonComponent = (props: FloatingButtonComponentProps) => {

    return (
        <FloatingButtonDiv>
            {props.child}
        </FloatingButtonDiv>
    )
}

export default FloatingButtonComponent