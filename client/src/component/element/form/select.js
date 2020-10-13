import React, { useState, useEffect, forwardRef } from 'react'
import styled from 'styled-components/macro'

const Select = forwardRef(({ label, options, icon, white, onChange, noEmpty, tabIndex, focused, value = '' }, ref) => {
  const [ isEmpty, setIsEmpty ] = useState(value === '')
  const [ isFocus, setIsFocus ] = useState(false)

  useEffect(() => setIsEmpty(value === ''), [ value ])

  return (
    <LabelStyled white={white}>
      <SelectStyled
        onChange={({ target }) => onChange(target.value)}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        isEmpty={isEmpty}
        icon={icon}
        isFocus={isFocus}
        tabIndex={tabIndex}
        ref={ref}
        focused
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
})

const SelectStyled = styled.select`
  width: ${({ icon }) => (icon ? 'calc(100% - 3rem)' : '100%')};
  background: inherit;
  color: #262626;
  font-size: 100%;
  padding-top: 1.3rem;
  padding-left: 0.5rem;
  /* margin-left: ${({ icon }) => icon && '2.8rem'}; */
  margin-left: ${({ icon }) => icon && '2.8rem'};
  border-width: 0;
  outline: none;

  :focus {
    border-color: #a25eda;
  }
  `
const LabelStyled = styled.label`
  background: #e1e1e1;
  background-color: ${({ white }) => white && '#ffffff'};
  width: 100%;
  color: #aaa;
  display: inline-flex;
  flex-direction: column;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 0.8rem;
`
const IconStyled = styled.i`
  position: relative;
  height: 0;
  width: 0;
  margin: 0;

  top: ${({ isEmpty }) => (isEmpty ? '-2.6rem' : '-2rem')};
  left: 0.8rem;

  color: #777;
  font-size: 2rem;

  transition-property: top;
  transition-duration: 200ms;
  transition-timing-function: ease-in;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  ${SelectStyled}:focus ~ & {
    color: #a25eda;
    top: -2rem;
  }
`
const TextStyled = styled.span`
  position: relative;
  height: 0;
  width: 0;
  margin: 0;

  top: ${({ isEmpty }) => (isEmpty ? '-2.4rem' : '-3.2rem')};
  left: 1rem;
  left: ${({ isEmpty, icon }) => (icon && isEmpty ? '3.2rem' : '1rem')};

  font-size: ${({ isEmpty }) => (isEmpty ? '100%' : '62%')};

  white-space: nowrap;
  transition-property: top, left;
  transition-duration: 200ms;
  transition-timing-function: ease-in;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  ${SelectStyled}:focus + & {
    color: #777;
    font-size: 62%;
    top: -3.2rem;
    left: 1rem;
  }
`

export default Select
