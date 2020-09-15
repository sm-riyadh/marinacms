import React, { Fragment, useState } from 'react'
import styled from 'styled-components'

const Header = ({ children }) => {
  return <HeaderStyled>{children}</HeaderStyled>
}

const HeaderStyled = styled.div`
  position: relative;
  top: -0.4rem;
  left: -0.4rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0;

  width: calc(100% + 0.8rem);
  height: 4.5rem;

  background: #ffffff;
  border-radius: 0.8rem;
  box-shadow: 0.2rem 0 0.4rem #00000020;
`

export default Header
