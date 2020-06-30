import React, { Fragment } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const actionBar = ({ navigations = [] }) => {
  return (
    <ActionBar>
      <Header>
        <CollapseButton>
          <i className='material-icons'>menu</i>
        </CollapseButton>
        Placeholder
      </Header>
      <ListContainer>
        <List>dsadasd</List>
      </ListContainer>
    </ActionBar>
  )
}

const ActionBar = styled.div`
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
const ListContainer = styled.ul`padding: 1rem 0;`

const List = styled.li`
  font-size: 90%;

  width: 100%;
  display: flex;
  align-items: center;
  margin: 0.2rem 0;
  padding: 0.8rem 1rem;

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

export default actionBar
