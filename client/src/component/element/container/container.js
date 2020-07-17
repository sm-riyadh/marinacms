import React from 'react'
import styled from 'styled-components'

const Container = ({ children, column, margin, padding }) => (
  <ContainerStyled column margin={margin} padding={padding}>
    {children}
  </ContainerStyled>
)

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: ${({ column }) => column && 'column'};
  justify-content: center;
  padding: ${({ padding }) => (padding ? padding : '1.6rem 1.5rem')};
  margin: ${({ margin }) => (margin ? margin : '0')};
`

export default Container
