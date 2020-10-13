import React, { useState } from 'react'
import styled from 'styled-components/macro'

const Form = ({ children, label, onSubmit }) => {
  return (
    <FormStyle onSubmit={onSubmit}>
      <h3>{label}</h3>
      {children}
      {/* <Group>
        <button> clear </button>
        <input type='submit' value='confirm' />
      </Group> */}
    </FormStyle>
  )
}

const FormStyle = styled.form`
  width: 35rem;
  display: flex;
  flex-direction: column;
`

export default Form
