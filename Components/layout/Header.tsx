import styled from "styled-components";

const HeaderBox = styled.div`
  width: 100%;
  height: 50px;
  background-color: lightblue;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr
`

const ButtonBox = styled.div`

`

const LogoBox = styled.div`

`

const Header = () => {
    return (
        <HeaderBox>
            <LogoBox>
                로고
            </LogoBox>
            <ButtonBox>
                상점
            </ButtonBox>
            <ButtonBox>
                로그인
            </ButtonBox>
        </HeaderBox>
    )
}

export default Header