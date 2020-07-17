import React, { useState } from 'react'
import styled from 'styled-components/macro'

const Checkbox = ({ label, style, radius, icon, onChange, value = false, checked }) => {
  const handleChange = () => {
    onChange(!value)
  }

  return (
    <div>
      <LabelStyled>
        <CheckboxStyled
          type='checkbox'
          style={style}
          radius={radius}
          onChange={handleChange}
          value={value}
          checked={checked && checked}
        />
        <div className='custombox' />
        <TextStyled>{label}</TextStyled>
      </LabelStyled>
    </div>
  )
}

const CheckboxStyled = styled.input`
  /* visibility: hidden; */
  margin: 0 1rem;
  outline: none;
  opacity: 0;

  & + .custombox {
    content: '';
    margin: 0 0.5rem;
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #ffffff;
    border: 0.3rem solid #e1e1e1;
    border-radius: ${({ radius }) => (radius ? radius : '0.2rem')};
    transition: transform 200ms ease;
  }
  :checked + .custombox {
    content: '';
    background-color: #a25eda;
    /* background-color: lighten(#a25eda, 20%); */
    border-color: #a25eda;
    animation: scale;
    /* border-color: lighten(#a25eda, 20%); */
  }
  :focus + .custombox {
    border-color: #c6a3e4;
  }
`

const LabelStyled = styled.label`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0.5rem 0;
`

const TextStyled = styled.span`font-size: 100%;`

export default Checkbox
