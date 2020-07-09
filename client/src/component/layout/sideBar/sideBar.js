import React, { Fragment } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const sideBar = ({ navigations = [] }) => {
  return (
    <SideBar>
      <Header>
        <CollapseButton>
          <i className='material-icons'>menu</i>
        </CollapseButton>
        Placeholder
      </Header>
      <ListContainer>
        {navigations.map(({ isLabel, link, name, icon }) => {
          if (isLabel) return <Label>{name}</Label>
          else
            return (
              <List key={link} as={NavLink} to={link}>
                <i className='material-icons'>{icon}</i>
                {name}
              </List>
            )
        })}
      </ListContainer>
    </SideBar>
  )
}

const SideBar = styled.div`
  width: 15vw;
  min-width: 18rem;
  height: 100vh;
  padding: 0 1rem;

  display: flex;
  flex-direction: column;

  background: #f1f1f1;
  border: 0.1rem solid #ccc;
`
const Header = styled.div`
  font-size: 90%;

  width: 100%;
  color: #555;

  display: flex;
  border-bottom: 0.1rem solid #ccc;
  align-items: center;

  padding: 1rem 0;
`
const CollapseButton = styled.button`
  display: inline-flex;
  align-items: center;
  color: #555;

  font-size: 140%;
  border-width: 0;
  margin-right: 1rem;
  padding: 0.5rem;
  border-radius: 4rem;

  :hover {
    background: #e0e0e0;
  }
`
const ListContainer = styled.ul`
  padding: 1rem 0;
  list-style: none;
`

const Label = styled.li`
  text-decoration: none;
  font-size: 75%;
  color: #888;
  margin-left: 0.2rem;
  margin-top: 0.8rem;
`

const List = styled.li`
  font-size: 90%;

  width: 100%;
  display: flex;
  align-items: center;
  margin: 0.2rem 0;
  padding: 0.8rem 0.6rem;

  color: #333;
  border-radius: 0.6rem;

  :hover {
    background-color: #0000000e;
  }
  :active {
    background-color: #00000019;
  }
  &.active {
    color: blue;

    &:before {
      content: '';
      left: 0.4rem;

      background-color: blue;
      padding: 0.6rem 0.2rem;
      border-radius: 10rem;

      position: absolute;
    }
  }

  .material-icons {
    font-size: 140%;
    margin-right: 1.5rem;
    margin-bottom: -0.2rem;
  }
`

export default sideBar
