import React, { useState } from 'react'
import styled from 'styled-components/macro'

const Select = ({ label, options, icon, onChange, noEmpty, value = '' }) => {
  const [ isEmpty, setIsEmpty ] = useState(value === '')
  const [ isFocus, setIsFocus ] = useState(false)

  const handleChange = value => {
    if (value !== '') setIsEmpty(false)
    else setIsEmpty(true)

    onChange(value)
  }

  return (
    <LabelStyled>
      <SelectStyled
        onChange={({ target }) => handleChange(target.value)}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        isEmpty={isEmpty}
        icon={icon}
        isFocus={isFocus}
      >
        {!noEmpty && <option value='' />}
        {options.map(option => <option value={option.value}>{option.label}</option>)}
      </SelectStyled>
      <TextStyled isEmpty={isEmpty} icon={icon} isFocus={isFocus}>
        {label}
      </TextStyled>
      <IconStyled isEmpty={isEmpty} className='material-icons'>
        {icon}
      </IconStyled>
    </LabelStyled>
  )
}

const SelectStyled = styled.select`
  width: ${({ icon }) => (icon ? 'calc(100% - 3rem)' : '100%')};
  background: #e1e1e1;
  color: #262626;
  font-size: 100%;
  padding-top: 1.2rem;
  padding-bottom: 0.3rem;
  margin-left: ${({ icon }) => icon && '2.8rem'};
  border-width: 0;
  border-radius: 0.8rem;
  outline: none;

  :focus {
    border-color: #a25eda;
  }
`
const LabelStyled = styled.label`
  background: #e1e1e1;
  width: 100%;
  color: #aaa;
  display: inline-flex;
  flex-direction: column;
  margin: 0.5rem 0;
  padding: 0 1rem;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  border-radius: 0.8rem;
`
const IconStyled = styled.i`
  position: relative;
  height: 0;
  width: 0;
  top: -4rem;
  margin-bottom: -1.5rem;

  color: #777;
  font-size: 1.8rem;
  margin-left: 0.8rem;
  margin-top: ${({ isEmpty }) => (isEmpty ? '0.65rem' : '1.8rem')};
  margin-bottom: -0.65rem;
  /* margin-bottom: ${({ isEmpty }) => (isEmpty ? '0rem' : '0rem')}; */

  transition-property: margin;
  transition-duration: 200ms;
  transition-timing-function: ease-in;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  ${SelectStyled}:focus ~ & {
    color: #a25eda;
    margin-top: 1.7 rem;
    margin-bottom: -1.3rem;
  }
`
const TextStyled = styled.span`
  font-size: ${({ isEmpty }) => (isEmpty ? '100%' : '65%')};

  margin-left: ${({ isEmpty, icon }) => (icon && isEmpty ? '3.2rem' : '1rem')};
  margin-top: ${({ isEmpty }) => (isEmpty ? '0.8rem' : '0.4rem')};

  position: relative;
  height: 0;
  width: 0;
  top: -4rem;
  white-space: nowrap;
  transition-property: font-size, margin;
  transition-duration: 200ms;
  transition-timing-function: ease-in;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  ${SelectStyled}:focus + & {
    color: #777;
    font-size: 65%;
    margin-left: 1rem;
    margin-top: 0.4rem;
  }
`

export default Select
