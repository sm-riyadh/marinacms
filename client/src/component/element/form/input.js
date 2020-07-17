import React, { useState } from 'react'
import styled from 'styled-components/macro'

const Input = ({ label, type: initialType, icon, peek, onChange, value = '' }) => {
  const [ isEmpty, setIsEmpty ] = useState(value === '')
  const [ isFocus, setIsFocus ] = useState(false)
  const [ type, setType ] = useState(initialType)

  const handleChange = value => {
    if (value !== '') setIsEmpty(false)
    else setIsEmpty(true)

    onChange(value)
  }

  const togglePeek = () => {
    if (type === 'password') setType('text')
    else setType('password')
  }

  return (
    <LabelStyled>
      <InputStyled
        type={type}
        onChange={({ target }) => handleChange(target.value)}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        isEmpty={isEmpty}
        icon={icon}
        isFocus={isFocus}
      />
      <TextStyled isEmpty={isEmpty} icon={icon} isFocus={isFocus}>
        {label}
      </TextStyled>
      <IconStyled isEmpty={isEmpty} className='material-icons'>
        {icon}
      </IconStyled>

      {peek && (
        <PeekStyled className='material-icons' onClick={togglePeek}>
          people
        </PeekStyled>
      )}
    </LabelStyled>
  )
}

const InputStyled = styled.input`
  width: 100%;
  background: #ffffff;
  color: #262626;
  font-size: 100%;
  padding: 1rem;
  padding-top: 1.3rem;
  padding-bottom: 0.5rem;
  padding-left: ${({ icon }) => icon && '2.8rem'};
  border-width: 0;
  outline: none;

  :focus {
    border-color: #a25eda;
  }
`
const LabelStyled = styled.label`
  width: 100%;
  color: #aaa;
  display: inline-flex;
  flex-direction: column;
  margin: 0.5rem 0;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  border: 0.3rem solid #e1e1e1;
  border-radius: 0.8rem;
`
const IconStyled = styled.i`
  position: relative;
  height: 0;
  width: 0;
  top: -4rem;
  color: #777;
  font-size: 1.8rem;
  margin-left: 0.4rem;
  margin-top: ${({ isEmpty }) => (isEmpty ? '0.65rem' : '1.2rem')};

  transition-property: margin;
  transition-duration: 200ms;
  transition-timing-function: ease-in;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  ${InputStyled}:focus ~ & {
    color: #a25eda;
    margin-top: 1.2rem;
  }
`
const PeekStyled = styled.i`
  align-self: flex-end;

  position: relative;
  height: 0;
  width: 0;
  top: -4rem;
  font-size: 1.8rem;
  margin-left: -1.2rem;
  margin-top: 1.2rem;
`
const TextStyled = styled.span`
  font-size: ${({ isEmpty }) => (isEmpty ? '100%' : '65%')};

  margin-left: ${({ isEmpty, icon }) => (icon && isEmpty ? '2.8rem' : '0.6rem')};
  margin-top: ${({ isEmpty }) => (isEmpty ? '0.6rem' : '-0.2rem')};

  position: relative;
  height: 0;
  width: 0;
  top: -4rem;
  white-space: nowrap;
  transition-property: font-size, margin;
  transition-duration: 200ms;
  transition-timing-function: ease-in;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  ${InputStyled}:focus + & {
    color: #777;
    font-size: 65%;
    margin-left: 0.6rem;
    margin-top: -0.2rem;
  }
`

export default Input
