import React, {FC} from "react";
import {useGetEmailDuplication} from "@/query/userHooks";
import styled from "styled-components";

const LayoutBox = styled.div`
  width: 100%;
`

const ContentBox = styled.div`
  width: 100%;
`

const JoinComponent: FC = () => {

    const {data} = useGetEmailDuplication('gigic5220@gmail.com',
        {
            enabled: true,
            onSuccess: (data) => {
                console.log('data', data)
            },
            onError: (error) => {

            }
        }
    )

    return (
        <LayoutBox>
            <ContentBox>
                회원가입
            </ContentBox>
        </LayoutBox>
    );
};

export default JoinComponent;
