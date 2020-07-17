import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

const Button = ({ children, to, icon, onClick, style, chip, small, className }) => {
  if (to)
    return (
      <Link to={to}>
        <ButtonStyled className={className} style={style} onClick={onClick} small={small} chip={chip}>
          {icon && <i className='material-icons p-right-1'>{icon}</i>}
          {children}
        </ButtonStyled>
      </Link>
    )
  else
    return (
      <ButtonStyled className={className} style={style} onClick={onClick} small={small} chip={chip}>
        {icon && <i className='material-icons p-right-1'>{icon}</i>}
        {children}
      </ButtonStyled>
    )
}

const ButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #e1e1e1;
  color: #262626;
  font-size: ${({ small }) => (small ? '1.2rem' : '1.4rem')};
  margin: 0.4rem 0.2rem;
  padding: ${({ small }) => (small ? '0.5rem 1rem' : '1rem 1.2rem')};
  border: 0;
  border-radius: ${({ chip }) => (chip ? '99rem' : '0.6rem')};

  :hover {
    background-color: #ddd;
  }
  :active {
    background-color: #ccc;
  }

  .material-icons {
    font-size: 1.8rem;
  }
`

export default Button
