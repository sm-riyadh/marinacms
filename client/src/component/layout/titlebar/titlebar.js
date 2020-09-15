import React, { Fragment, useState } from 'react'
import styled from 'styled-components'

const Titlebar = ({ children }) => {
  return (
    <TitlebarStyled>
      <LogoStyled>MACALIS</LogoStyled>
      <div>
        <ButtonStyled>
          <i className='material-icons'>minimize</i>
        </ButtonStyled>
        <ButtonStyled rotate>
          <i className='material-icons rotate'>unfold_less</i>
        </ButtonStyled>
        <ButtonStyled closeBtn>
          <i className='material-icons'>close</i>
        </ButtonStyled>
      </div>
    </TitlebarStyled>
  )
}

const TitlebarStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.8rem;
  -webkit-app-region: drag;

  background: #cccccc;
  box-shadow: 0.2rem 0 0.4rem #00000020;
`
const LogoStyled = styled.span`
  font-weight: bold;
  font-size: 60%;
  padding: 0.2rem;
`
const ButtonStyled = styled.button`
  width: 2.8rem;
  height: 1.8rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-width: 0;
  background-color: inherit;
  outline: none;
  -webkit-app-region: no-drag;

  :hover {
    background-color: #00000020;
  }
  :active {
    background-color: #00000040;
    color: #ffffff;
    background-color: ${({ closeBtn }) => closeBtn && '#e74e4e'};
  }

  .rotate {
    transform: rotate(45deg);
  }
`

export default Titlebar
