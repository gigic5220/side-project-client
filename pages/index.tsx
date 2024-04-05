import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import styled from "styled-components";
import CommonButtonComponent from "@/components/common/CommonButtonComponent";
import {useMainPage} from "@/hooks/index/hooks";

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`

const TitleP = styled.p`
  display: flex;
  justify-content: center;
  color: ${({theme}) => theme.fontColors.primary};
  font-size: 30px;
`

const DescriptionDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`

const DescriptionP = styled.p`
  display: flex;
  justify-content: center;
  color: ${({theme}) => theme.fontColors.secondary};
  font-size: 24px;
`

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`


const Main = () => {

    const {
        handleClickStartButton
    } = useMainPage()

    return (
        <AppLayoutComponent
            isShowHeader={false}
            isShowNavigationBar={false}
        >
            <TitleDiv>
                <TitleP>
                    너와 나 우리의 FAVOR
                </TitleP>
            </TitleDiv>
            <DescriptionDiv>
                <DescriptionP>
                    FAVOR를 만들어 주세요
                </DescriptionP>
            </DescriptionDiv>
            <ButtonDiv>
                <CommonButtonComponent
                    content={"시작하기"}
                    onClicked={handleClickStartButton}
                />
            </ButtonDiv>
        </AppLayoutComponent>
    )
}

export default Main