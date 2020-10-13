import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

const Button = ({ children, to, icon, onClick, style, chip, small, white, tabIndex, className }) => {
  if (to)
    return (
      <Link to={to}>
        <ButtonStyled className={className} style={style} onClick={onClick} small={small} chip={chip} tabIndex={tabIndex}>
          {icon && <i className='material-icons p-right-1'>{icon}</i>}
          {children}
        </ButtonStyled>
      </Link>
    )
  else
    return (
      <ButtonStyled className={className} style={style} onClick={onClick} small={small} chip={chip} white={white} tabIndex={tabIndex}>
        {icon && <i className='material-icons p-right-1'>{icon}</i>}
        {children}
      </ButtonStyled>
    )
}

const ButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #e1e1e1;
  background-color: ${({ white }) => white && '#ffffff'};
  color: #262626;
  font-size: ${({ small }) => (small ? '1.2rem' : '1.4rem')};
  margin: 0.4rem 0.2rem;
  padding: ${({ small }) => (small ? '0.5rem 1rem' : '1rem 1.2rem')};
  border: 0;
  border-radius: ${({ chip }) => (chip ? '99rem' : '0.6rem')};

  :hover {
    background-color: #ddd;
    background-color: ${({ white }) => white && '#f4f4f4'};
  }
  :active {
    background-color: #ccc;
    background-color: ${({ white }) => white && '#f0f0f0'};
  }

  .material-icons {
    font-size: ${({ small }) => (small ? '1.2rem' : '1.8rem')};
  }
`

export default Button
