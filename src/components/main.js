import styled from "styled-components"

export const Template = styled.div``

export const PageContainer = styled.div`
  max-width: 1000px;
  margin: auto;
`

export const PageTitle = styled.h1`
  font-size: 27px;

  @media(max-width: 600px) {
    margin: 10px;
  }
`

export const PageBody = styled.div``

export const ErrorMessage = styled.div`
  margin: 10px 0;
  padding: 10px;
  background-color: #ffcaca;
  color: #000;
  border: 2px solid #ff0000;
`
