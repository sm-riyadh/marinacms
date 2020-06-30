import React from 'react'
import styled from 'styled-components'

const Card = ({ children, column, margin, padding }) => (
  <Container column margin={margin} padding={padding}>
    {children}
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: ${({ column }) => column && 'column'};
  justify-content: center;
  padding: ${({ padding }) => (padding ? padding : '0.5rem 1rem')};
  margin: ${({ margin }) => (margin ? margin : '0.5rem 1rem')};
  border: 0.1rem solid #ececec;
  border-radius: 0.6rem;
`

export default Card
