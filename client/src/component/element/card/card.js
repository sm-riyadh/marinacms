import React from 'react'
import styled from 'styled-components'

const Card = ({ children, column, margin, padding, noShadow, isHoverible }) => (
  <CardStyled column margin={margin} padding={padding} noShadow={noShadow} isHoverible={isHoverible}>
    {children}
  </CardStyled>
)

const CardStyled = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: ${({ column }) => column && 'column'};
  justify-content: center;
  padding: ${({ padding }) => (padding ? padding : '1.6rem 1.5rem')};
  margin: ${({ margin }) => (margin ? margin : '0.5rem 0.2rem')};
  border: 0.1rem solid #cfcfcf;
  border-radius: 0.8rem;
  box-shadow: ${({ noShadow }) => !noShadow && '0 0.1rem 1.6rem #0000001a'};

  transition: box-shadow 200ms;

  ${({ isHoverible }) =>
    isHoverible &&
    `&:hover {
    box-shadow: 0 0 0 0.3rem #2222222a;
  }`};
`

export default Card
