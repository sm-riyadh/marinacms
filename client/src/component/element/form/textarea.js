import React, { useState } from 'react'
import styled from 'styled-components/macro'

const Textarea = ({ label, onChange, tabIndex, value = '', icon }) => {
  const [ isEmpty, setIsEmpty ] = useState(true)
  const [ isFocus, setIsFocus ] = useState(false)

  const handleChange = value => {
    if (value !== '') setIsEmpty(false)
    else setIsEmpty(true)

    onChange(value)
  }

  return (
    <LabelStyled>
      <TextareaStyled
        onChange={({ target }) => handleChange(target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        icon={icon}
        tabIndex={tabIndex}
      >
        {value}
      </TextareaStyled>
      <TextStyled isEmpty={isEmpty} icon={icon} isFocus={isFocus}>
        {label}
      </TextStyled>
      <IconStyled className='material-icons' isEmpty={isEmpty}>
        {icon}
      </IconStyled>
    </LabelStyled>
  )
}

const TextareaStyled = styled.textarea`
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
  position: absolute;
  color: #777;
  font-size: 1.8rem;
  margin-left: 0.4rem;
  margin-top: ${({ isEmpty }) => (isEmpty ? '0.65rem' : '1.2rem')};

  transition-property: margin;
  transition-duration: 200ms;
  transition-timing-function: ease-in;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  ${TextareaStyled}:focus ~ & {
    color: #a25eda;
    margin-top: 1.2rem;
  }
`
const PeekStyled = styled.i`
  align-self: flex-end;
  position: absolute;
  font-size: 1.8rem;
  margin-left: -1.2rem;
  margin-top: 1.2rem;
`

const TextStyled = styled.span`
  font-size: ${({ isEmpty }) => (isEmpty ? '100%' : '65%')};

  margin-left: ${({ isEmpty, icon }) => (icon && isEmpty ? '2.8rem' : '0.6rem')};
  margin-top: ${({ isEmpty }) => (isEmpty ? '0.6rem' : '-0.2rem')};

  position: absolute;
  transition-property: font-size, margin;
  transition-duration: 200ms;
  transition-timing-function: ease-in;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  ${TextareaStyled}:focus + & {
    color: #777;
    font-size: 65%;
    margin-left: 0.6rem;
    margin-top: -0.2rem;
  }
`

// const TextareaStyled = styled.textarea`
//   width: 100%;
//   background: #ffffff;
//   color: #262626;
//   font-size: 100%;
//   padding: 1rem 1.3rem;
//   padding-left: ${({ config }) => config.icon && '3.6rem'};
//   border: 0.3rem solid #e1e1e1;
//   border-radius: 0.8rem;
//   outline: none;

//   :focus {
//     border-color: #a25eda;
//   }
// `
// const LabelStyled = styled.label`
//   width: 100%;
//   color: #aaa;
//   display: inline-flex;
//   flex-direction: column;
//   margin: 1rem 0;
//   margin-top: 1rem;
// `
// const IconStyled = styled.i`
//   position: absolute;
//   color: #777;
//   font-size: 1.8rem;
//   margin-left: 1.4rem;
//   margin-top: 1.2rem;

//   ${TextareaStyled}:focus ~ & {
//     color: #a25eda;
//   }
// `
// const TextStyled = styled.span`
//   font-size: ${({ isEmpty }) => (isEmpty ? '100%' : '80%')};

//   margin-top: ${({ isEmpty }) => (isEmpty ? '1.2rem' : '-1.4rem')};
//   margin-left: ${({ isEmpty, icon }) => (icon && isEmpty ? '3.6rem' : '1.2rem')};

//   position: absolute;
//   transition-property: font-size, margin;
//   transition-duration: 300ms;
//   transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);

//   ${TextareaStyled}:focus + & {
//     color: #777;
//     font-size: 80%;
//     margin-left: 1.2rem;
//     margin-top: -1.4rem;
//   }
// `

export default Textarea
