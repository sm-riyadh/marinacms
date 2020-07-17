import React, { useState } from 'react'
import styled from 'styled-components/macro'

const Agreement = ({ children }) => {
  return (
    <AgreementStyled>
      <input type='checkbox' />
      {children}
    </AgreementStyled>
  )
}

const AgreementStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 2rem 0;
`

export default Agreement
