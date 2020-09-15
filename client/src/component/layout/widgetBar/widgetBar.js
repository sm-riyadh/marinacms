import React from 'react'
import styled from 'styled-components'

const WidgetBar = ({ children, size }) => {
  return <WidgetBarStyled size={size}>{children}</WidgetBarStyled>
}

const WHeader = ({ children }) => {
  return <WHeaderStyled>{children}</WHeaderStyled>
}
const WMiddle = ({ children }) => {
  return <WMiddleStyled>{children}</WMiddleStyled>
}
const WFooter = ({ children }) => {
  return <WFooterStyled>{children}</WFooterStyled>
}
const Widget = ({ children, padding, justify }) => {
  return (
    <WidgetStyled padding={padding} justify={justify}>
      {children}
    </WidgetStyled>
  )
}

const WidgetBarStyled = styled.aside`
  background-color: #e1e1e1;

  width: ${({ size }) => (size ? size : '25rem')};
  /* min-width: ${({ size }) => size && '24.2rem'}; */
  /* max-width: ${({ size }) => (size ? size : '25rem')}; */
  height: calc(100% - 1.8rem);

  /* padding-bottom: 4.6rem; */

  display: flex;
  flex-direction: column;

  border: 0 solid #ccc;
  border-width: 0 0.1rem;
  overflow-x: hidden;
  overflow-y: auto;
`

const WHeaderStyled = styled.div`
  font-size: 80%;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  margin-bottom: 0rem;
  color: #aaa;
  background: #eee;

  &:first-child {
    margin-top: 0;
  }
`
const WMiddleStyled = styled.div`
  padding: ${({ padding }) => (padding ? padding : '0.5rem 1rem')};
  margin: auto 0;

  display: flex;
  justify-content: ${({ justify }) => (justify ? justify : 'center')};
`

const WFooterStyled = styled.div`
  background: #f1f1f1;
  position: sticky;
  bottom: 0;
  padding: 1rem;
  padding-bottom: 0rem;
  margin-top: auto;

  display: flex;

  border-top: 0.1rem solid #ccc;
`

const WidgetStyled = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ justify }) => (justify ? justify : 'center')};
  padding: ${({ padding }) => (padding ? padding : '0.5rem')};
`

export { WidgetBar, WHeader, WMiddle, WFooter, Widget }
