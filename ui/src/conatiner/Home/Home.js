import React, { Component, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import SideBar from '../../component/layout/sideBar/sideBar'
import ActionBar from '../../component/layout/actionBar/actionBar'

import Journal from '../Journal/Journal'
import Employee from '../Employee/Employee'
import Cusomer from '../Customer/Customer'

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Container>
          <SideBar
            navigations={[
              { link: '/dashboard', name: 'Dashboard', icon: 'dashboard' },
              { isLabel: true, name: 'Accounting' },
              { link: '/journal', name: 'Journal', icon: 'book' },
              { link: '/coa', name: 'Chart of Accounts', icon: 'local_atm' },
              { isLabel: true, name: 'Company' },
              { link: '/employee', name: 'Employee', icon: 'supervised_user_circle' },
              { link: '/customer', name: 'Customer', icon: 'contacts' },
            ]}
          />
          <Main>
            <Header>search, btn</Header>
            <CardHolder>
              <Card>
                <Switch>
                  <Route path='/journal' component={Journal} />
                  <Route path='/employee' component={Employee} />
                  <Route path='/customer' component={Cusomer} />
                </Switch>
                {/* Journal */}
              </Card>
            </CardHolder>
          </Main>
          <ActionBar />
        </Container>
      </Fragment>
    )
  }
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  position: fixed;
  top: 0;

  width: 100%;
  padding: 1.6rem 2rem;

  background: #e0e0e0;
  border-bottom: 0.1rem solid #ccc;
`
const CardHolder = styled.div`
  width: 100%;
  height: calc(100vh - 4.9rem);
  margin-top: 4.9rem;

  background-color: #f2f2f2;
  padding: 4rem 5rem;
  padding-bottom: 0;
  overflow-y: auto;
`
const Card = styled.div`
  padding: 2rem 0;
  background-color: #ffffff;
  border-radius: 0.8rem;
  min-height: 95%;

  box-shadow: 0 0.1rem 0.3rem #00000033;
`

export default Home
