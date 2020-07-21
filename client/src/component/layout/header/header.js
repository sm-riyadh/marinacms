import React, { Fragment, useState } from 'react'
import styled from 'styled-components'

const Header = ({ children }) => {
  return <HeaderStyled>{children}</HeaderStyled>
}

const HeaderStyled = styled.div`
  position: sticky;
  top: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2rem;

  width: 100%;
  height: 5rem;

  background: #e0e0e0;
  border-bottom: 0.1rem solid #ccc;
`

export default Header
