import React, { Fragment } from 'react'
import styled from 'styled-components'

import { Card } from '../../element'

const modal = ({ noPadding, modalClose, style, children }) => {
  return (
    <ContainerStyled>
      <Backdrop onClick={modalClose} />
      <Card padding={noPadding && '0'}>
        <Header>
          <CloseButton onClick={modalClose} noPadding={noPadding}>
            <i className='material-icons'>close</i>
          </CloseButton>
        </Header>
        <Body style={style}>{children}</Body>
        {/* <Padding /> */}
      </Card>
    </ContainerStyled>
  )
}

const Padding = styled.div`
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.1);
`
const Body = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  display: block;
  max-height: 80vh;
  padding: 2rem;
`

const Backdrop = styled.div`
  position: absolute;
  background-color: rgba(97, 97, 97, 0.541);
  width: 100%;
  height: 100%;
  z-index: -1;
`
const CloseButton = styled.button`
  border-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.8rem;
  height: 2.8rem;
  padding: 0;

  border-radius: 1.1rem;
  background-color: #3d3d3d;
  color: #fff;
  position: relative;
  top: ${({ noPadding }) => (noPadding ? '-1.2rem' : '-2.8rem')};
  left: ${({ noPadding }) => (noPadding ? '1.2rem' : '2.8rem')};
`
const Header = styled.header`
  display: flex;
  justify-content: flex-end;

  height: 0rem;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 200;
`
const ContainerStyled = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
`

export default modal
