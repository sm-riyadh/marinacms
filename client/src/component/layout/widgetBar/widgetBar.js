import React, { Fragment } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const WidgetBar = ({ children, backgroundColor, size, offset }) => {
  return (
    <VerticalBar backgroundColor={backgroundColor} size={size} offset={offset}>
      {children}
    </VerticalBar>
  )
}

const WHeader = ({ children }) => {
  return <Header>{children}</Header>
}
const WMiddle = ({ children }) => {
  return <Middle>{children}</Middle>
}
const WFooter = ({ children }) => {
  return <Footer>{children}</Footer>
}
const Widget = ({ children, padding, justify }) => {
  return (
    <Container padding={padding} justify={justify}>
      {children}
    </Container>
  )
}

const VerticalBar = styled.aside`
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '#ffffff')};

  width: ${({ size }) => (size ? size : '25vw')};
  min-width: 18rem;
  height: ${({ offset }) => `calc(100vh - ${offset})`};
  /* padding-bottom: 4.6rem; */

  display: flex;
  flex-direction: column;

  border: 0 solid #ccc;
  border-width: 0 0.1rem;
  overflow-y: auto;
`

const Header = styled.div`
  font-size: 80%;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  background: #f3f3f3;

  &:first-child {
    margin-top: 0;
  }
`
const Middle = styled.div`
  padding: ${({ padding }) => (padding ? padding : '0.5rem 1rem')};
  margin: auto 0;

  display: flex;
  justify-content: ${({ justify }) => (justify ? justify : 'center')};
`

const Footer = styled.div`
  background: #f1f1f1;
  position: sticky;
  bottom: 0;
  padding: 1rem;
  margin-top: auto;

  display: flex;

  border-top: 0.1rem solid #ccc;
`

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ justify }) => (justify ? justify : 'center')};
  padding: ${({ padding }) => (padding ? padding : '0.5rem 1rem')};
`

export { WidgetBar, WHeader, WMiddle, WFooter, Widget }
