import React, { Fragment } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { WidgetBar, Widget, WHeader } from '../../layout/widgetBar/widgetBar'

const navBar = ({ navigations = [] }) => {
  return (
    <WidgetBar size='23.5rem'>
      <Widget justify='flex-start'>
        <NavHeader>
          <CollapseButton>
            <i className='material-icons'>menu</i>
          </CollapseButton>
          Placeholder
        </NavHeader>
      </Widget>
      <Widget justify='flex-start' padding='0.5rem 1rem'>
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
      </Widget>
    </WidgetBar>
  )
}

const NavHeader = styled.div`
  width: 100%;
  color: #555;

  display: flex;
  border-bottom: 0.1rem solid #ccc;
  align-items: center;

  padding: 1.3rem 0;
`
const CollapseButton = styled.button`
  display: inline-flex;
  align-items: center;
  color: #2d2d2d;
  background-color: none;

  font-size: 145%;
  border-width: 0;
  margin: 0 0.5rem;
  margin-right: 1.8rem;
`
const ListContainer = styled.ul`list-style: none;`

const Label = styled.li`
  text-decoration: none;
  font-size: 75%;
  color: #a4a4a4;
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
  white-space: nowrap;

  color: #2d2d2d;
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

export default navBar
